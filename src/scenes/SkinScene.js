// ─────────────────────────────────────────────────────────────────────
//  SkinScene.js  –  Bài 39: Da và Điều hòa Thân nhiệt ở Người
//  Canvas: 1200 × 800 px   (p5.js coordinate space)
//  No new assets required – all graphics are code-drawn.
// ─────────────────────────────────────────────────────────────────────

// ── NARRATOR CONTENT ──────────────────────────────────────────────────

const SkinNarration0 = {
    text: [
        "Da là cơ quan lớn nhất cơ thể người, bao phủ toàn bộ bề mặt cơ thể.",
        "Da gồm 3 lớp chính: lớp biểu bì ở ngoài, lớp bì ở giữa và lớp mô dưới da.",
        "Lớp biểu bì chứa tế bào sừng tạo hàng rào bảo vệ và tế bào melanin tạo màu da.",
        "Lớp bì chứa collagen, mạch máu, dây thần kinh, nang lông và tuyến mồ hôi.",
        "Lớp mô dưới da chứa mô mỡ giúp cách nhiệt và dự trữ năng lượng cho cơ thể.",
        "Da có chức năng: bảo vệ, điều hòa thân nhiệt, cảm nhận xúc giác và tổng hợp vitamin D.",
        "Ghép da là kỹ thuật y tế thay thế vùng da tổn thương nặng bằng da lành từ chỗ khác trên cơ thể hoặc từ người hiến tặng."
    ],
    sprite: [
        CharacterSprite.TALK, CharacterSprite.EXPL, CharacterSprite.EXPL,
        CharacterSprite.EXPL, CharacterSprite.P_EXPL, CharacterSprite.P_TALK,
        CharacterSprite.P_EXPL
    ]
};

const SkinNarration1 = {
    text: [
        "Điều hòa thân nhiệt là khả năng duy trì nhiệt độ cơ thể ổn định quanh mức 37°C.",
        "Khi trời nóng: mạch máu giãn ra, tuyến mồ hôi hoạt động mạnh để làm mát cơ thể.",
        "Hơi nước bay hơi từ mồ hôi mang theo nhiệt ra ngoài, hạ thân nhiệt hiệu quả.",
        "Khi trời lạnh: mạch máu co lại, lông dựng lên tạo lớp không khí cách nhiệt.",
        "Cơ thể cũng run rẩy để sinh nhiệt khi nhiệt độ môi trường xuống quá thấp."
    ],
    sprite: [
        CharacterSprite.TALK, CharacterSprite.EXPL, CharacterSprite.EXPL,
        CharacterSprite.P_EXPL, CharacterSprite.P_TALK
    ]
};

const SkinNarration2 = {
    text: [
        "Da có thể mắc nhiều bệnh lý nguy hiểm nếu không được chăm sóc đúng cách.",
        "Vi khuẩn, nấm, ký sinh trùng và tia UV đều là tác nhân gây hại cho da.",
        "Nhấn vào từng bệnh để so sánh da lành và da bị bệnh, tìm hiểu cách phòng tránh.",
        "Chăm sóc da đúng cách giúp duy trì hàng rào bảo vệ và phòng ngừa bệnh lý."
    ],
    sprite: [
        CharacterSprite.TALK, CharacterSprite.EXPL,
        CharacterSprite.EXPL, CharacterSprite.P_TALK
    ]
};

const SkinNarration3 = {
    text: [
        "Đây là mô hình 3D của da người với đầy đủ ba lớp: biểu bì, lớp bì và mô dưới da.",
        "Bạn có thể kéo chuột để xoay, cuộn để phóng to/thu nhỏ, và nhấp phải để di chuyển."
    ],
    sprite: [CharacterSprite.TALK, CharacterSprite.EXPL]
};

// ── HOTSPOT DEFINITIONS  (Step 0 – tap-to-reveal) ─────────────────────
//
//  Coordinates are corner-based (x, y, w, h) in p5 canvas pixels,
//  matching the code-drawn anatomy (sx=30, sy=72, sw=700).
//
//  Layer reference:
//    Epidermis    y =  72 →  160   (h =  88)
//    Dermis       y = 160 →  455   (h = 295)
//    Hypodermis   y = 455 →  725   (h = 270)
//
//  _hitHotspot() picks the smallest-area match so embedded structures
//  (nang lông, tuyến mồ hôi …) win over their parent layers.
// ──────────────────────────────────────────────────────────────────────

const SKIN_HOTSPOTS = [
    {
        id: 'bieu_bi', label: 'Lớp biểu bì',
        x: 30, y: 72, w: 700, h: 88,
        desc: 'Lớp ngoài cùng gồm tầng sừng (tế bào chết, không thấm nước) và tầng tế bào sống có melanin tạo màu da. Vai trò: hàng rào vật lý chống vi khuẩn, tia UV và mất nước.',
        swatchColor: [255, 215, 175]
    },
    {
        id: 'lop_bi', label: 'Lớp bì (Dermis)',
        x: 30, y: 160, w: 700, h: 295,
        desc: 'Lớp giữa giàu collagen và sợi đàn hồi. Chứa mạch máu, dây thần kinh, nang lông và tuyến mồ hôi. Đây là lớp quan trọng nhất trong điều hòa thân nhiệt.',
        swatchColor: [255, 180, 155]
    },
    {
        id: 'mo_duoi_da', label: 'Lớp mô dưới da',
        x: 30, y: 455, w: 700, h: 270,
        desc: 'Lớp sâu nhất chứa tế bào mỡ (adipocyte) tích trữ lipid. Dự trữ năng lượng dài hạn, cách nhiệt nhờ mỡ dẫn nhiệt kém, đệm chống va đập cơ học.',
        swatchColor: [255, 235, 125]
    },
    {
        id: 'nang_long', label: 'Nang lông & Cơ chân lông',
        x: 90, y: 140, w: 70, h: 290,
        desc: 'Nang lông là túi biểu bì bao quanh gốc lông. Cơ chân lông khi co (do lạnh) làm lông dựng đứng, tạo lớp không khí cách nhiệt → gây "nổi da gà".',
        swatchColor: [70, 45, 22]
    },
    {
        id: 'tuyen_nhon', label: 'Tuyến nhờn',
        x: 152, y: 178, w: 62, h: 48,
        desc: 'Tuyến nhờn gắn vào nang lông, tiết bã nhờn (sebum) giữ ẩm và tạo lớp màng bảo vệ da khỏi vi khuẩn, nấm. Hoạt động quá mức gây bít lỗ chân lông, dẫn đến mụn trứng cá.',
        swatchColor: [210, 190, 80]
    },
    {
        id: 'tuyen_mo_hoi', label: 'Tuyến mồ hôi',
        x: 310, y: 350, w: 90, h: 105,
        desc: 'Tuyến ống hình cuộn trong lớp bì. Tiết mồ hôi qua ống dẫn ra lỗ tuyến trên bề mặt da. Khi mồ hôi bay hơi (thu nhiệt hóa hơi), thân nhiệt hạ xuống hiệu quả.',
        swatchColor: [60, 120, 220]
    },
    {
        id: 'lo_tuyen_mo_hoi', label: 'Lỗ tuyến mồ hôi',
        x: 348, y: 72, w: 52, h: 26,
        desc: 'Lỗ nhỏ trên bề mặt da là nơi mồ hôi thoát ra từ ống tuyến mồ hôi. Khi cơ thể nóng, mồ hôi tiết qua lỗ này, bay hơi và lấy đi nhiệt lượng, giúp hạ thân nhiệt hiệu quả.',
        swatchColor: [100, 160, 220]
    },
    {
        id: 'mach_mau', label: 'Mạch máu',
        x: 462, y: 258, w: 110, h: 40,
        desc: 'Động mạch (đỏ) và tĩnh mạch (xanh) tạo lưới mao mạch dày đặc trong lớp bì. Khi nóng: giãn mạch → tăng lưu lượng → thoát nhiệt. Khi lạnh: co mạch → giữ nhiệt lõi.',
        swatchColor: [210, 45, 45]
    },
    {
        id: 'thu_quan', label: 'Thụ quan cảm giác',
        x: 472, y: 295, w: 78, h: 38,
        desc: 'Các đầu thần kinh chuyên biệt phát hiện kích thích từ môi trường: thụ quan Meissner (xúc giác nhẹ), Pacinian (áp lực), Ruffini (nhiệt), và đầu thần kinh tự do (đau, ngứa). Tín hiệu truyền lên não qua tủy sống.',
        swatchColor: [220, 185, 30]
    },
    {
        id: 'day_than_kinh', label: 'Dây thần kinh',
        x: 200, y: 337, w: 260, h: 38,
        desc: 'Sợi thần kinh cảm giác mang tín hiệu từ thụ quan lên não qua tủy sống. Là cơ sở của phản xạ bảo vệ cơ thể: rút tay khỏi vật nóng, cảm nhận đau để tránh tổn thương.',
        swatchColor: [220, 185, 30]
    },
    {
        id: 'collagen', label: 'Collagen & Sợi đàn hồi',
        x: 178, y: 198, w: 290, h: 145,
        desc: 'Collagen type I là protein cấu trúc chính (~70% khối lượng lớp bì khô). Sợi elastin cho phép da kéo giãn rồi trở về hình dạng ban đầu. Sản xuất giảm theo tuổi → da nhăn.',
        swatchColor: [255, 155, 125]
    },
    {
        id: 'te_bao_mo', label: 'Tế bào mỡ (Adipocyte)',
        x: 30, y: 510, w: 680, h: 205,
        desc: 'Tế bào hình cầu lớn chứa một giọt lipid chiếm gần hết thể tích tế bào. Nguồn năng lượng dự trữ dài hạn; hệ số dẫn nhiệt thấp (~0.2 W/m·K) giúp cách nhiệt hiệu quả.',
        swatchColor: [255, 248, 170]
    }
];

// ── DISEASES VISUALIZATION DATA  (Step 2) ────────────────────────────

const SKIN_DISEASES_VIZ = [
    {
        id: 'hac_lao',
        name: 'Hắc lào',
        sub: 'Tinea corporis',
        pathogen: 'Nấm Dermatophyte',
        desc: 'Nấm da gây vết tổn thương hình nhẫn đặc trưng, viền đỏ có vảy và ngứa. Vùng giữa thường lành dần trong khi viền tiếp tục lan rộng. Lây qua tiếp xúc trực tiếp da-da.',
        symptoms: ['Vết hình nhẫn (ring-shaped), viền đỏ', 'Ngứa và có vảy tại viền', 'Lây trực tiếp qua da'],
        prevention: ['Giữ da sạch và khô thoáng', 'Không dùng chung khăn tắm', 'Dùng thuốc kháng nấm theo chỉ định']
    },
    {
        id: 'lang_ben',
        name: 'Lang ben',
        sub: 'Tinea versicolor',
        pathogen: 'Nấm Malassezia furfur',
        desc: 'Nấm da thường trú bùng phát gây mảng đổi màu (nhạt hoặc đậm hơn da) ở ngực, lưng, cổ. Thường xuất hiện hơn khi đổ mồ hôi nhiều, khí hậu nóng ẩm.',
        symptoms: ['Mảng da đổi màu không đều', 'Ít ngứa hoặc không ngứa', 'Nặng hơn khi nóng ẩm, mồ hôi nhiều'],
        prevention: ['Tắm sau khi vận động ra mồ hôi', 'Mặc quần áo thoáng khí', 'Dùng dầu gội ketoconazole định kỳ']
    },
    {
        id: 'mun_trung_ca',
        name: 'Mụn trứng cá',
        sub: 'Acne vulgaris',
        pathogen: 'Vi khuẩn P. acnes',
        desc: 'Tuyến nhờn tiết bã nhờn bít lỗ chân lông, vi khuẩn Propionibacterium acnes phát triển gây viêm. Phổ biến ở tuổi dậy thì do hormone kích thích tuyến nhờn hoạt động mạnh.',
        symptoms: ['Nhân mụn đầu đen/trắng (comedone)', 'Mụn viêm đỏ, có mủ', 'Hay xuất hiện ở mặt, lưng, ngực'],
        prevention: ['Rửa mặt nhẹ nhàng 2 lần/ngày', 'Không nặn mụn để tránh nhiễm khuẩn', 'Hạn chế đường và thực phẩm nhiều dầu mỡ']
    }
];

// ─────────────────────────────────────────────────────────────────────
//  SkinScene
// ─────────────────────────────────────────────────────────────────────

class SkinScene extends Scene {

    constructor() {
        super();

        // ── Step state ────────────────────────────────────────────────
        this.step      = 0;   // 0=anatomy | 1=thermoreg | 2=diseases | 3=3D
        this.animFrame = 0;

        // ── Step 0: tap-to-reveal ──────────────────────────────────────
        this.tappedIds     = new Set();
        this.activeHotspot = null;
        this.GATE_COUNT    = 3;   // taps required to unlock "Tiếp theo"

        // ── Step 1: thermoregulation ───────────────────────────────────
        this.thermoTemp       = 37;
        this.isHot            = false;
        this.isCold           = false;
        this._lastThermoState = 'normal';
        this.effectorTimer    = 0;

        this._THERMO = { x: 710, y: 112, w: 74, h: 475 };

        this._show3DInStep1 = false;
        this._glbLoaded     = false;

        this._fadeAlpha = 0;

        // ── Step 2: diseases visualization ────────────────────────────
        this._selectedDisease = null;
        this._viewedDiseases  = new Set();

        // ── Shared UI ─────────────────────────────────────────────────
        this.narration = new Narration(980, 380);
        this.narrator  = new Narrator(1000, 660, SkinNarration0);

        this.backBtn = new Button( 80,  40, 130, 40, '← Quay lại', 'SWITCH_SCENE', 'BodyMap');
        this.skipBtn = new Button(1120, 40, 100, 35, 'SKIP >>>',   'SWITCH_SCENE', 'BodyMap');
        this.nextBtn = new Button( 380, 768, 180, 46, 'Tiếp theo →','SKIN_NEXT',    null);

        this.zoom3DPlusBtn  = new Button(560, 760,  88, 34, 'Zoom +', 'SKIN_3D_ZOOM_IN',  null);
        this.zoom3DMinusBtn = new Button(656, 760,  88, 34, 'Zoom −', 'SKIN_3D_ZOOM_OUT', null);
        this.zoom3DResetBtn = new Button(752, 760,  88, 34, 'Reset',  'SKIN_3D_RESET',    null);
        this.zoom3DPlusBtn.hide();
        this.zoom3DMinusBtn.hide();
        this.zoom3DResetBtn.hide();

        this.view3DBtn = new Button(870, 616, 145, 36, 'Xem 3D', 'SKIN_TOGGLE_3D', null);
        this.view3DBtn.hide();

        this.objects.push(
            this.narration, this.narrator,
            this.backBtn, this.skipBtn, this.nextBtn,
            this.zoom3DPlusBtn, this.zoom3DMinusBtn, this.zoom3DResetBtn,
            this.view3DBtn
        );

        // ── Event listeners ───────────────────────────────────────────
        bus.on('SKIN_NEXT',        () => this.nextStep());
        bus.on('SKIN_3D_ZOOM_IN',  () => model3DViewer.zoomIn());
        bus.on('SKIN_3D_ZOOM_OUT', () => model3DViewer.zoomOut());
        bus.on('SKIN_3D_RESET',    () => model3DViewer.resetCamera());
        bus.on('SKIN_TOGGLE_3D',   () => this._toggle3DInStep1());
    }

    // ── LIFECYCLE ─────────────────────────────────────────────────────

    enter() {
        this.step      = 0;
        this.animFrame = 0;
        this.tappedIds.clear();
        this.activeHotspot    = null;
        this.thermoTemp       = 37;
        this.isHot            = false;
        this.isCold           = false;
        this._lastThermoState = 'normal';
        this.effectorTimer    = 0;
        this._show3DInStep1   = false;
        this._glbLoaded       = false;
        this._fadeAlpha       = 255;
        this._selectedDisease = null;
        this._viewedDiseases  = new Set();

        this.narrator.show();
        this.narrator.eventData = SkinNarration0;
        bus.emit('FINISH_NARRATION');
        bus.emit('SHOW_NARRATION', SkinNarration0);
        bus.emit('SKIN_ENTER');
        model3DViewer.hide();
        this._syncButtons();
    }

    exit() {
        model3DViewer.hide();
        bus.emit('SKIN_EXIT');
    }

    nextStep() {
        if (this._show3DInStep1) { model3DViewer.hide(); this._show3DInStep1 = false; }

        if (this.step < 3) this.step++;
        this.animFrame        = 0;
        this.thermoTemp       = 37;
        this.isHot            = false;
        this.isCold           = false;
        this._lastThermoState = 'normal';
        this.effectorTimer    = 0;
        this._fadeAlpha       = 255;
        bus.emit('FINISH_NARRATION');

        if (this.step === 1) {
            this.narrator.eventData = SkinNarration1;
            this.thermoTemp       = 40;
            this.isHot            = true;
            this._lastThermoState = 'hot';
            bus.emit('SKIN_THERMO_CHANGE', true);
            bus.emit('SHOW_NARRATION', SkinNarration1);
        } else if (this.step === 2) {
            this.narrator.eventData = SkinNarration2;
            this._selectedDisease = null;
            this._viewedDiseases  = new Set();
            bus.emit('SHOW_NARRATION', SkinNarration2);
        } else if (this.step === 3) {
            this.narrator.eventData = SkinNarration3;
            if (!this._glbLoaded) {
                model3DViewer.load('./assets/skin.glb');
                this._glbLoaded = true;
            }
            model3DViewer.show(30, 108, 740, 570);
            bus.emit('SKIN_THERMO_CHANGE', null);
            bus.emit('SKIN_3D_LOADED');
            bus.emit('SHOW_NARRATION', SkinNarration3);
        }
        this._syncButtons();
    }

    // ── DRAW DISPATCH ─────────────────────────────────────────────────

    draw() {
        this.animFrame++;
        if      (this.step === 0) this._drawOverview();
        else if (this.step === 1) this._drawThermoReg();
        else if (this.step === 2) this._drawDiseases();
        else                      this._drawModel3D();

        if (this._fadeAlpha > 0) {
            push();
            noStroke(); fill(255, this._fadeAlpha);
            rectMode(CORNER); rect(0, 0, width, height);
            pop();
            this._fadeAlpha = max(0, this._fadeAlpha - 13);
        }

        super.draw();
    }

    // ── INPUT OVERRIDES ───────────────────────────────────────────────

    checkClick() {
        if (this.step === 0) {
            const hs = this._hitHotspot(mouseX, mouseY);
            if (hs) {
                this.activeHotspot = hs;
                this.tappedIds.add(hs.id);
                if (this.tappedIds.size >= this.GATE_COUNT) this.nextBtn.show();
                return;
            }
        }
        if (this.step === 1 && this._isInThermoArea(mouseX, mouseY)) {
            this._updateThermoFromMouseY(mouseY);
            return;
        }
        if (this.step === 2 && this._handleDiseaseClick()) return;
        super.checkClick();
    }

    checkMouseDragged() {
        if (this.step === 1 && mouseIsPressed && this._isInThermoArea(mouseX, mouseY)) {
            this._updateThermoFromMouseY(mouseY);
        }
    }

    // ── STEP 0 – 2D anatomy cross-section + tap-to-reveal ────────────

    _drawOverview() {
        background(245, 235, 225);

        push();
        fill(80, 40, 10); noStroke(); textSize(26); textStyle(BOLD); textAlign(CENTER);
        text('Cấu tạo của Da', 380, 50);
        pop();

        const sx = 30, sy = 72, sw = 700;
        const eH = 88, dH = 295, hH = 270;

        const skinImg = assets.get('skin_normal');
        if (skinImg) {
            const imgH = Math.round(sw * skinImg.height / skinImg.width);
            push(); imageMode(CORNER); image(skinImg, sx, sy, sw, imgH); pop();
        } else {
            // Epidermis
            fill(255, 215, 175); stroke(180, 130, 90); strokeWeight(1);
            rect(sx, sy, sw, eH);
            stroke(200, 160, 110); strokeWeight(1.5); noFill();
            for (let x = sx; x < sx + sw; x += 18) arc(x, sy + 4, 18, 10, PI, TWO_PI);

            fill(50, 20, 5); noStroke(); textAlign(LEFT);
            textSize(14); textStyle(BOLD);
            text('Lớp biểu bì (Epidermis)', sx + 10, sy + 22);
            textStyle(NORMAL); textSize(12);
            text('Tế bào sừng (Keratinocyte) | Melanin | Tế bào Langerhans', sx + 12, sy + 44);
            text('Chức năng: hàng rào bảo vệ, tạo màu da, miễn dịch da', sx + 12, sy + 62);

            // Dermis
            fill(255, 180, 155); stroke(180, 100, 80); strokeWeight(1);
            rect(sx, sy + eH, sw, dH);
            fill(50, 20, 5); noStroke();
            textSize(14); textStyle(BOLD);
            text('Lớp bì (Dermis)', sx + 10, sy + eH + 20);
            textStyle(NORMAL);

            // Hair follicle + sebaceous gland
            fill(70, 45, 22); noStroke();
            rect(sx + 115, sy + eH - 52, 7, 90, 3);
            ellipse(sx + 118, sy + eH + 270, 20, 28);
            stroke(70, 45, 22); strokeWeight(1.5);
            line(sx + 118, sy + eH + 60, sx + 118, sy + eH + 256);
            noStroke(); fill(40, 20, 0); textSize(11);
            text('Nang lông', sx + 130, sy + eH + 82);
            // Sebaceous gland (small teardrop attached to follicle)
            fill(210, 185, 60, 200); noStroke();
            ellipse(sx + 135, sy + eH + 42, 22, 16);
            fill(140, 110, 20); textSize(10);
            text('Tuyến nhờn', sx + 150, sy + eH + 46);

            // Sweat gland (coiled) + pore indicator
            noFill(); stroke(60, 120, 220); strokeWeight(2);
            for (let i = 0; i < 5; i++) {
                arc(sx + 340 + i * 2, sy + eH + 205 + i * 10, 24, 19, 0, PI);
                arc(sx + 328 + i * 2, sy + eH + 215 + i * 10, 24, 19, PI, TWO_PI);
            }
            line(sx + 340, sy + eH + 195, sx + 340, sy + eH - 5);
            // Pore dot at skin surface
            fill(60, 120, 220); noStroke();
            ellipse(sx + 340, sy + 4, 6, 6);
            noStroke(); fill(40, 80, 180); textSize(11);
            text('Tuyến mồ hôi', sx + 356, sy + eH + 245);
            fill(40, 80, 180); textSize(10);
            text('Lỗ mồ hôi', sx + 348, sy + 18);

            // Blood vessels
            fill(210, 45, 45); noStroke(); ellipse(sx + 490, sy + eH + 135, 24, 15);
            fill(60, 75, 200);             ellipse(sx + 522, sy + eH + 135, 18, 12);
            fill(40, 20, 0); textSize(11);
            text('Mạch máu (đỏ=động mạch / xanh=tĩnh mạch)', sx + 540, sy + eH + 138);

            // Sensory receptor (Meissner-like bulb)
            fill(220, 185, 30, 200); noStroke();
            ellipse(sx + 505, sy + eH + 118, 14, 20);
            fill(40, 20, 0); textSize(10);
            text('Thụ quan', sx + 520, sy + eH + 112);

            // Nerve fiber (wavy)
            stroke(220, 185, 30); strokeWeight(2.5); noFill();
            beginShape();
            for (let x = sx + 200; x < sx + 480; x += 14)
                vertex(x, sy + eH + 188 + sin(x * 0.18) * 8);
            endShape();
            noStroke(); fill(40, 20, 0); textSize(11);
            text('Dây thần kinh', sx + 220, sy + eH + 175);

            // Collagen fibers
            stroke(255, 155, 125, 160); strokeWeight(1);
            for (let i = 0; i < 5; i++) {
                noFill();
                bezier(sx + 185 + i * 72, sy + eH + 48,
                       sx + 205 + i * 72, sy + eH + 88,
                       sx + 175 + i * 72, sy + eH + 108,
                       sx + 195 + i * 72, sy + eH + 148);
            }
            noStroke(); fill(160, 70, 50); textSize(11);
            text('Collagen / Sợi đàn hồi', sx + 180, sy + eH + 48);

            // Hypodermis
            fill(255, 235, 125); stroke(200, 180, 70); strokeWeight(1);
            rect(sx, sy + eH + dH, sw, hH);
            fill(50, 45, 5); noStroke();
            textSize(14); textStyle(BOLD);
            text('Lớp mô dưới da (Hypodermis)', sx + 10, sy + eH + dH + 20);
            textStyle(NORMAL); textSize(11);
            text('Tế bào mỡ (Adipocyte) – dự trữ năng lượng, cách nhiệt', sx + 12, sy + eH + dH + 37);
            for (let fx = sx + 50; fx < sx + sw - 30; fx += 70)
                for (let fy = sy + eH + dH + 58; fy < sy + eH + dH + hH - 18; fy += 60) {
                    fill(255, 248, 170, 215); stroke(200, 180, 70); strokeWeight(1);
                    ellipse(fx, fy, 58, 50);
                }
        }

        this._drawHotspotOverlays();
        this._drawComponentCard();
        this._drawGateHint();
    }

    _drawHotspotOverlays() {
        const mx = mouseX, my = mouseY;
        push();
        rectMode(CORNER);
        for (const hs of SKIN_HOTSPOTS) {
            const tapped  = this.tappedIds.has(hs.id);
            const active  = this.activeHotspot && this.activeHotspot.id === hs.id;
            const hovered = mx >= hs.x && mx <= hs.x + hs.w &&
                            my >= hs.y && my <= hs.y + hs.h;

            if (!tapped && !hovered) continue;

            noStroke();
            if (active)      fill(255, 220, 50,  95);
            else if (tapped) fill( 80, 200, 100,  55);
            else             fill(255, 255, 255,  65);

            rect(hs.x, hs.y, hs.w, hs.h);

            if (hovered && !tapped) {
                fill(50, 30, 10, 225); noStroke();
                textSize(13); textStyle(BOLD); textAlign(CENTER);
                text('Nhấn: ' + hs.label, hs.x + hs.w / 2, hs.y + hs.h / 2);
            }
        }
        pop();
    }

    _drawComponentCard() {
        const cx = 762, cy = 72, cw = 410, ch = 348;
        push();
        rectMode(CORNER);

        if (this.activeHotspot) {
            const hs = this.activeHotspot;
            fill(255, 252, 245, 245); stroke(160, 120, 80); strokeWeight(1.5);
            rect(cx, cy, cw, ch, 10);

            const [r, g, b] = hs.swatchColor;
            fill(r, g, b); noStroke();
            rect(cx + 14, cy + 14, 22, 22, 4);

            fill(40, 20, 5); noStroke(); textSize(16); textStyle(BOLD); textAlign(LEFT);
            text(hs.label, cx + 44, cy + 30);

            stroke(200, 160, 110); strokeWeight(1);
            line(cx + 14, cy + 48, cx + cw - 14, cy + 48);

            noStroke(); fill(50, 30, 10); textSize(13); textStyle(NORMAL);
            text(hs.desc, cx + 14, cy + 60, cw - 28, ch - 85);

            fill(55, 165, 80, 235); noStroke();
            rect(cx + cw - 126, cy + ch - 38, 112, 26, 13);
            fill(255); textSize(12); textStyle(BOLD); textAlign(CENTER);
            text('Da khám phá', cx + cw - 70, cy + ch - 22);
        } else {
            fill(248, 245, 238, 215); stroke(195, 175, 140); strokeWeight(1);
            rect(cx, cy, cw, ch, 10);
            fill(155, 125, 80); noStroke();
            textSize(14); textStyle(NORMAL); textAlign(CENTER);
            text('Nhấn vào bất kỳ vùng nào', cx + cw / 2, cy + ch / 2 - 24);
            text('trên sơ đồ để xem chi tiết', cx + cw / 2, cy + ch / 2 +  2);
            text('từng bộ phận →',             cx + cw / 2, cy + ch / 2 + 28);
        }
        pop();
    }

    _drawGateHint() {
        const count = this.tappedIds.size;
        const total = SKIN_HOTSPOTS.length;
        push();
        rectMode(CORNER); textAlign(LEFT); noStroke();

        fill(80, 50, 20); textSize(13);
        text('Đã khám phá: ' + count + ' / ' + total + ' bộ phận', 762, 442);

        for (let i = 0; i < total; i++) {
            fill(this.tappedIds.has(SKIN_HOTSPOTS[i].id)
                 ? color(55, 165, 80) : color(195, 180, 155));
            ellipse(772 + i * 18, 462, 12, 12);
        }

        textSize(12); textAlign(CENTER);
        if (count < this.GATE_COUNT) {
            fill(130, 85, 30);
            text('Khám phá thêm ' + (this.GATE_COUNT - count) +
                 ' bộ phận để mở "Tiếp theo"', 967, 488);
        } else {
            fill(30, 140, 60); textStyle(BOLD);
            text('San sang!  Nhan "Tiep theo ->" ben duoi', 967, 488);
        }
        pop();
    }

    // ── STEP 1 – Thermoregulation ──────────────────────────────────────

    _drawThermoReg() {
        const prevState = this._lastThermoState;
        this.isHot  = this.thermoTemp >= 38;
        this.isCold = this.thermoTemp <= 35;
        const newState = this.isHot ? 'hot' : this.isCold ? 'cold' : 'normal';

        if (newState !== prevState) {
            this._lastThermoState = newState;
            this.effectorTimer    = 0;
            bus.emit('SKIN_THERMO_CHANGE',
                     this.isHot ? true : this.isCold ? false : null);
        }
        if (newState !== 'normal') this.effectorTimer++;

        if      (this.isHot)  background(255, 224, 202);
        else if (this.isCold) background(202, 222, 255);
        else                  background(232, 240, 232);

        push();
        fill(40, 40, 80); noStroke(); textSize(26); textStyle(BOLD); textAlign(CENTER);
        text('Điều hòa thân nhiệt', 380, 48);
        textSize(17); textStyle(NORMAL);
        if      (this.isHot)  { fill(200, 50, 20);  text('Môi trường NONG (>=38°C)', 380, 82); }
        else if (this.isCold) { fill(30,  80, 200); text('Môi trường LANH (<=35°C)', 380, 82); }
        else                  { fill(30, 130,  60); text('Thân nhiệt bình thường (37°C)', 380, 82); }
        pop();

        const sx = 30, sy = 112, sw = 660, eH = 55, dH = 252, hH = 168;

        const frameIdx = (Math.floor(this.animFrame / 20) % 4) + 1;
        const imgKey   = this.isHot  ? 'skin_hot_'  + frameIdx
                       : this.isCold ? 'skin_cold_' + frameIdx
                       : 'skin_normal';
        const baseImg  = assets.get(imgKey);

        if (baseImg) {
            const imgH = Math.round(sw * baseImg.height / baseImg.width);
            push(); imageMode(CORNER); image(baseImg, sx, sy, sw, imgH); pop();
            this._drawThermoLabels();
        } else {
            fill(255, 210, 170); stroke(180, 130, 90); strokeWeight(1); rect(sx, sy, sw, eH);
            fill(50, 20, 5); noStroke(); textSize(12); textAlign(LEFT);
            text('Biểu bì', sx + 8, sy + 34);

            fill(255, 185, 158); stroke(180, 100, 80); strokeWeight(1); rect(sx, sy + eH, sw, dH);
            fill(50, 20, 5); noStroke(); textSize(12);
            text('Lớp bì', sx + 8, sy + eH + 22);

            fill(255, 235, 130); stroke(200, 180, 70); strokeWeight(1); rect(sx, sy + eH + dH, sw, hH);
            fill(50, 45, 5); noStroke(); textSize(12);
            text('Mô dưới da', sx + 8, sy + eH + dH + 22);

            const T = this.effectorTimer;

            if (this.isHot) {
                fill(210, 50, 50, 200); noStroke();
                rect(sx + 218, sy + eH + 18, 28, dH - 36, 14);
                rect(sx + 392, sy + eH + 18, 22, dH - 36, 11);
                fill(40, 10, 10); textSize(12);
                text('Mạch máu giãn → tản nhiệt', sx + 255, sy + eH + dH / 2);
                if (T >= 24) {
                    for (let i = 0; i < 6; i++) {
                        const px = sx + 70 + i * 94;
                        stroke(90, 140, 210); strokeWeight(2);
                        line(px, sy, px, sy - 12);
                        const dy = sy - 22 - ((this.animFrame * 2 + i * 55) % 88);
                        fill(80, 140, 210, 200); noStroke();
                        ellipse(px, dy, 9, 13);
                    }
                    fill(30, 80, 180); noStroke(); textSize(13);
                    text('→ Tiết mồ hôi để làm mát cơ thể', sx + 10, sy - 30);
                }
            } else if (this.isCold) {
                fill(180, 50, 50, 180); noStroke();
                rect(sx + 225, sy + eH + 18, 10, dH - 36, 5);
                rect(sx + 398, sy + eH + 18,  8, dH - 36, 4);
                fill(40, 10, 10); textSize(12);
                text('Mạch máu co → giữ nhiệt', sx + 242, sy + eH + dH / 2);
                if (T >= 24) {
                    stroke(70, 45, 25); strokeWeight(2);
                    for (let i = 0; i < 8; i++) {
                        const hx = sx + 54 + i * 78;
                        line(hx, sy + 5, hx + 13, sy - 25);
                    }
                    fill(30, 50, 160); noStroke(); textSize(13);
                    text('→ Lông dựng lên để cách nhiệt', sx + 10, sy - 30);
                }
                if (T >= 48) {
                    const sh = sin(this.animFrame * 0.45) * 5;
                    stroke(100, 100, 200); strokeWeight(1.5); noFill();
                    for (let i = 0; i < 3; i++) {
                        beginShape();
                        for (let x = sx + 120 + i * 158; x < sx + 268 + i * 158; x += 14)
                            vertex(x + sh, sy + eH + 155 + sin(x * 0.3 + this.animFrame * 0.25) * 6);
                        endShape();
                    }
                    fill(60, 60, 190); noStroke(); textSize(12);
                    text('→ Cơ run rẩy để sinh nhiệt', sx + 10, sy + eH + 195);
                }
            } else {
                fill(180, 50, 50, 100); noStroke();
                rect(sx + 218, sy + eH + 18, 16, dH - 36, 8);
                fill(40, 10, 10); textSize(12);
                text('Mạch máu bình thường', sx + 248, sy + eH + dH / 2);
                fill(30, 130, 60); noStroke(); textSize(13);
                text('→ Thân nhiệt ổn định tại 37°C', sx + 10, sy - 18);
            }
        }

        this._drawTempBar();

        push();
        fill(80, 60, 150); noStroke(); textSize(12); textAlign(CENTER);
        text('<- Kéo thanh nhiệt kế để thay đổi nhiệt độ', 773, 102);
        pop();
    }

    _drawTempBar() {
        const bx = 720, by = 112, bw = 54, bh = 475;
        const temp = this.thermoTemp;

        fill(215); stroke(100); strokeWeight(1); rect(bx, by, bw, bh, 5);

        const fillH = map(temp, 34, 41, 0, bh);
        const r     = map(temp, 34, 41,   0, 255);
        const b     = map(temp, 34, 41, 255,   0);
        fill(r, 55, b); noStroke();
        rect(bx, by + bh - fillH, bw, fillH, 5);

        for (let deg = 34; deg <= 41; deg++) {
            const ty = by + map(deg, 34, 41, bh, 0);
            stroke(80); strokeWeight(1); line(bx - 5, ty, bx, ty);
            fill(30); noStroke(); textSize(11); textAlign(RIGHT);
            text(deg + '°C', bx - 8, ty + 4);
        }

        const spY = by + map(37, 34, 41, bh, 0);
        stroke(20, 155, 60); strokeWeight(2);
        line(bx - 8, spY, bx + bw + 5, spY);
        noStroke(); fill(15, 125, 50); textSize(10); textAlign(LEFT);
        text('37°C bình thường', bx + bw + 8, spY + 4);

        stroke(210, 55, 20, 185); strokeWeight(1);
        line(bx - 4, by + map(38, 34, 41, bh, 0), bx + bw + 3, by + map(38, 34, 41, bh, 0));
        stroke(25, 75, 210, 185);
        line(bx - 4, by + map(35, 34, 41, bh, 0), bx + bw + 3, by + map(35, 34, 41, bh, 0));

        const handleY = by + map(temp, 34, 41, bh, 0);
        fill(255); stroke(70); strokeWeight(2);
        ellipse(bx + bw / 2, handleY, bw + 12, 26);
        fill(30); noStroke(); textSize(12); textStyle(BOLD); textAlign(CENTER);
        text(nf(temp, 2, 1) + '°C', bx + bw / 2, handleY + 5);
        textStyle(NORMAL);

        fill(30); noStroke(); textSize(13); textAlign(CENTER);
        text('Thân nhiệt', bx + bw / 2, by - 22);
        textAlign(LEFT);
    }

    // ── STEP 2 – Diseases visualization ──────────────────────────────

    _drawDiseases() {
        background(238, 245, 240);

        push();
        fill(15, 85, 42); noStroke(); textSize(24); textStyle(BOLD); textAlign(CENTER);
        text('Bệnh Da Phổ Biến & Cách Phòng Tránh', 390, 42);
        pop();

        const cw = 230, ch = 630, gap = 10, startX = 30, startY = 62;
        for (let i = 0; i < SKIN_DISEASES_VIZ.length; i++) {
            this._drawDiseaseCard(i, startX + i * (cw + gap), startY, cw, ch);
        }
        this._drawDiseaseDetail();

        const v = this._viewedDiseases.size, tot = SKIN_DISEASES_VIZ.length;
        push();
        textAlign(CENTER); noStroke();
        if (v < tot) {
            fill(110, 80, 25); textSize(12);
            text('Nhấn vào từng bệnh để xem chi tiết (' + v + '/' + tot + ' đã xem)', 390, 720);
        } else {
            fill(20, 140, 60); textSize(13); textStyle(BOLD);
            text('Đã xem tất cả! Nhấn "Tiếp theo →" bên dưới.', 390, 720);
        }
        pop();
    }

    _drawDiseaseCard(idx, cx, cy, cw, ch) {
        const d       = SKIN_DISEASES_VIZ[idx];
        const isSel   = this._selectedDisease === idx;
        const isView  = this._viewedDiseases.has(idx);
        push();
        rectMode(CORNER);

        // Card background
        fill(248, 252, 248);
        stroke(isSel  ? color(25, 140, 65) :
               isView ? color(100, 175, 110) : color(185, 205, 185));
        strokeWeight(isSel ? 2.5 : 1.5);
        rect(cx, cy, cw, ch, 8);

        // Header
        fill(isSel  ? color(20, 110, 45) :
             isView ? color(40, 130, 60) : color(65, 145, 80));
        noStroke();
        rect(cx, cy, cw, 42, 8, 8, 0, 0);
        fill(255); textSize(13); textStyle(BOLD); textAlign(CENTER);
        text(d.name, cx + cw / 2, cy + 17);
        fill(220, 255, 220); textSize(10); textStyle(ITALIC);
        text(d.sub, cx + cw / 2, cy + 33);

        // Normal skin label
        noStroke(); fill(65, 105, 70); textSize(9); textStyle(BOLD); textAlign(LEFT);
        text('BÌNH THƯỜNG:', cx + 8, cy + 55);
        this._drawSkinMiniNormal(cx + 8, cy + 59, cw - 16, 148);

        // Diseased skin label
        noStroke(); fill(160, 35, 35); textSize(9); textStyle(BOLD); textAlign(LEFT);
        text('KHI BỊ BỆNH:', cx + 8, cy + 220);
        this._drawSkinMiniDiseased(cx + 8, cy + 224, cw - 16, 148, idx);

        // Prevention section
        stroke(180, 210, 185); strokeWeight(1);
        line(cx + 8, cy + 381, cx + cw - 8, cy + 381);
        noStroke(); fill(20, 80, 35); textSize(9); textStyle(BOLD); textAlign(LEFT);
        text('PHÒNG TRÁNH:', cx + 8, cy + 394);
        fill(40, 55, 42); textStyle(NORMAL); textSize(9);
        for (let j = 0; j < d.prevention.length; j++) {
            const iy = cy + 406 + j * 44;
            fill(20, 150, 55); noStroke(); ellipse(cx + 14, iy + 5, 6, 6);
            fill(40, 55, 42); textAlign(LEFT);
            text(d.prevention[j], cx + 22, iy, cw - 30, 42);
        }

        // Bottom indicator
        if (!isView) {
            fill(20, 140, 60, 210); noStroke();
            rect(cx + cw / 2 - 58, cy + ch - 28, 116, 22, 11);
            fill(255); textSize(9); textStyle(BOLD); textAlign(CENTER);
            text('Nhấn để xem chi tiết', cx + cw / 2, cy + ch - 13);
        } else {
            fill(25, 155, 70); noStroke(); textSize(10); textStyle(BOLD); textAlign(CENTER);
            text('✓ Đã xem', cx + cw / 2, cy + ch - 13);
        }
        pop();
    }

    _drawSkinMiniNormal(x, y, w, h) {
        push();
        rectMode(CORNER);
        const eH = Math.round(h * 0.22);
        const dH = Math.round(h * 0.48);
        const hH = h - eH - dH;

        // Epidermis
        fill(255, 218, 182); stroke(180, 130, 90); strokeWeight(0.8);
        rect(x, y, w, eH);
        stroke(200, 155, 110); strokeWeight(0.6); noFill();
        for (let bx = x; bx < x + w; bx += 14) arc(bx, y + 3, 14, 7, PI, TWO_PI);

        // Dermis
        fill(255, 185, 158); stroke(180, 100, 80); strokeWeight(0.8);
        rect(x, y + eH, w, dH);
        // Simple follicle
        fill(70, 45, 22); noStroke();
        rect(x + w * 0.38, y + eH - 8, 4, dH * 0.55, 2);
        // Blood vessels
        fill(210, 45, 45); noStroke(); ellipse(x + w * 0.6, y + eH + dH * 0.5, 9, 6);
        fill(60, 75, 200);             ellipse(x + w * 0.68, y + eH + dH * 0.5, 7, 5);

        // Hypodermis
        fill(255, 235, 125); stroke(200, 180, 70); strokeWeight(0.8);
        rect(x, y + eH + dH, w, hH);
        fill(255, 245, 170); stroke(200, 175, 70); strokeWeight(0.6);
        for (let fx = x + 16; fx < x + w - 10; fx += 28)
            ellipse(fx, y + eH + dH + hH / 2, 20, 14);
        pop();
    }

    _drawSkinMiniDiseased(x, y, w, h, idx) {
        const af = this.animFrame;
        const cx = x + w / 2, cy = y + h / 2;
        push();
        rectMode(CORNER);

        if (idx === 0) {
            // Hắc lào: ring-shaped lesion (animated pulse)
            fill(255, 218, 182); stroke(180, 130, 90); strokeWeight(0.8);
            rect(x, y, w, h);

            const outerR = 40 + sin(af * 0.05) * 3;
            const innerR = 25 + sin(af * 0.05) * 2;
            // Ring fill
            fill(175, 75, 45, 210); noStroke();
            ellipse(cx, cy, outerR * 2, outerR * 2);
            // Ring border
            stroke(140, 45, 20); strokeWeight(1.5); noFill();
            ellipse(cx, cy, outerR * 2, outerR * 2);
            // Clear center (healed)
            fill(245, 200, 168); noStroke();
            ellipse(cx, cy, innerR * 2, innerR * 2);
            // Scale dots on ring border
            fill(120, 40, 20, 190); noStroke();
            for (let a = 0; a < TWO_PI; a += PI / 7) {
                ellipse(cx + (outerR - 4) * cos(a), cy + (outerR - 4) * sin(a), 4, 3);
            }
            fill(130, 40, 20); noStroke(); textSize(8); textStyle(ITALIC); textAlign(CENTER);
            text('Vết hình nhẫn', cx, y + h - 5);

        } else if (idx === 1) {
            // Lang ben: irregular depigmented/hyperpigmented patches
            fill(255, 218, 182); stroke(180, 130, 90); strokeWeight(0.8);
            rect(x, y, w, h);

            const patches = [
                { ox: 0.25, oy: 0.28, rw: 0.22, rh: 0.18, light: true  },
                { ox: 0.62, oy: 0.38, rw: 0.26, rh: 0.21, light: false },
                { ox: 0.18, oy: 0.62, rw: 0.28, rh: 0.19, light: true  },
                { ox: 0.65, oy: 0.65, rw: 0.20, rh: 0.16, light: false },
                { ox: 0.44, oy: 0.50, rw: 0.24, rh: 0.18, light: true  },
            ];
            noStroke();
            for (const p of patches) {
                if (p.light) fill(242, 232, 212, 225);
                else         fill(198, 142, 98, 210);
                ellipse(x + p.ox * w, y + p.oy * h, p.rw * w, p.rh * h);
            }
            fill(140, 80, 28); noStroke(); textSize(8); textStyle(ITALIC); textAlign(CENTER);
            text('Mảng đổi màu', cx, y + h - 5);

        } else {
            // Mụn trứng cá: inflamed bumps (animated pulsing redness)
            fill(255, 218, 182); stroke(180, 130, 90); strokeWeight(0.8);
            rect(x, y, w, h);

            const pimples = [
                { ox: 0.25, oy: 0.38, r: 13, type: 'whitehead' },
                { ox: 0.56, oy: 0.33, r: 15, type: 'inflamed'  },
                { ox: 0.77, oy: 0.56, r: 11, type: 'blackhead' },
            ];
            for (const p of pimples) {
                const px = x + p.ox * w, py = y + p.oy * h;
                const pulse = sin(af * 0.06 + p.ox * 3) * 2;
                if (p.type === 'inflamed') {
                    fill(220, 75, 55, 175 + sin(af * 0.08) * 45); noStroke();
                    ellipse(px, py, (p.r + 8 + pulse) * 2, (p.r + 6 + pulse) * 2);
                    fill(245, 228, 182); noStroke(); ellipse(px, py, p.r * 1.5, p.r);
                    fill(238, 220, 148); noStroke(); ellipse(px, py - p.r * 0.4, 5, 4);
                } else if (p.type === 'whitehead') {
                    fill(215, 95, 70, 145); noStroke();
                    ellipse(px, py, (p.r + 5) * 2, (p.r + 4) * 2);
                    fill(245, 232, 208); noStroke(); ellipse(px, py, p.r * 1.4, p.r * 0.8);
                    fill(208, 198, 182); noStroke(); ellipse(px, py - p.r * 0.3, 4, 3);
                } else {
                    fill(215, 95, 70, 105); noStroke();
                    ellipse(px, py, (p.r + 4) * 2, (p.r + 3) * 2);
                    fill(245, 218, 192); noStroke(); ellipse(px, py, p.r * 1.2, p.r * 0.7);
                    fill(38, 18, 8); noStroke(); ellipse(px, py - p.r * 0.3, 3, 3);
                }
            }
            fill(140, 28, 28); noStroke(); textSize(8); textStyle(ITALIC); textAlign(CENTER);
            text('Mụn đỏ có viêm', cx, y + h - 5);
        }
        pop();
    }

    _drawDiseaseDetail() {
        const rx = 762, ry = 62, rw = 415, rh = 630;
        push();
        rectMode(CORNER);
        fill(248, 252, 248); stroke(160, 200, 165); strokeWeight(1.5);
        rect(rx, ry, rw, rh, 10);

        if (this._selectedDisease === null) {
            fill(140, 165, 145); noStroke(); textSize(13); textStyle(NORMAL); textAlign(CENTER);
            text('Nhấn vào một bệnh', rx + rw / 2, ry + rh / 2 - 20);
            text('để xem thông tin chi tiết', rx + rw / 2, ry + rh / 2 + 5);
            pop();
            return;
        }

        const d = SKIN_DISEASES_VIZ[this._selectedDisease];

        // Disease name
        fill(20, 95, 45); noStroke(); textSize(22); textStyle(BOLD); textAlign(CENTER);
        text(d.name, rx + rw / 2, ry + 38);
        fill(80, 130, 90); textSize(12); textStyle(ITALIC);
        text(d.sub, rx + rw / 2, ry + 57);

        // Pathogen
        stroke(175, 210, 178); strokeWeight(1);
        line(rx + 16, ry + 68, rx + rw - 16, ry + 68);
        noStroke(); fill(115, 52, 18); textSize(11); textStyle(BOLD); textAlign(LEFT);
        text('Tác nhân gây bệnh:', rx + 16, ry + 85);
        fill(62, 32, 10); textStyle(NORMAL);
        text(d.pathogen, rx + 16, ry + 101);

        // Description
        stroke(175, 210, 178); strokeWeight(1);
        line(rx + 16, ry + 112, rx + rw - 16, ry + 112);
        noStroke(); fill(35, 55, 40); textSize(12); textStyle(NORMAL); textAlign(LEFT);
        text(d.desc, rx + 16, ry + 127, rw - 32, 100);

        // Symptoms
        stroke(175, 210, 178); strokeWeight(1);
        line(rx + 16, ry + 238, rx + rw - 16, ry + 238);
        noStroke(); fill(25, 78, 175); textSize(12); textStyle(BOLD); textAlign(LEFT);
        text('Triệu chứng:', rx + 16, ry + 255);
        fill(40, 48, 80); textStyle(NORMAL); textSize(12);
        for (let i = 0; i < d.symptoms.length; i++) {
            fill(25, 78, 175); noStroke(); ellipse(rx + 24, ry + 271 + i * 27, 6, 6);
            fill(40, 48, 80);
            text(d.symptoms[i], rx + 34, ry + 275 + i * 27);
        }

        // Prevention
        const prevY = ry + 362;
        stroke(175, 210, 178); strokeWeight(1);
        line(rx + 16, prevY, rx + rw - 16, prevY);
        noStroke(); fill(20, 132, 58); textSize(12); textStyle(BOLD); textAlign(LEFT);
        text('Cách phòng tránh:', rx + 16, prevY + 17);
        fill(32, 62, 38); textStyle(NORMAL); textSize(12);
        for (let i = 0; i < d.prevention.length; i++) {
            fill(20, 148, 52); noStroke(); ellipse(rx + 24, prevY + 33 + i * 32, 6, 6);
            fill(32, 62, 38);
            text(d.prevention[i], rx + 34, prevY + 37 + i * 32, rw - 50, 30);
        }
        pop();
    }

    _handleDiseaseClick() {
        const cw = 230, ch = 630, gap = 10, startX = 30, startY = 62;
        for (let i = 0; i < SKIN_DISEASES_VIZ.length; i++) {
            const cx = startX + i * (cw + gap);
            if (mouseX >= cx && mouseX <= cx + cw &&
                mouseY >= startY && mouseY <= startY + ch) {
                this._selectedDisease = i;
                this._viewedDiseases.add(i);
                if (this._viewedDiseases.size >= SKIN_DISEASES_VIZ.length) this.nextBtn.show();
                return true;
            }
        }
        return false;
    }

    // ── STEP 3 – 3D model ─────────────────────────────────────────────

    _drawModel3D() {
        background(22, 28, 48);

        push();
        fill(255); noStroke(); textSize(26); textStyle(BOLD); textAlign(CENTER);
        text('Mo hinh 3D cua Da', 400, 52);
        fill(170); textSize(13); textStyle(NORMAL);
        text('Kéo chuột: xoay  |  Cuộn: zoom  |  Chuột phải / Ctrl+kéo: di chuyển', 400, 80);
        pop();

        push();
        noFill(); stroke(70, 110, 220); strokeWeight(2);
        rect(30, 108, 740, 570, 8);
        pop();

        push();
        textSize(13); textAlign(CENTER); noStroke();
        if (!model3DViewer.isReady) {
            fill(255, 80, 80);
            text('WebGL khong kha dung — khong the hien thi mo hinh 3D', 400, 700);
        } else if (model3DViewer.isLoading) {
            fill(120, 160, 255);
            text('Dang tai mo hinh… (skin.glb ~27 MB)', 400, 700);
        } else {
            fill(80, 180, 100);
            text('Mo hinh da tai  ·  dung chuot de xoay / zoom', 400, 700);
        }
        pop();
    }

    // ── HELPERS ───────────────────────────────────────────────────────

    _syncButtons() {
        if (this.step === 0) {
            if (this.tappedIds.size < this.GATE_COUNT) this.nextBtn.hide();
            else this.nextBtn.show();
            this.zoom3DPlusBtn.hide(); this.zoom3DMinusBtn.hide(); this.zoom3DResetBtn.hide();
            this.view3DBtn.hide();
            this.nextBtn.label     = 'Tiếp theo →';
            this.nextBtn.eventTag  = 'SKIN_NEXT';
            this.nextBtn.eventData = null;
        } else if (this.step === 1) {
            this.nextBtn.show();
            this.zoom3DPlusBtn.hide(); this.zoom3DMinusBtn.hide(); this.zoom3DResetBtn.hide();
            this.view3DBtn.show();
            this.nextBtn.label     = 'Tiếp theo →';
            this.nextBtn.eventTag  = 'SKIN_NEXT';
            this.nextBtn.eventData = null;
        } else if (this.step === 2) {
            if (this._viewedDiseases.size >= SKIN_DISEASES_VIZ.length) this.nextBtn.show();
            else this.nextBtn.hide();
            this.zoom3DPlusBtn.hide(); this.zoom3DMinusBtn.hide(); this.zoom3DResetBtn.hide();
            this.view3DBtn.hide();
            this.nextBtn.label     = 'Tiếp theo →';
            this.nextBtn.eventTag  = 'SKIN_NEXT';
            this.nextBtn.eventData = null;
        } else {
            this.nextBtn.show();
            this.nextBtn.label     = '<- Ve trang chu';
            this.nextBtn.eventTag  = 'SWITCH_SCENE';
            this.nextBtn.eventData = 'BodyMap';
            this.zoom3DPlusBtn.show(); this.zoom3DMinusBtn.show(); this.zoom3DResetBtn.show();
            this.view3DBtn.hide();
        }
    }

    _isInThermoArea(mx, my) {
        const { x, y, w, h } = this._THERMO;
        return mx >= x && mx <= x + w && my >= y && my <= y + h;
    }

    _updateThermoFromMouseY(my) {
        const { y, h } = this._THERMO;
        this.thermoTemp = constrain(map(my, y, y + h, 41, 34), 34, 41);
    }

    _hitHotspot(mx, my) {
        let best = null, bestArea = Infinity;
        for (const hs of SKIN_HOTSPOTS) {
            if (mx >= hs.x && mx <= hs.x + hs.w &&
                my >= hs.y && my <= hs.y + hs.h) {
                const area = hs.w * hs.h;
                if (area < bestArea) { best = hs; bestArea = area; }
            }
        }
        return best;
    }

    _drawThermoLabels() {
        const sx = 30, sy = 112, eH = 55, dH = 252;
        const T = this.effectorTimer;
        push(); noStroke(); textAlign(LEFT);
        if (this.isHot) {
            fill(40, 10, 10); textSize(12);
            text('Mạch máu giãn → tản nhiệt', sx + 255, sy + eH + dH / 2);
            if (T >= 24) {
                fill(30, 80, 180); textSize(13);
                text('→ Tiết mồ hôi để làm mát cơ thể', sx + 10, sy - 30);
            }
        } else if (this.isCold) {
            fill(40, 10, 10); textSize(12);
            text('Mạch máu co → giữ nhiệt', sx + 242, sy + eH + dH / 2);
            if (T >= 24) {
                fill(30, 50, 160); textSize(13);
                text('→ Lông dựng lên để cách nhiệt', sx + 10, sy - 30);
            }
            if (T >= 48) {
                fill(60, 60, 190); textSize(12);
                text('→ Cơ run rẩy để sinh nhiệt', sx + 10, sy + eH + 195);
            }
        } else {
            fill(30, 130, 60); textSize(13);
            text('→ Thân nhiệt ổn định tại 37°C', sx + 10, sy - 18);
        }
        pop();
    }

    _toggle3DInStep1() {
        this._show3DInStep1 = !this._show3DInStep1;
        if (this._show3DInStep1) {
            if (!this._glbLoaded) {
                model3DViewer.load('./assets/skin.glb');
                this._glbLoaded = true;
            }
            model3DViewer.show(800, 108, 375, 475);
            this.view3DBtn.label = 'An 3D';
            bus.emit('FINISH_NARRATION');
        } else {
            model3DViewer.hide();
            this.view3DBtn.label = 'Xem 3D';
        }
    }
}
