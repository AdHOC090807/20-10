# server.py - FastAPI Backend with SQLite Database for 20/10 Celebration
import os
import sqlite3
import datetime
import unicodedata
from typing import Optional, List
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
import uvicorn

DB_PATH = os.path.join(os.path.dirname(__file__), "wishes.db")

def nfc(text: str) -> str:
    """Normalize string to Unicode NFC (Precomposed characters) for flawless Vietnamese rendering."""
    return unicodedata.normalize('NFC', text) if text else text

# ----------------- Database Setup & Helpers -----------------
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Create wishes table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS wishes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipient_role TEXT NOT NULL,
        recipient_name TEXT NOT NULL,
        sender_name TEXT NOT NULL,
        message TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        created_at TEXT NOT NULL
    );
    """)

    # Create global stats table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS site_stats (
        key TEXT PRIMARY KEY,
        value INTEGER DEFAULT 0
    );
    """)

    # Initialize stats if not present
    default_stats = [
        ("total_wishes", 0),
        ("total_fireworks", 128),
        ("total_bouquets", 64),
        ("total_hearts", 520)
    ]
    for key, val in default_stats:
        cursor.execute("INSERT OR IGNORE INTO site_stats (key, value) VALUES (?, ?)", (key, val))

    # Check if empty, or clean out old non-matching wishes if needed
    cursor.execute("SELECT COUNT(*) as count FROM wishes")
    count = cursor.fetchone()["count"]
    if count == 0:
        seed_default_wishes(cursor)

    conn.commit()
    conn.close()

def seed_default_wishes(cursor):
    sample_wishes = [
        (
            nfc("Bà Nội"),
            nfc("Bà Nội kính yêu"),
            nfc("Cháu Hoàng"),
            nfc("Nhân ngày 20/10, cháu kính chúc Bà Nội luôn mạnh khỏe, sống lâu trăm tuổi, bình an bên con cháu. Cảm ơn những câu chuyện cổ tích và tình thương bao la của Bà Nội!"),
            28,
            (datetime.datetime.now() - datetime.timedelta(hours=5)).isoformat()
        ),
        (
            nfc("Bà Ngoại"),
            nfc("Bà Ngoại thương yêu"),
            nfc("Cháu Hoàng"),
            nfc("Kính chúc Bà Ngoại ngày 20/10 ngập tràn niềm vui, sức khỏe dồi dào, vạn sự như ý và bách niên giai lão!"),
            25,
            (datetime.datetime.now() - datetime.timedelta(hours=4)).isoformat()
        ),
        (
            nfc("Mẹ Thắm"),
            nfc("Mẹ Thắm yêu dấu"),
            nfc("Con yêu"),
            nfc("Chúc Mẹ Thắm một ngày 20/10 ngập tràn nụ cười và hạnh phúc! Cả đời mẹ đã vất vả vì chúng con, con chỉ mong Mẹ Thắm luôn an yên, trẻ đẹp và tự hào về con!"),
            68,
            (datetime.datetime.now() - datetime.timedelta(hours=3)).isoformat()
        ),
        (
            nfc("Hân Bò"),
            nfc("Em Hân Bò"),
            nfc("Anh hai"),
            nfc("Chúc em Hân Bò 20/10 nhận được cả núi quà, ngày càng xinh xắn, bớt lì, thi đâu đỗ đó và luôn tươi cười nhé!"),
            39,
            (datetime.datetime.now() - datetime.timedelta(hours=2)).isoformat()
        ),
        (
            nfc("Hoa"),
            nfc("Em Hoa"),
            nfc("Anh hai"),
            nfc("Chúc em Hoa ngày 20/10 thật nhiều niềm vui, luôn tươi tắn dịu dàng như hoa, học giỏi và gặp nhiều may mắn!"),
            36,
            (datetime.datetime.now() - datetime.timedelta(hours=1)).isoformat()
        )
    ]
    cursor.executemany(
        "INSERT INTO wishes (recipient_role, recipient_name, sender_name, message, likes, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        sample_wishes
    )
    cursor.execute("UPDATE site_stats SET value = 5 WHERE key = 'total_wishes'")

# ----------------- Lifecycle & App Definition -----------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(
    title="Vietnamese Women's Day 20/10 API",
    description="Backend API supporting the 20/10 Interactive Celebration Web Application with Full CRUD",
    version="2.1.0",
    lifespan=lifespan
)

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Pydantic Models -----------------
class WishCreate(BaseModel):
    recipient_role: str = Field(..., example="Mẹ Thắm")
    recipient_name: str = Field(..., min_length=1, max_length=100, example="Mẹ Thắm yêu dấu")
    sender_name: str = Field(..., min_length=1, max_length=100, example="Con yêu")
    message: str = Field(..., min_length=2, max_length=1500, example="Chúc Mẹ Thắm 20/10 ngập tràn niềm vui và sức khỏe!")

class WishUpdate(BaseModel):
    recipient_role: Optional[str] = None
    recipient_name: Optional[str] = None
    sender_name: Optional[str] = None
    message: Optional[str] = None

class WishResponse(BaseModel):
    id: int
    recipient_role: str
    recipient_name: str
    sender_name: str
    message: str
    likes: int
    created_at: str

class StatsResponse(BaseModel):
    total_wishes: int
    total_fireworks: int
    total_bouquets: int
    total_hearts: int

class IncrementRequest(BaseModel):
    stat_type: str = Field(..., example="total_fireworks")

# ----------------- API Endpoints -----------------
@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Backend 20/10 is running smoothly! 🌹"}

@app.get("/api/stats", response_model=StatsResponse)
def get_stats():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT key, value FROM site_stats")
    rows = cursor.fetchall()
    stats = {row["key"]: row["value"] for row in rows}
    
    cursor.execute("SELECT COUNT(*) as cnt FROM wishes")
    stats["total_wishes"] = cursor.fetchone()["cnt"]

    conn.close()
    return StatsResponse(
        total_wishes=stats.get("total_wishes", 0),
        total_fireworks=stats.get("total_fireworks", 0),
        total_bouquets=stats.get("total_bouquets", 0),
        total_hearts=stats.get("total_hearts", 0)
    )

@app.post("/api/stats/increment")
def increment_stat(req: IncrementRequest):
    allowed = ["total_fireworks", "total_bouquets", "total_hearts"]
    if req.stat_type not in allowed:
        raise HTTPException(status_code=400, detail="Invalid stat type")

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE site_stats SET value = value + 1 WHERE key = ?", (req.stat_type,))
    cursor.execute("SELECT value FROM site_stats WHERE key = ?", (req.stat_type,))
    new_val = cursor.fetchone()["value"]
    conn.commit()
    conn.close()
    return {"stat_type": req.stat_type, "new_value": new_val}

@app.get("/api/wishes", response_model=List[WishResponse])
def get_wishes(role: Optional[str] = None, limit: int = 100, offset: int = 0):
    conn = get_db()
    cursor = conn.cursor()
    if role and role != "all":
        cursor.execute(
            "SELECT id, recipient_role, recipient_name, sender_name, message, likes, created_at FROM wishes WHERE recipient_role LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?",
            (f"%{role}%", limit, offset)
        )
    else:
        cursor.execute(
            "SELECT id, recipient_role, recipient_name, sender_name, message, likes, created_at FROM wishes ORDER BY id DESC LIMIT ? OFFSET ?",
            (limit, offset)
        )
    rows = cursor.fetchall()
    wishes = [dict(row) for row in rows]
    conn.close()
    return wishes

@app.post("/api/wishes", response_model=WishResponse, status_code=201)
def create_wish(wish: WishCreate):
    conn = get_db()
    cursor = conn.cursor()
    now_iso = datetime.datetime.now().isoformat()
    cursor.execute(
        """
        INSERT INTO wishes (recipient_role, recipient_name, sender_name, message, likes, created_at)
        VALUES (?, ?, ?, ?, 0, ?)
        """,
        (nfc(wish.recipient_role), nfc(wish.recipient_name), nfc(wish.sender_name), nfc(wish.message), now_iso)
    )
    wish_id = cursor.lastrowid
    
    cursor.execute("UPDATE site_stats SET value = value + 1 WHERE key = 'total_wishes'")
    cursor.execute("UPDATE site_stats SET value = value + 1 WHERE key = 'total_hearts'")
    conn.commit()
    conn.close()

    return WishResponse(
        id=wish_id,
        recipient_role=nfc(wish.recipient_role),
        recipient_name=nfc(wish.recipient_name),
        sender_name=nfc(wish.sender_name),
        message=nfc(wish.message),
        likes=0,
        created_at=now_iso
    )

@app.put("/api/wishes/{wish_id}", response_model=WishResponse)
def update_wish(wish_id: int, update_data: WishUpdate):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, recipient_role, recipient_name, sender_name, message, likes, created_at FROM wishes WHERE id = ?", (wish_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Wish not found")

    new_role = nfc(update_data.recipient_role) if update_data.recipient_role is not None else row["recipient_role"]
    new_name = nfc(update_data.recipient_name) if update_data.recipient_name is not None else row["recipient_name"]
    new_sender = nfc(update_data.sender_name) if update_data.sender_name is not None else row["sender_name"]
    new_msg = nfc(update_data.message) if update_data.message is not None else row["message"]

    cursor.execute(
        "UPDATE wishes SET recipient_role = ?, recipient_name = ?, sender_name = ?, message = ? WHERE id = ?",
        (new_role, new_name, new_sender, new_msg, wish_id)
    )
    conn.commit()
    conn.close()

    return WishResponse(
        id=wish_id,
        recipient_role=new_role,
        recipient_name=new_name,
        sender_name=new_sender,
        message=new_msg,
        likes=row["likes"],
        created_at=row["created_at"]
    )

@app.delete("/api/wishes/{wish_id}")
def delete_wish(wish_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM wishes WHERE id = ?", (wish_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Wish not found")

    cursor.execute("DELETE FROM wishes WHERE id = ?", (wish_id,))
    cursor.execute("UPDATE site_stats SET value = MAX(0, value - 1) WHERE key = 'total_wishes'")
    conn.commit()
    conn.close()

    return {"status": "ok", "message": f"Deleted wish {wish_id}"}

@app.post("/api/wishes/reset-defaults")
def reset_to_defaults():
    """Reset wishes database strictly back to the 5 designated family members (Bà Nội, Bà Ngoại, Mẹ Thắm, Hân Bò, Hoa)."""
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM wishes")
    seed_default_wishes(cursor)
    conn.commit()
    conn.close()
    return {"status": "ok", "message": "Database successfully reset to default 5 family members"}

@app.post("/api/wishes/{wish_id}/like")
def like_wish(wish_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, likes FROM wishes WHERE id = ?", (wish_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Wish not found")

    new_likes = row["likes"] + 1
    cursor.execute("UPDATE wishes SET likes = ? WHERE id = ?", (new_likes, wish_id))
    cursor.execute("UPDATE site_stats SET value = value + 1 WHERE key = 'total_hearts'")
    conn.commit()
    conn.close()

    return {"id": wish_id, "likes": new_likes}

# ----------------- Serve Frontend Static Files -----------------
current_dir = os.path.dirname(os.path.abspath(__file__))

@app.get("/")
def serve_index():
    return FileResponse(os.path.join(current_dir, "index.html"))

# Mount remaining static assets (CSS, JS, images, audio)
app.mount("/", StaticFiles(directory=current_dir), name="static")

if __name__ == "__main__":
    print("\n" + "="*60)
    print("🌹 20/10 VIETNAMESE WOMEN'S DAY FULL-STACK SERVER")
    print("🚀 Server running at: http://127.0.0.1:8000")
    print("📖 API Documentation: http://127.0.0.1:8000/docs")
    print("="*60 + "\n")
    uvicorn.run(app, host="127.0.0.1", port=8000)
