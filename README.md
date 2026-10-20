# 🌹 Ứng Dụng Full-Stack Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10

Ứng dụng web Full-Stack cao cấp và tương tác trực quan tôn vinh những người phụ nữ yêu thương trong gia đình: **Bà Nội**, **Bà Ngoại**, **Mẹ Thắm**, cùng hai em gái **Hân Bò** và **Hoa** nhân ngày 20 - 10.

---

## 🏗️ Kiến Trúc Hệ Thống (Đầy Đủ Frontend & Backend)

### 1. 🖥️ **Frontend (Giao Diện & Tương Tác)**
- **HTML5 Canvas Engines**:
  - `fireworks.js`: Bắn pháo hoa cánh hoa tròn, pháo hoa trái tim, pháo hoa liễu rủ, thông điệp bay rực sáng, tương tác nhấp chuột phóng pháo hoa và hạt lấp lánh.
  - `petals-canvas`: Cánh hoa hồng nhung và hoa phấn rơi lượn sóng 3D bồng bềnh.
- **Web Audio API Engine (`audio.js`)**:
  - Tự động tổng hợp giai điệu piano/hộp nhạc lãng mạn Canon êm ái, 100% độc lập không cần file mp3 ngoài.
  - Hiệu ứng âm thanh khi mở thư, tiếng pháo hoa nổ trầm ấm, tiếng leng keng quà tặng.
- **Các Thành Phần Tương Tác Nghệ Thuật**:
  - **3 Thẻ Chúc Bà, Mẹ, Em Gái**: Kèm các lời chúc chọn lọc và nút sao chép nhanh 1-chạm.
  - **Phong Bì Thư 3D Cổ Điển**: Nắp phong bì mở với con dấu sáp vàng 20/10, lá thư trượt lên chứa thơ lục bát và lời tâm sự sâu lắng.
  - **Vườn Hoa Tự Cắm 20/10**: Chọn và cắm bó hoa thời gian thực kèm phân tích ý nghĩa các loài hoa.
  - **6 Hộp Quà May Mắn & Bốc Quẻ 20/10**: Bật mở nhận quẻ may mắn ngày lễ.
  - **Sổ Lưu Bút & Bức Tường Lời Chúc (Live Wall)**: Đăng lời chúc, xem lời chúc từ cộng đồng và thả tim trực tiếp.

### 2. ⚙️ **Backend & Database (`server.py`)**
- **Framework**: `FastAPI` (Python) hiệu năng cao, chuẩn RESTful API.
- **Cơ Sở Dữ Liệu**: `SQLite` (`wishes.db`) lưu trữ dữ liệu vĩnh viễn:
  - Bảng `wishes`: Lưu trữ tất cả lời chúc gửi đến Bà, Mẹ, Em gái kèm lượt thả tim (likes) và mốc thời gian.
  - Bảng `site_stats`: Đếm tổng số lời chúc đã trao, số lượt pháo hoa đã thắp sáng, số bó hoa trao tặng, tổng số tim yêu thương.
- **REST API Endpoints**:
  - `GET /api/health`: Kiểm tra trạng thái máy chủ.
  - `GET /api/stats`: Lấy thống kê số liệu trực tiếp theo thời gian thực.
  - `POST /api/stats/increment`: Cập nhật tăng số lượt bắn pháo hoa, cắm hoa, thả tim.
  - `GET /api/wishes`: Lấy danh sách lời chúc từ cơ sở dữ liệu (hỗ trợ lọc theo `Bà`, `Mẹ`, `Em gái`).
  - `POST /api/wishes`: Tạo mới lời chúc và lưu vào cơ sở dữ liệu SQLite.
  - `POST /api/wishes/{id}/like`: Thả tim trực tiếp cho từng lời chúc trên bức tường.
  - `GET /`: Phục vụ trực tiếp giao diện Frontend.
  - `GET /docs`: Giao diện tài liệu Swagger UI tự động của FastAPI.
- **Chế độ Chạy Linh Hoạt (Graceful Fallback)**:
  - Khi bật máy chủ backend: Hệ thống hoạt động full-stack trực tiếp với database.
  - Nếu mở trực tiếp file `index.html` (khi chưa bật server): Web vẫn hoạt động mượt mà ở chế độ ngoại tuyến (Offline Client Mode).

---

## 🚀 Hướng Dẫn Khởi Chạy

### Cách 1: Chạy Full-Stack Đầy Đủ (Khuyên Dùng)
Chỉ cần nhấp đúp chuột vào file:
👉 **`run_server.bat`**

Trình duyệt sẽ tự động mở trang web tại địa chỉ:
🌐 **`http://127.0.0.1:8000`**

*(Hoặc mở terminal gõ: `py -3 server.py`)*

### Cách 2: Mở Nhanh Không Cần Máy Chủ
Nhấp đúp chuột trực tiếp vào file:
👉 **`index.html`**
