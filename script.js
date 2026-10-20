// script.js - Interactive Controller for Vietnamese Women's Day 20/10 with Full-Stack Backend Integration

const API_BASE = (window.location.protocol === 'file:' || !window.location.port) 
    ? 'http://127.0.0.1:8000' 
    : '';

const WISHES_DATA = {
    ba: {
        role: "Bà Kính Yêu",
        title: "Kính Chúc Bà - Cội Nguồn Bình Yên Của Cả Gia Đình",
        avatar: "👵",
        badge: "Kính Yêu & Trường Thọ",
        shortDesc: "Bàn tay ấm áp và những câu chuyện cổ tích chở che cả tuổi thơ con.",
        envelopeColor: "#d97706",
        letter: {
            salutation: "Kính gửi Bà kính yêu của cháu,",
            poem: `Nắng vàng trải nhẹ lối thu sang,\nTháng Mười rộn rã đón ngày vàng.\nKính chúc Bà yêu muôn sức khỏe,\nAn lành, hạnh phúc mãi thênh thang!`,
            body: `Nhân ngày Phụ nữ Việt Nam 20/10, cháu muốn gửi trọn tấm lòng kính trọng và biết ơn sâu sắc nhất tới Bà. Cảm ơn Bà vì đã dành trọn cả cuộc đời tần tảo, hy sinh cho con cháu. Những câu chuyện cổ tích ngày thơ bé, lời ru êm đềm và bàn tay ấm áp của Bà là hành trang quý giá nhất sưởi ấm tâm hồn cháu trên mỗi bước đường trưởng thành.\n\nCháu chỉ mong sao Bà luôn dồi dào sức khỏe, sống vui tươi, thanh thản bên con cháu, mãi là bóng mát đại thụ chở che cho cả gia đình mình!`,
            closing: "Cháu của Bà thương yêu và kính trọng rất nhiều! ❤️"
        },
        wishesList: [
            "Nhân ngày 20/10, con/cháu kính chúc Bà luôn mạnh khỏe, sống lâu trăm tuổi, an yên hạnh phúc bên con cháu. Bà luôn là niềm tự hào và điểm tựa vững chãi nhất của cả gia đình!",
            "Kính chúc Bà yêu ngày Phụ nữ Việt Nam tràn ngập niềm vui! Cháu mong Bà luôn ăn ngon miệng, ngủ đẫy giấc, nụ cười hiền từ lúc nào cũng rạng rỡ trên môi.",
            "Bà ơi, ngày 20/10 chúng cháu kính chúc Bà vạn sự an khang, bách niên giai lão. Cảm ơn tình thương bao la trời biển mà Bà đã luôn dành cho chúng con suốt bao năm qua!",
            "Con kính chúc Bà một ngày 20/10 ấm áp và hạnh phúc. Cảm ơn những bữa cơm ngon của Bà, những lời dạy bảo ân cần nuôi lớn tâm hồn chúng con thành người."
        ],
        fireworkMessage: "Kính Chúc Bà Sống Lâu Trăm Tuổi - Vạn Điều Bình An!",
        palette: ['#ffd700', '#ffae19', '#fff275', '#ffffff']
    },
    me: {
        role: "Mẹ Yêu Dấu",
        title: "Kính Chúc Mẹ - Vầng Thái Dương Ấm Áp Của Đời Con",
        avatar: "👩‍🦰",
        badge: "Thiêng Liêng & Bất Tận",
        shortDesc: "Cả đời vì con mà không quản nhọc nhằn, vòng tay Mẹ là nơi bình yên nhất.",
        envelopeColor: "#e11d48",
        letter: {
            salutation: "Mẹ yêu dấu của con,",
            poem: `Đi khắp thế gian không ai tốt bằng Mẹ,\nGánh nặng cuộc đời không ai khổ bằng Cha.\nNước biển mênh mông không đong đầy tình Mẹ,\nMây trời lồng lộng không phủ kín công Cha.`,
            body: `Mẹ ơi, hôm nay là ngày 20/10 - ngày tôn vinh những người phụ nữ tuyệt vời, và trong lòng con, Mẹ luôn là người phụ nữ đẹp nhất, vĩ đại nhất trần đời!\n\nCon cảm ơn Mẹ vì bao năm tháng nhọc nhằn đã chăm sóc, yêu thương con vô điều kiện. Cảm ơn những bữa cơm ấm nóng sau mỗi chiều muộn, những lời dặn dò đầy lo lắng mỗi khi con đi xa. Con biết Mẹ đã vì chúng con mà hy sinh thanh xuân và ước mơ riêng nhiều đến nhường nào.\n\nNhân ngày đặc biệt này, con chẳng mong gì hơn ngoài việc Mẹ luôn khỏe mạnh, mỗi ngày trôi qua đều nhẹ nhõm, vui vẻ, bớt đi những âu lo và mãi giữ nét trẻ trung, yêu đời!`,
            closing: "Con yêu Mẹ nhiều hơn ngàn lời nói! Yêu Mẹ vô cùng! 🌹"
        },
        wishesList: [
            "Chúc Mẹ yêu của con một ngày 20/10 thật nhiều niềm vui và hạnh phúc! Cảm ơn Mẹ vì đã luôn là chỗ dựa bình yên nhất, là ngọn hải đăng soi sáng cho con mỗi khi mỏi mệt.",
            "Nhân ngày Phụ nữ Việt Nam, con chúc Mẹ luôn dồi dào sức khỏe, trẻ mãi không già, lúc nào cũng cười tươi như hoa và vạn sự như ý. Mẹ là người phụ nữ tuyệt vời nhất của con!",
            "Mẹ ơi, hôm nay Mẹ hãy nghỉ ngơi thật thoải mái nhé, việc nhà đã có chúng con lo! Chúc Mẹ ngày 20/10 ngập tràn hoa, quà và tình yêu thương của bố và chúng con!",
            "Gửi đến người phụ nữ đảm đang và dịu hiền nhất thế giới: Chúc Mẹ một ngày 20/10 ngập tràn niềm vui, 364 ngày còn lại đều bình an và luôn tự hào về chúng con!"
        ],
        fireworkMessage: "Mẹ Yêu Luôn Trẻ Đẹp, Hạnh Phúc & Bình An!",
        palette: ['#ff0844', '#ff4b72', '#ff758c', '#ffffff']
    },
    emgai: {
        role: "Em Gái Đáng Yêu",
        title: "Chúc Em Gái - Bông Hoa Tươi Thắm Rạng Rỡ",
        avatar: "👧",
        badge: "Rực Rỡ & Năng Động",
        shortDesc: "Luôn vui tươi, hồn nhiên và mang lại ngập tràn tiếng cười cho gia đình.",
        envelopeColor: "#ec4899",
        letter: {
            salutation: "Gửi cô em gái nhỏ đáng yêu của anh/chị,",
            poem: `Mùa hoa nở rộ đón ngày vui,\nEm gái tươi xinh rạng rỡ cười.\nHọc giỏi, may mắn và hạnh phúc,\nTương lai rộng mở sáng muôn nơi!`,
            body: `Chúc mừng ngày 20/10 tới cô em gái siêu nhí nhảnh và dễ thương của nhà mình!\n\nChúc em bước sang ngày lễ của phái đẹp với thật nhiều niềm vui, lúc nào cũng rạng ngời như hoa mùa xuân, luôn tự tin theo đuổi những ước mơ và đam mê của bản thân. Dù đôi lúc có hay chí chóe, cãi vặt nhưng em vẫn mãi là đứa em bé bỏng mà cả nhà hết lòng cưng chiều và bảo vệ.\n\nChúc em học thật giỏi, thi cử luôn đạt kết quả cao, công việc thăng tiến thuận lợi và sớm có người yêu thương chiều chuộng em như gia đình mình nhé!`,
            closing: "Cả nhà luôn ở bên cạnh và ủng hộ em hết mình! Chúc mừng 20/10! 🎉"
        },
        wishesList: [
            "Chúc em gái 20/10 nhận được cả núi quà, ngày càng xinh gái, duyên dáng và học giỏi/thành công nhé! Nhớ chia bớt kẹo và quà cho anh/chị đấy!",
            "Happy Vietnamese Women's Day em gái bé bỏng! Chúc em luôn giữ được nụ cười tỏa nắng, nhiều năng lượng tích cực và đạt được mọi mục tiêu trong tương lai!",
            "Chúc cô công chúa của cả nhà một ngày 20/10 thật rực rỡ, ngày càng trưởng thành, tự tin, thông minh và gặp thật nhiều may mắn trên con đường phía trước!",
            "20/10 chúc em gái: Ăn nhiều không béo, nhan sắc thăng hoa, tiền tài rủng rỉnh, thi đâu đỗ đó và luôn là cô bé đáng yêu nhất trần đời!"
        ],
        fireworkMessage: "Chúc Em Gái Luôn Xinh Đẹp, Tươi Vui & Thành Công!",
        palette: ['#c471ed', '#f64f59', '#12c2e9', '#fad0c4']
    }
};

// Flower database for bouquet builder
const FLOWERS = [
    { id: 'rose', name: 'Hoa Hồng Đỏ', icon: '🌹', color: '#ff2d55', meaning: 'Tình yêu nồng nàn & sự tôn kính' },
    { id: 'sunflower', name: 'Hoa Hướng Dương', icon: '🌻', color: '#f59e0b', meaning: 'Niềm tin, hy vọng & sức sống mãnh liệt' },
    { id: 'tulip', name: 'Hoa Tulip', icon: '🌷', color: '#ec4899', meaning: 'Sự tao nhã, kiêu sa & chân thành' },
    { id: 'carnation', name: 'Hoa Cẩm Chướng', icon: '🌸', color: '#f43f5e', meaning: 'Lòng tri ân, biết ơn sâu nặng' },
    { id: 'lotus', name: 'Hoa Sen Hồng', icon: '🪷', color: '#fb7185', meaning: 'Thanh cao, đoan trang & đức hy sinh' },
    { id: 'baby', name: 'Hoa Baby Trắng', icon: '🌼', color: '#e2e8f0', meaning: 'Trong sáng, thuần khiết & tình cảm dịu êm' }
];

// Lucky fortune quotes
const FORTUNES = [
    { title: "Quẻ Đại Cát 🌟", text: "Tràn ngập 365 ngày an vui, không còn chút âu lo muộn phiền!", charm: "Thịnh Vượng & An Lành" },
    { title: "Quẻ Trường Thọ 🍀", text: "Sức khỏe dồi dào, thân tâm an lạc, bách niên giai lão cùng con cháu!", charm: "Trường Thọ Vô Cương" },
    { title: "Quẻ Nhan Sắc 🌺", text: "Nhan sắc mãi rạng rỡ như đóa hồng ban mai, nụ cười thắp sáng cả đất trời!", charm: "Mãi Mãi Trẻ Đẹp" },
    { title: "Quẻ Tài Lộc 💰", text: "Quà cáp ngập tràn ngày 20/10, công danh sự nghiệp hanh thông tấn tới!", charm: "Vạn Sự Như Ý" },
    { title: "Quẻ Yêu Thương 💖", text: "Luôn được mọi người chở che, trân trọng và đón nhận tình yêu thương đong đầy!", charm: "Hạnh Phúc Trọn Vẹn" },
    { title: "Quẻ Ước Nguyện 🕊️", text: "Mọi lời nguyện cầu hôm nay đều được vũ trụ lắng nghe và biến thành hiện thực!", charm: "Cầu Được Ước Thấy" }
];

// Fallback in-memory wishes if backend is not started
let localWishesFallback = [
    {
        id: 1,
        recipient_role: "Bà",
        recipient_name: "Bà Nội kính yêu",
        sender_name: "Cháu Hoàng",
        message: "Nhân ngày 20/10, cháu kính chúc Bà luôn mạnh khỏe, sống lâu trăm tuổi, bình an bên con cháu. Cảm ơn những câu chuyện cổ tích và tình thương bao la của Bà!",
        likes: 18,
        created_at: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
        id: 2,
        recipient_role: "Mẹ",
        recipient_name: "Mẹ Lan thương yêu",
        sender_name: "Con trai út",
        message: "Chúc Mẹ yêu của con một ngày 20/10 ngập tràn nụ cười và niềm vui! Cả đời mẹ đã vất vả vì chúng con, con chỉ mong mẹ luôn an yên, trẻ đẹp và tự hào về con!",
        likes: 42,
        created_at: new Date(Date.now() - 3600000 * 3).toISOString()
    },
    {
        id: 3,
        recipient_role: "Em gái",
        recipient_name: "Bé Bống dễ thương",
        sender_name: "Anh hai",
        message: "Chúc em gái 20/10 xinh xắn, rạng rỡ, học giỏi, thi đâu đỗ đó và sớm đạt được mọi ước mơ nhé! Quà của anh gửi về sau nha!",
        likes: 29,
        created_at: new Date(Date.now() - 3600000 * 1).toISOString()
    }
];

class App {
    constructor() {
        this.currentRecipient = 'me';
        this.selectedFlowers = ['rose', 'rose', 'carnation']; // default bouquet
        this.openedGifts = new Set();
        this.currentWallRole = 'all';
        this.backendAvailable = false;

        this.initDOM();
        this.bindEvents();
        this.renderBouquet();
        this.checkBackendAndLoad();
    }

    initDOM() {
        // Elements
        this.musicToggleBtn = document.getElementById('music-toggle-btn');
        this.musicStatusText = document.getElementById('music-status-text');
        this.musicWave = document.getElementById('music-wave');
        this.fireworkShowBtn = document.getElementById('firework-show-btn');
        this.envelopeModal = document.getElementById('envelope-modal');
        this.envelopeWrapper = document.getElementById('envelope-wrapper');
        this.toast = document.getElementById('toast-notification');
        this.toastMsg = document.getElementById('toast-message');
        this.backendBadge = document.getElementById('backend-status-badge');

        // Setup sections
        this.setupPersonaCards();
        this.setupBouquetBuilder();
        this.setupFortuneBoxes();
        this.setupCustomWishCard();
        this.setupWallFilters();
    }

    bindEvents() {
        // Music Toggle
        this.musicToggleBtn.addEventListener('click', () => {
            const isPlaying = window.soundEngine.toggleMusic((active) => {
                this.updateMusicUI(active);
            });
            this.showToast(isPlaying ? "🎵 Đang bật giai điệu êm dịu 20/10" : "🔇 Đã tắt âm thanh");
        });

        // Fullscreen Fireworks Show
        let celebrationActive = false;
        this.fireworkShowBtn.addEventListener('click', () => {
            celebrationActive = !celebrationActive;
            window.particleCanvas.toggleGrandCelebration(celebrationActive);
            
            if (celebrationActive) {
                this.fireworkShowBtn.classList.add('active-glow');
                this.fireworkShowBtn.innerHTML = `<span>🛑 Dừng Pháo Hoa</span>`;
                this.showToast("🎆 Đại tiệc pháo hoa 20/10 rực rỡ bắt đầu!");
                this.triggerStatIncrement('total_fireworks');
                if (!window.soundEngine.isPlayingMusic) {
                    window.soundEngine.startMusic();
                    this.updateMusicUI(true);
                }
            } else {
                this.fireworkShowBtn.classList.remove('active-glow');
                this.fireworkShowBtn.innerHTML = `<span>🎆 Đại Tiệc Pháo Hoa</span>`;
                this.showToast("Đã dừng đại tiệc pháo hoa");
            }
        });

        // Close Envelope Modal
        document.getElementById('close-modal-btn').addEventListener('click', () => {
            this.closeEnvelopeModal();
        });

        this.envelopeModal.addEventListener('click', (e) => {
            if (e.target === this.envelopeModal) {
                this.closeEnvelopeModal();
            }
        });

        // Envelope Flap / Wax Seal click
        document.getElementById('wax-seal-btn').addEventListener('click', () => {
            this.openEnvelopeLetter();
        });

        // Quick recipient switch inside modal
        document.querySelectorAll('.modal-recipient-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetKey = e.currentTarget.dataset.recipient;
                this.showLetterFor(targetKey);
            });
        });

        // Copy letter inside modal
        document.getElementById('copy-letter-btn').addEventListener('click', () => {
            const data = WISHES_DATA[this.currentRecipient];
            const fullText = `${data.letter.salutation}\n\n${data.letter.poem}\n\n${data.letter.body}\n\n${data.letter.closing}`;
            this.copyToClipboard(fullText, "💌 Đã sao chép toàn bộ bức thư!");
        });

        // Firework tribute from modal
        document.getElementById('modal-firework-tribute-btn').addEventListener('click', () => {
            const data = WISHES_DATA[this.currentRecipient];
            window.particleCanvas.launchSpecialTribute(data.role, data.fireworkMessage, data.palette);
            this.triggerStatIncrement('total_fireworks');
            this.showToast(`🎆 Đã bắn pháo hoa chúc mừng ${data.role}!`);
        });

        // Submit wish to Backend Wall
        document.getElementById('btn-submit-to-wall').addEventListener('click', () => {
            this.submitWishToBackend();
        });
    }

    // ----------------- Backend Integration -----------------
    async checkBackendAndLoad() {
        try {
            const res = await fetch(`${API_BASE}/api/health`, { method: 'GET' });
            if (res.ok) {
                this.backendAvailable = true;
                if (this.backendBadge) {
                    this.backendBadge.innerHTML = `
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <span>Full-Stack Live</span>
                    `;
                    this.backendBadge.className = "hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/30";
                }
                this.loadBackendStats();
                this.loadWallWishes();
                return;
            }
        } catch (e) {
            console.log("Running in offline client mode or backend not yet reached.");
        }

        // Fallback offline mode
        this.backendAvailable = false;
        if (this.backendBadge) {
            this.backendBadge.innerHTML = `
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Chế độ Offline</span>
            `;
            this.backendBadge.className = "hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/20 text-amber-300 border border-amber-400/30";
        }
        this.updateStatsDisplay({
            total_wishes: localWishesFallback.length,
            total_fireworks: 128,
            total_bouquets: 64,
            total_hearts: 520
        });
        this.renderWallCards(localWishesFallback);
    }

    async loadBackendStats() {
        try {
            const res = await fetch(`${API_BASE}/api/stats`);
            if (res.ok) {
                const data = await res.json();
                this.updateStatsDisplay(data);
            }
        } catch (e) {}
    }

    updateStatsDisplay(stats) {
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = Number(val).toLocaleString('vi-VN');
        };
        setVal('stat-wishes', stats.total_wishes);
        setVal('stat-fireworks', stats.total_fireworks);
        setVal('stat-bouquets', stats.total_bouquets);
        setVal('stat-hearts', stats.total_hearts);
    }

    async triggerStatIncrement(statType) {
        if (!this.backendAvailable) return;
        try {
            await fetch(`${API_BASE}/api/stats/increment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stat_type: statType })
            });
            this.loadBackendStats();
        } catch (e) {}
    }

    async loadWallWishes() {
        try {
            const url = this.currentWallRole === 'all' 
                ? `${API_BASE}/api/wishes` 
                : `${API_BASE}/api/wishes?role=${encodeURIComponent(this.currentWallRole)}`;
            const res = await fetch(url);
            if (res.ok) {
                const wishes = await res.json();
                this.renderWallCards(wishes);
            }
        } catch (e) {
            this.renderWallCards(localWishesFallback);
        }
    }

    setupWallFilters() {
        document.querySelectorAll('.wall-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.wall-filter-btn').forEach(b => b.classList.remove('active-tab'));
                e.currentTarget.classList.add('active-tab');
                this.currentWallRole = e.currentTarget.dataset.role;

                if (this.backendAvailable) {
                    this.loadWallWishes();
                } else {
                    const filtered = this.currentWallRole === 'all' 
                        ? localWishesFallback 
                        : localWishesFallback.filter(w => w.recipient_role === this.currentWallRole);
                    this.renderWallCards(filtered);
                }
            });
        });
    }

    renderWallCards(wishes) {
        const grid = document.getElementById('wall-wishes-grid');
        grid.innerHTML = '';

        if (!wishes || wishes.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full py-12 text-center text-rose-200/50">
                    <p class="text-3xl mb-2">💌</p>
                    <p class="text-sm">Chưa có lời chúc nào trong mục này. Hãy là người đầu tiên gửi trao yêu thương nhé!</p>
                </div>
            `;
            return;
        }

        wishes.forEach(w => {
            const roleBadgeColor = w.recipient_role === 'Bà' 
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/30' 
                : (w.recipient_role === 'Mẹ' ? 'bg-rose-500/20 text-rose-300 border-rose-400/30' : 'bg-pink-500/20 text-pink-300 border-pink-400/30');

            const roleIcon = w.recipient_role === 'Bà' ? '👵' : (w.recipient_role === 'Mẹ' ? '👩‍🦰' : '👧');
            const timeAgo = this.formatTimeAgo(w.created_at);

            const card = document.createElement('div');
            card.className = 'wish-wall-card p-5 rounded-2xl glass-card flex flex-col justify-between border border-white/10 hover:border-rose-400/60 transition-all';
            card.innerHTML = `
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold border ${roleBadgeColor}">
                            ${roleIcon} Gửi ${w.recipient_role}
                        </span>
                        <span class="text-[11px] text-rose-200/50">${timeAgo}</span>
                    </div>
                    <h5 class="text-base font-bold font-serif-luxury text-rose-100 mb-1">
                        ${w.recipient_name}
                    </h5>
                    <p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans mb-4 whitespace-pre-line">
                        "${w.message}"
                    </p>
                </div>
                <div class="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div class="text-[11px] text-amber-200/80 font-medium">
                        Ký tên: <span class="text-white">${w.sender_name}</span>
                    </div>
                    <button class="like-wish-btn flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 text-xs font-semibold transition-all active:scale-95" data-id="${w.id}">
                        <span>❤️</span>
                        <span class="like-count">${w.likes || 0}</span>
                    </button>
                </div>
            `;

            const likeBtn = card.querySelector('.like-wish-btn');
            likeBtn.addEventListener('click', () => {
                this.handleLikeWish(w.id, likeBtn);
            });

            grid.appendChild(card);
        });
    }

    async handleLikeWish(id, buttonEl) {
        const countSpan = buttonEl.querySelector('.like-count');
        const currentCount = parseInt(countSpan.innerText) || 0;
        countSpan.innerText = currentCount + 1;
        buttonEl.classList.add('scale-110', 'bg-rose-600', 'text-white');
        setTimeout(() => buttonEl.classList.remove('scale-110'), 250);

        // Particle sparkle at button location
        const rect = buttonEl.getBoundingClientRect();
        window.particleCanvas.spawnClickSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);

        if (this.backendAvailable) {
            try {
                await fetch(`${API_BASE}/api/wishes/${id}/like`, { method: 'POST' });
                this.loadBackendStats();
            } catch (e) {}
        } else {
            const item = localWishesFallback.find(x => x.id === id);
            if (item) item.likes = (item.likes || 0) + 1;
        }

        this.showToast("💖 Cảm ơn bạn đã thả tim cho lời chúc!");
    }

    async submitWishToBackend() {
        const role = document.getElementById('select-role').value;
        const recipient = document.getElementById('input-recipient').value.trim();
        const message = document.getElementById('input-message').value.trim();
        const sender = document.getElementById('input-sender').value.trim();

        if (!recipient) {
            this.showToast("Vui lòng nhập tên người nhận!");
            return;
        }
        if (!message) {
            this.showToast("Vui lòng viết lời chúc của bạn!");
            return;
        }

        const payload = {
            recipient_role: role,
            recipient_name: recipient,
            sender_name: sender || "Người gửi ẩn danh",
            message: message
        };

        if (this.backendAvailable) {
            try {
                const res = await fetch(`${API_BASE}/api/wishes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (res.ok) {
                    const newWish = await res.json();
                    this.showToast("✨ Lời chúc của bạn đã được lưu vào hệ thống!");
                    window.particleCanvas.launchSpecialTribute(role, `Lời Chúc Tặng ${recipient} Đã Gửi Thành Công!`, ['#ff4b72', '#ffd700', '#12c2e9']);
                    this.loadWallWishes();
                    this.loadBackendStats();
                    return;
                }
            } catch (e) {}
        }

        // Offline fallback
        const offlineWish = {
            id: Date.now(),
            ...payload,
            likes: 1,
            created_at: new Date().toISOString()
        };
        localWishesFallback.unshift(offlineWish);
        this.renderWallCards(localWishesFallback);
        window.particleCanvas.launchSpecialTribute(role, `Lời Chúc Tặng ${recipient} Đã Được Tạo!`, ['#ff4b72', '#ffd700']);
        this.showToast("✨ Lời chúc đã được thêm lên bức tường!");
    }

    formatTimeAgo(isoString) {
        if (!isoString) return "Vừa xong";
        const date = new Date(isoString);
        const diffMs = Date.now() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 1) return "Vừa xong";
        if (diffMins < 60) return `${diffMins} phút trước`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} giờ trước`;
        return `${Math.floor(diffHours / 24)} ngày trước`;
    }

    // ----------------- Persona Cards -----------------
    setupPersonaCards() {
        ['ba', 'me', 'emgai'].forEach(key => {
            const data = WISHES_DATA[key];

            // Open letter button
            const openLetterBtn = document.getElementById(`btn-open-letter-${key}`);
            if (openLetterBtn) {
                openLetterBtn.addEventListener('click', () => {
                    this.openEnvelopeModal(key);
                });
            }

            // Launch tribute firework button
            const tributeBtn = document.getElementById(`btn-tribute-${key}`);
            if (tributeBtn) {
                tributeBtn.addEventListener('click', () => {
                    window.particleCanvas.launchSpecialTribute(data.role, data.fireworkMessage, data.palette);
                    this.triggerStatIncrement('total_fireworks');
                    this.showToast(`✨ Bắn pháo hoa kính dâng ${data.role}!`);
                });
            }

            // Populate curated wishes
            const wishesContainer = document.getElementById(`wishes-list-${key}`);
            if (wishesContainer) {
                wishesContainer.innerHTML = '';
                data.wishesList.forEach((wish, idx) => {
                    const wishItem = document.createElement('div');
                    wishItem.className = 'wish-item p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-rose-400/50 hover:bg-white/10 transition-all flex items-start justify-between gap-3 text-sm leading-relaxed';
                    wishItem.innerHTML = `
                        <div class="flex-1 text-rose-100">
                            <span class="inline-block text-rose-400 font-semibold mr-1.5">#${idx + 1}</span> ${wish}
                        </div>
                        <button class="copy-wish-btn shrink-0 px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 hover:text-white transition-all text-xs flex items-center gap-1 active:scale-95" title="Sao chép lời chúc">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                            <span>Chép</span>
                        </button>
                    `;
                    wishItem.querySelector('.copy-wish-btn').addEventListener('click', () => {
                        this.copyToClipboard(wish, `✨ Đã sao chép lời chúc gửi đến ${data.role}!`);
                    });
                    wishesContainer.appendChild(wishItem);
                });
            }
        });
    }

    updateMusicUI(active) {
        if (active) {
            this.musicToggleBtn.classList.add('bg-rose-600', 'text-white');
            this.musicStatusText.innerText = "Đang Phát Nhạc";
            if (this.musicWave) this.musicWave.classList.remove('opacity-0');
        } else {
            this.musicToggleBtn.classList.remove('bg-rose-600', 'text-white');
            this.musicStatusText.innerText = "Tạm Dừng";
            if (this.musicWave) this.musicWave.classList.add('opacity-0');
        }
    }

    openEnvelopeModal(recipientKey) {
        this.currentRecipient = recipientKey;
        this.renderEnvelopeContent();

        // Reset envelope state
        this.envelopeWrapper.classList.remove('is-open');
        this.envelopeModal.classList.remove('hidden');
        this.envelopeModal.classList.add('flex');

        if (window.soundEngine) {
            window.soundEngine.playSparkle();
        }
    }

    showLetterFor(recipientKey) {
        this.currentRecipient = recipientKey;
        this.renderEnvelopeContent();
        this.openEnvelopeLetter();
    }

    renderEnvelopeContent() {
        const data = WISHES_DATA[this.currentRecipient];

        // Highlight tab
        document.querySelectorAll('.modal-recipient-tab').forEach(tab => {
            if (tab.dataset.recipient === this.currentRecipient) {
                tab.classList.add('active-tab');
            } else {
                tab.classList.remove('active-tab');
            }
        });

        // Set seal title
        document.getElementById('seal-recipient-name').innerText = data.role;
        document.getElementById('envelope-recipient-tag').innerText = `Gửi tặng: ${data.role} 💖`;

        // Letter contents
        document.getElementById('letter-salutation').innerText = data.letter.salutation;
        document.getElementById('letter-poem').innerText = data.letter.poem;
        document.getElementById('letter-body').innerText = data.letter.body;
        document.getElementById('letter-closing').innerText = data.letter.closing;
    }

    openEnvelopeLetter() {
        if (!this.envelopeWrapper.classList.contains('is-open')) {
            this.envelopeWrapper.classList.add('is-open');
            if (window.soundEngine) {
                window.soundEngine.playEnvelopeOpen();
            }
        }
    }

    closeEnvelopeModal() {
        this.envelopeModal.classList.add('hidden');
        this.envelopeModal.classList.remove('flex');
        this.envelopeWrapper.classList.remove('is-open');
    }

    setupBouquetBuilder() {
        const flowerOptionsContainer = document.getElementById('flower-options-list');
        flowerOptionsContainer.innerHTML = '';

        FLOWERS.forEach(flower => {
            const btn = document.createElement('button');
            btn.className = 'flower-btn flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-rose-400 hover:bg-rose-500/20 text-left transition-all active:scale-95';
            btn.innerHTML = `
                <span class="text-2xl">${flower.icon}</span>
                <div>
                    <div class="font-medium text-sm text-white">${flower.name}</div>
                    <div class="text-[11px] text-rose-200/70">${flower.meaning}</div>
                </div>
            `;
            btn.addEventListener('click', () => {
                this.addFlowerToBouquet(flower.id);
            });
            flowerOptionsContainer.appendChild(btn);
        });

        // Clear bouquet
        document.getElementById('btn-clear-bouquet').addEventListener('click', () => {
            this.selectedFlowers = [];
            this.renderBouquet();
            this.showToast("Đã làm mới bó hoa");
        });

        // Gift bouquet button
        document.getElementById('btn-gift-bouquet').addEventListener('click', () => {
            if (this.selectedFlowers.length === 0) {
                this.showToast("Hãy chọn ít nhất 1 bông hoa cho bó hoa của bạn nhé! 🌸");
                return;
            }
            window.particleCanvas.launchSpecialTribute("Bó Hoa 20/10", "Gửi Tặng Bó Hoa Yêu Thương Rực Rỡ!", ['#ff4b72', '#ffd700', '#ff9a9e']);
            this.triggerStatIncrement('total_bouquets');
            if (window.soundEngine) {
                window.soundEngine.playGiftFanfare();
            }
            this.showToast("💐 Đã gửi trao bó hoa ngập tràn yêu thương!");
        });
    }

    addFlowerToBouquet(flowerId) {
        if (this.selectedFlowers.length >= 15) {
            this.showToast("Bó hoa đã rất đầy đặn và đẹp rồi bạn ơi! 🌸");
            return;
        }
        this.selectedFlowers.push(flowerId);
        this.renderBouquet();
        if (window.soundEngine) {
            window.soundEngine.playSparkle();
        }
    }

    renderBouquet() {
        const display = document.getElementById('bouquet-flowers-display');
        const countText = document.getElementById('bouquet-count');
        const meaningList = document.getElementById('bouquet-meaning-summary');

        countText.innerText = `${this.selectedFlowers.length} đóa hoa`;

        // Render graphical representation
        display.innerHTML = '';
        if (this.selectedFlowers.length === 0) {
            display.innerHTML = `<div class="text-rose-200/50 text-sm py-8 text-center italic">Chưa có bông hoa nào. Nhấn vào các loại hoa bên cạnh để thêm vào bó!</div>`;
            meaningList.innerHTML = `<span class="text-xs text-rose-200/50">Chọn hoa để xem ý nghĩa kết hợp</span>`;
            return;
        }

        // Layout flowers in an artistic fan-out bouquet
        const total = this.selectedFlowers.length;
        const radius = 65;
        this.selectedFlowers.forEach((fid, idx) => {
            const fInfo = FLOWERS.find(f => f.id === fid) || FLOWERS[0];
            const angle = -70 + (140 / Math.max(1, total - 1)) * idx;
            const rad = (angle * Math.PI) / 180;
            const offsetX = Math.sin(rad) * radius * (0.8 + (idx % 2) * 0.3);
            const offsetY = -Math.cos(rad) * radius * 0.7 - (idx % 3) * 8;

            const flEl = document.createElement('div');
            flEl.className = 'flower-bouquet-item animate-pop-in';
            flEl.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${angle * 0.4}deg)`;
            flEl.innerHTML = `<span class="text-3xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">${fInfo.icon}</span>`;
            display.appendChild(flEl);
        });

        // Summary of unique meanings
        const uniqueFids = [...new Set(this.selectedFlowers)];
        meaningList.innerHTML = '';
        uniqueFids.forEach(fid => {
            const f = FLOWERS.find(it => it.id === fid);
            const chip = document.createElement('span');
            chip.className = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-200 text-xs border border-rose-400/20';
            chip.innerHTML = `${f.icon} <b>${f.name}</b>: ${f.meaning}`;
            meaningList.appendChild(chip);
        });
    }

    setupFortuneBoxes() {
        const container = document.getElementById('fortune-boxes-grid');
        container.innerHTML = '';

        FORTUNES.forEach((fortune, idx) => {
            const box = document.createElement('div');
            box.className = 'fortune-box group cursor-pointer p-5 rounded-2xl bg-gradient-to-br from-rose-950/40 via-purple-950/30 to-pink-950/40 border border-white/10 hover:border-rose-400/60 transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[170px] shadow-lg hover:shadow-rose-500/20';
            
            box.innerHTML = `
                <div class="box-closed-state flex flex-col items-center gap-2 transition-transform group-hover:scale-105">
                    <div class="text-4xl animate-bounce-slow">🎁</div>
                    <div class="text-rose-200 font-semibold text-sm">Hộp Quà May Mắn #${idx + 1}</div>
                    <div class="text-xs text-rose-300/60">Nhấp để mở quẻ 20/10</div>
                </div>
                <div class="box-opened-state hidden flex-col items-center gap-2 animate-scale-up">
                    <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-300 font-bold border border-amber-400/40">${fortune.title}</span>
                    <p class="text-sm text-white font-medium leading-snug px-2">"${fortune.text}"</p>
                    <span class="text-xs text-rose-300 font-serif italic mt-1">✨ ${fortune.charm}</span>
                </div>
            `;

            box.addEventListener('click', () => {
                if (this.openedGifts.has(idx)) return;
                this.openedGifts.add(idx);

                box.querySelector('.box-closed-state').classList.add('hidden');
                const opened = box.querySelector('.box-opened-state');
                opened.classList.remove('hidden');
                opened.classList.add('flex');
                box.classList.add('ring-2', 'ring-rose-400', 'bg-rose-900/40');

                // Burst particles
                const rect = box.getBoundingClientRect();
                window.particleCanvas.spawnClickSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
                this.triggerStatIncrement('total_hearts');

                if (window.soundEngine) {
                    window.soundEngine.playGiftFanfare();
                }
                this.showToast(`🎉 Bạn đã mở được: ${fortune.title}`);
            });

            container.appendChild(box);
        });
    }

    setupCustomWishCard() {
        const inputSender = document.getElementById('input-sender');
        const inputRecipient = document.getElementById('input-recipient');
        const selectRole = document.getElementById('select-role');
        const inputMessage = document.getElementById('input-message');

        const cardPreviewRecipient = document.getElementById('card-preview-recipient');
        const cardPreviewRole = document.getElementById('card-preview-role');
        const cardPreviewMessage = document.getElementById('card-preview-message');
        const cardPreviewSender = document.getElementById('card-preview-sender');

        const updatePreview = () => {
            const role = selectRole.value;
            const recipient = inputRecipient.value.trim() || (role === 'Bà' ? 'Bà kính yêu' : role === 'Mẹ' ? 'Mẹ thương yêu' : 'Em gái nhỏ');
            const sender = inputSender.value.trim() || 'Người gửi trao yêu thương';
            const message = inputMessage.value.trim() || 'Chúc người phụ nữ tuyệt vời một ngày 20/10 ngập tràn niềm vui, sức khỏe dồi dào, luôn tươi trẻ, bình an và hạnh phúc trọn vẹn bên những người thân thương!';

            cardPreviewRecipient.innerText = `Kính gửi: ${recipient}`;
            cardPreviewRole.innerText = `Dành tặng người ${role} tuyệt vời`;
            cardPreviewMessage.innerText = message;
            cardPreviewSender.innerText = `Ký tên: ${sender}`;
        };

        [inputSender, inputRecipient, selectRole, inputMessage].forEach(el => {
            el.addEventListener('input', updatePreview);
        });

        // Copy custom card
        document.getElementById('btn-copy-custom-card').addEventListener('click', () => {
            const text = `${cardPreviewRecipient.innerText}\n\n${cardPreviewMessage.innerText}\n\n${cardPreviewSender.innerText}`;
            this.copyToClipboard(text, "💌 Đã sao chép nội dung thiệp chúc mừng!");
        });

        // Firework for custom card
        document.getElementById('btn-firework-custom-card').addEventListener('click', () => {
            const role = selectRole.value;
            window.particleCanvas.launchSpecialTribute(role, `Chúc Mừng 20/10: ${cardPreviewRecipient.innerText}!`, ['#ff4b72', '#ffd700', '#12c2e9']);
            this.triggerStatIncrement('total_fireworks');
            this.showToast("🎆 Pháo hoa chúc mừng đã rực sáng!");
        });

        updatePreview();
    }

    copyToClipboard(text, successMsg) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast(successMsg);
            }).catch(() => {
                this.fallbackCopy(text, successMsg);
            });
        } else {
            this.fallbackCopy(text, successMsg);
        }
    }

    fallbackCopy(text, successMsg) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            this.showToast(successMsg);
        } catch (e) {
            this.showToast("Không thể tự động sao chép. Bạn hãy bôi đen để chép nhé!");
        }
        document.body.removeChild(textarea);
    }

    showToast(message) {
        if (!this.toast) return;
        this.toastMsg.innerText = message;
        this.toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        this.toast.classList.add('opacity-100', 'translate-y-0');

        clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => {
            this.toast.classList.remove('opacity-100', 'translate-y-0');
            this.toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        }, 2800);
    }
}

// Instantiate on load
window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
