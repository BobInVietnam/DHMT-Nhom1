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

// Hotspot coordinates are calibrated to skin_normal.webp (1077×719 px)
// rendered at canvas (30, 72) width=700 height=467.
// Conversion: canvas_x = 30 + orig_x*(700/1077),  canvas_y = 72 + orig_y*(467/719)
const SKIN_HOTSPOTS = [
    {
        id: 'bieu_bi', label: 'Lớp biểu bì',
        x: 72, y: 108, w: 618, h: 94,
        pinX: 215, pinY: 233, r: 16,
        desc: 'Lớp ngoài cùng gồm tầng sừng (tế bào chết, không thấm nước) và tầng tế bào sống có melanin tạo màu da. Vai trò: hàng rào vật lý chống vi khuẩn, tia UV và mất nước.',
        sgk: 'Bài 39, tr.152', pron: 'biểu bì — Epidermis',
        diseases: ['Viêm da tiếp xúc, bỏng nắng (sunburn)', 'Ung thư da (melanoma, carcinoma)', 'Vảy nến (psoriasis)'],
        swatchColor: [255, 215, 175]
    },
    {
        id: 'nang_long', label: 'Nang lông & Cơ chân lông',
        x: 316, y: 202, w: 130, h: 218,
        pinX: 425, pinY: 362, r: 16,
        desc: 'Nang lông là túi biểu bì bao quanh gốc lông. Cơ chân lông khi co (do lạnh) làm lông dựng đứng, tạo lớp không khí cách nhiệt → gây "nổi da gà".',
        sgk: 'Bài 39, tr.154', pron: 'nang lông — Hair follicle',
        diseases: ['Viêm nang lông (folliculitis)', 'Rụng tóc (alopecia areata)', 'Mụn trứng cá do bít nang lông'],
        swatchColor: [70, 45, 22]
    },
    {
        id: 'tuyen_nhon', label: 'Tuyến nhờn',
        x: 436, y: 244, w: 69, h: 59,
        pinX: 473, pinY: 291, r: 14,
        desc: 'Tuyến nhờn gắn vào nang lông, tiết bã nhờn (sebum) giữ ẩm và tạo lớp màng bảo vệ da khỏi vi khuẩn, nấm. Hoạt động quá mức gây bít lỗ chân lông, dẫn đến mụn trứng cá.',
        sgk: 'Bài 39, tr.154', pron: 'tuyến nhờn — Sebaceous gland',
        diseases: ['Mụn trứng cá do tuyến nhờn quá mức', 'Lang ben (Malassezia overgrowth)', 'Da nhờn (seborrhoea)'],
        swatchColor: [210, 190, 80]
    },
    {
        id: 'tuyen_mo_hoi', label: 'Tuyến mồ hôi',
        x: 105, y: 286, w: 110, h: 117,
        pinX: 222, pinY: 345, r: 16,
        desc: 'Tuyến ống hình cuộn trong lớp bì. Tiết mồ hôi qua ống dẫn ra lỗ tuyến trên bề mặt da. Khi mồ hôi bay hơi (thu nhiệt hóa hơi), thân nhiệt hạ xuống hiệu quả.',
        sgk: 'Bài 39, tr.154', pron: 'tuyến mồ hôi — Eccrine sweat gland',
        diseases: ['Rôm sảy (miliaria / heat rash)', 'Viêm tuyến mồ hôi (hidradenitis)', 'Hôi nách (bromhidrosis)'],
        swatchColor: [60, 120, 220]
    },
    {
        id: 'lo_tuyen_mo_hoi', label: 'Lỗ tuyến mồ hôi',
        x: 145, y: 108, w: 35, h: 35,
        pinX: 452, pinY: 229, r: 12,
        desc: 'Lỗ nhỏ trên bề mặt da là nơi mồ hôi thoát ra từ ống tuyến mồ hôi. Khi cơ thể nóng, mồ hôi tiết qua lỗ này, bay hơi và lấy đi nhiệt lượng, giúp hạ thân nhiệt hiệu quả.',
        sgk: 'Bài 39, tr.154', pron: 'lỗ tuyến mồ hôi — Sweat pore',
        diseases: ['Bít lỗ mồ hôi → rôm sảy', 'Mất nước, mất điện giải khi sốt cao'],
        swatchColor: [100, 160, 220]
    },
    {
        id: 'mach_mau', label: 'Mạch máu',
        x: 72, y: 384, w: 618, h: 42,
        pinX: 345, pinY: 410, r: 16,
        desc: 'Động mạch (đỏ) và tĩnh mạch (xanh) tạo lưới mao mạch dày đặc trong lớp bì. Khi nóng: giãn mạch → tăng lưu lượng → thoát nhiệt. Khi lạnh: co mạch → giữ nhiệt lõi.',
        sgk: 'Bài 39, tr.155', pron: 'mạch máu — Blood vessel',
        diseases: ['Giãn mao mạch (telangiectasia)', 'Da đỏ khi sốt cao hoặc nóng nực'],
        swatchColor: [210, 45, 45]
    },
    {
        id: 'thu_quan', label: 'Thụ quan cảm giác',
        x: 479, y: 280, w: 175, h: 104,
        pinX: 542, pinY: 343, r: 16,
        desc: 'Các đầu thần kinh chuyên biệt phát hiện kích thích từ môi trường: thụ quan Meissner (xúc giác nhẹ), Pacinian (áp lực), Ruffini (nhiệt), và đầu thần kinh tự do (đau, ngứa). Tín hiệu truyền lên não qua tủy sống.',
        sgk: 'Bài 39, tr.155', pron: 'thụ quan cảm giác — Sensory receptor',
        diseases: ['Mất cảm giác (neuropathy) do tiểu đường', 'Herpes zoster gây đau dây thần kinh'],
        swatchColor: [220, 185, 30]
    },
    {
        id: 'day_than_kinh', label: 'Dây thần kinh',
        x: 232, y: 257, w: 149, h: 104,
        pinX: 280, pinY: 365, r: 14,
        desc: 'Sợi thần kinh cảm giác mang tín hiệu từ thụ quan lên não qua tủy sống. Là cơ sở của phản xạ bảo vệ cơ thể: rút tay khỏi vật nóng, cảm nhận đau để tránh tổn thương.',
        sgk: 'Bài 39, tr.155', pron: 'dây thần kinh — Nerve fiber',
        diseases: ['Đau dây thần kinh (neuralgia)', 'Tê bì tay chân (peripheral neuropathy)'],
        swatchColor: [220, 185, 30]
    },
    {
        id: 'collagen', label: 'Collagen & Sợi đàn hồi',
        x: 72, y: 202, w: 238, h: 169,
        pinX: 265, pinY: 305, r: 14,
        desc: 'Collagen type I là protein cấu trúc chính (~70% khối lượng lớp bì khô). Sợi elastin cho phép da kéo giãn rồi trở về hình dạng ban đầu. Sản xuất giảm theo tuổi → da nhăn.',
        sgk: 'Bài 39, tr.153', pron: 'collagen & sợi đàn hồi — Elastic fiber',
        diseases: ['Nhăn da, chảy xệ (lão hóa mất collagen)', 'Sẹo lồi (keloid)', 'Hội chứng Ehlers-Danlos'],
        swatchColor: [255, 155, 125]
    },
    {
        id: 'te_bao_mo', label: 'Tế bào mỡ (Adipocyte)',
        x: 100, y: 424, w: 560, h: 69,
        pinX: 282, pinY: 463, r: 14,
        desc: 'Tế bào hình cầu lớn chứa một giọt lipid chiếm gần hết thể tích tế bào. Nguồn năng lượng dự trữ dài hạn; hệ số dẫn nhiệt thấp (~0.2 W/m·K) giúp cách nhiệt hiệu quả.',
        sgk: 'Bài 39, tr.153', pron: 'tế bào mỡ — Adipocyte',
        diseases: ['Béo phì (tích mỡ quá mức)', 'Mỡ máu cao (dyslipidaemia)', 'Viêm mô tế bào (cellulitis)'],
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

// ── PREVENTION SCENARIOS  (Step 2 – "Phòng Chống" tab) ───────────────

const SKIN_SCENARIOS = [
    {
        situation: 'Bạn làm việc ngoài trời dưới nắng gắt hơn 2 giờ liên tục. Bạn cảm thấy đầu váng, chóng mặt và da mặt đỏ rát.',
        context:   'Say nắng (Heat Stroke) xảy ra khi thân nhiệt vượt 40°C và cơ thể mất khả năng tự điều tiết nhiệt.',
        options: [
            { text: 'Tiếp tục làm việc, uống nước lạnh rồi sẽ hết', correct: false,
              feedback: 'Chưa đúng. Tiếp tục làm việc khi đã có triệu chứng say nắng rất nguy hiểm — cần dừng ngay và vào nơi mát.' },
            { text: 'Vào nơi mát, uống nước từng ngụm nhỏ, đặt khăn ướt lên cổ và trán', correct: true,
              feedback: 'Đúng! Hạ nhiệt từ từ bằng cách vào nơi mát và bù nước điện giải là ưu tiên hàng đầu khi có dấu hiệu say nắng.' },
            { text: 'Nhảy ngay vào bể nước lạnh để hạ nhiệt nhanh nhất', correct: false,
              feedback: 'Chưa đúng. Hạ nhiệt đột ngột có thể gây sốc nhiệt (thermal shock). Cần hạ nhiệt từ từ và đúng cách.' }
        ]
    },
    {
        situation: 'Sau một trận mưa bất ngờ, quần áo bạn ướt hết. Nhiệt độ ngoài trời xuống thấp và bạn bắt đầu run rẩy.',
        context:   'Hạ thân nhiệt (Hypothermia): quần áo ướt dẫn nhiệt gấp 25 lần không khí, khiến cơ thể mất nhiệt nhanh hơn nhiều.',
        options: [
            { text: 'Chịu đựng và chạy nhanh về nhà — chạy sẽ sinh nhiệt bù lại', correct: false,
              feedback: 'Chưa đúng. Quần áo ướt liên tục hút nhiệt ra; sinh nhiệt từ chạy không bù kịp. Phải thay đồ khô trước tiên.' },
            { text: 'Thay quần áo khô, uống đồ ấm và nghỉ ngơi ở nơi ấm áp', correct: true,
              feedback: 'Đúng! Loại bỏ quần áo ướt — nguồn gốc mất nhiệt chính — rồi bổ sung nhiệt từ bên trong là cách xử lý đúng đắn.' },
            { text: 'Xoa mạnh toàn thân để sinh nhiệt nhanh', correct: false,
              feedback: 'Chưa đúng. Xoa mạnh khi hạ thân nhiệt có thể đẩy máu lạnh từ ngoại vi về tim đột ngột, gây nguy hiểm.' }
        ]
    },
    {
        situation: 'Bạn ngồi trong phòng điều hòa đặt 16°C suốt 8 tiếng. Cuối ngày bạn bị đau đầu, cứng cổ và hắt hơi liên tục.',
        context:   'Chênh lệch nhiệt độ trong-ngoài quá lớn (>10°C) gây căng thẳng cơ chế điều hòa thân nhiệt và kích thích hệ hô hấp.',
        options: [
            { text: 'Điều chỉnh điều hòa lên 24–26°C, mặc thêm áo khoác nhẹ và uống nước ấm', correct: true,
              feedback: 'Đúng! WHO khuyến nghị 24–26°C cho phòng điều hòa. Chênh lệch <7°C với ngoài trời giúp bảo vệ hệ hô hấp và điều hòa thân nhiệt.' },
            { text: 'Tắt điều hòa hoàn toàn và mở cửa sổ', correct: false,
              feedback: 'Không tối ưu trong giờ nắng gắt — đưa nhiệt và bụi vào phòng. Điều chỉnh nhiệt độ điều hòa là giải pháp phù hợp hơn.' },
            { text: 'Đặt thêm máy sưởi nhỏ quanh bàn làm việc', correct: false,
              feedback: 'Không hiệu quả — nhiệt độ tổng thể phòng vẫn thấp. Điều chỉnh trực tiếp nhiệt độ điều hòa là cách đúng đắn nhất.' }
        ]
    },
    {
        situation: 'Bạn muốn tập thể dục. Đồng hồ chỉ 12 giờ trưa, nhiệt độ ngoài trời 38°C. Bạn đã uống đủ nước từ sáng.',
        context:   'Tập thể dục nắng gắt làm tăng sinh nhiệt nội tại lên ~1000 W — vượt xa khả năng thoát nhiệt qua mồ hôi trong điều kiện 38°C.',
        options: [
            { text: 'Tập bình thường vì đã uống đủ nước từ trước', correct: false,
              feedback: 'Chưa đúng. Uống nước trước không đủ bù lượng mồ hôi khi tập ở 38°C; tốc độ mất nước và nhiệt cao hơn nhiều.' },
            { text: 'Tập trong nhà hoặc dời sang sáng sớm (trước 8h) hay chiều mát (sau 17h)', correct: true,
              feedback: 'Đúng! Tránh tập ngoài trời trong khung 10h–16h là biện pháp phòng ngừa say nắng hiệu quả nhất.' },
            { text: 'Mặc quần áo che kín để tránh tia nắng trực tiếp', correct: false,
              feedback: 'Chưa đúng. Quần áo kín cản trở bay hơi mồ hôi — cơ chế làm mát chính của cơ thể — làm tăng nguy cơ say nắng.' }
        ]
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
        this.GATE_COUNT    = 4;   // taps required to unlock "Tiếp theo"

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

        // ── Step 2: two-tab view (diseases | scenarios) ───────────────
        this._selectedDisease = null;
        this._viewedDiseases  = new Set();
        this.step2Tab         = 'diseases';   // 'diseases' | 'scenarios'
        this._scenarioIdx     = 0;
        this._scenarioAnswers = new Array(SKIN_SCENARIOS.length).fill(undefined);

        // ── Shared UI ─────────────────────────────────────────────────
        this.narration = new Narration(980, 380);
        this.narrator  = new Narrator(1000, 640, SkinNarration0);

        this.backBtn = new Button( 80,  40, 130, 40, '← Quay lại', 'SWITCH_SCENE', 'BodyMap');
        this.skipBtn = new Button(1120, 40, 100, 35, 'SKIP >>>',   'SWITCH_SCENE', 'BodyMap');
        this.nextBtn = new Button( 600, 730, 180, 46, 'Tiếp theo →','SKIN_NEXT',    null);

        this.zoom3DPlusBtn   = new Button(440, 730,  88, 34, 'Zoom +',     'SKIN_3D_ZOOM_IN',  null);
        this.zoom3DMinusBtn  = new Button(536, 730,  88, 34, 'Zoom −',     'SKIN_3D_ZOOM_OUT', null);
        this.zoom3DResetBtn  = new Button(632, 730,  88, 34, 'Reset',      'SKIN_3D_RESET',    null);
        this.cutLayerBtn     = new Button(728, 730, 108, 34, '✂ Cắt lớp', 'SKIN_3D_CUT',      null);
        this.colorBtn        = new Button(844, 730, 108, 34, '🔆 Đổi màu','SKIN_3D_COLOR',    null);
        this.zoom3DPlusBtn.hide();
        this.zoom3DMinusBtn.hide();
        this.zoom3DResetBtn.hide();
        this.cutLayerBtn.hide();
        this.colorBtn.hide();

        this.view3DBtn = new Button(870, 616, 145, 36, 'Xem 3D', 'SKIN_TOGGLE_3D', null);
        this.view3DBtn.hide();

        this.objects.push(
            this.narrator, this.narration,
            this.backBtn, this.skipBtn, this.nextBtn,
            this.zoom3DPlusBtn, this.zoom3DMinusBtn, this.zoom3DResetBtn,
            this.cutLayerBtn, this.colorBtn,
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
        this.step2Tab         = 'diseases';
        this._scenarioIdx     = 0;
        this._scenarioAnswers = new Array(SKIN_SCENARIOS.length).fill(undefined);

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
            this.step2Tab         = 'diseases';
            this._scenarioIdx     = 0;
            this._scenarioAnswers = new Array(SKIN_SCENARIOS.length).fill(undefined);
            bus.emit('SHOW_NARRATION', SkinNarration2);
        } else if (this.step === 3) {
            this.narrator.eventData = SkinNarration3;
            if (!this._glbLoaded) {
                model3DViewer.load('./assets/skin.glb');
                this._glbLoaded = true;
            }
            model3DViewer.show(30, 108, 780, 570);
            bus.emit('SKIN_THERMO_CHANGE', null);
            bus.emit('SKIN_3D_LOADED');
            bus.emit('SHOW_NARRATION', SkinNarration3);
        }
        this._syncButtons();
    }

    // ── DRAW DISPATCH ─────────────────────────────────────────────────

    draw() {
        this.animFrame++;
        applyVietFont();
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

        this._drawStepDots(4, this.step);
        super.draw();
    }

    // ── INPUT OVERRIDES ───────────────────────────────────────────────

    checkClick() {
        if (this.step === 0) {
            for (const hs of SKIN_HOTSPOTS) {
                if (dist(mouseX, mouseY, hs.pinX, hs.pinY) <= hs.r + 8) {
                    this.activeHotspot = hs;
                    this.tappedIds.add(hs.id);
                    if (this.tappedIds.size >= this.GATE_COUNT) this.nextBtn.show();
                    return;
                }
            }
        }
        if (this.step === 1) {
            // Preset button areas (mirror positions in _drawThermoPanel)
            const presetTemps = [33, 37, 40];
            const bpx = 810, bpy = 90, bpw = 360;
            for (let i = 0; i < presetTemps.length; i++) {
                const bby = bpy + 188 + i * 38;
                if (mouseX >= bpx + 14 && mouseX <= bpx + bpw - 14 &&
                    mouseY >= bby     && mouseY <= bby + 28) {
                    this.thermoTemp = presetTemps[i];
                    return;
                }
            }
            if (this._isInThermoArea(mouseX, mouseY)) {
                this._updateThermoFromMouseY(mouseY);
                return;
            }
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
        applyVietFont();
        fill(80, 40, 10); noStroke(); textSize(28); textStyle(BOLD); textAlign(CENTER);
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

        this._drawSkinAnnotations();
        this._drawSkinInfoPanel();

    }

    _drawSkinAnnotations() {
        push();
        for (const hs of SKIN_HOTSPOTS) {
            const sel  = this.activeHotspot && this.activeHotspot.id === hs.id;
            const seen = this.tappedIds.has(hs.id);
            const c    = color(...hs.swatchColor);
            // Drop shadow for selected pin
            if (sel) {
                noStroke(); fill(0, 0, 0, 40);
                ellipse(hs.pinX + 2, hs.pinY + 2, hs.r * 2 + 6, hs.r * 2 + 6);
            }
            // Pin circle at pinX/pinY
            fill(sel ? c : lerpColor(c, color(255), 0.35));
            stroke(sel ? color(60, 20, 10) : color(100, 60, 40));
            strokeWeight(sel ? 2.5 : 1.5);
            ellipse(hs.pinX, hs.pinY, hs.r * 2, hs.r * 2);
            // Check mark when seen
            if (seen) {
                fill(255); noStroke(); textSize(13); textStyle(BOLD); textAlign(CENTER);
                applyVietFont();
                text('✓', hs.pinX, hs.pinY + 5);
            }
            // Label above pin — white text outline for legibility
            noStroke(); textSize(13); textStyle(sel ? BOLD : NORMAL); textAlign(CENTER);
            applyVietFont();
            fill(255, 255, 255, 200);
            for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1]])
                text(hs.label, hs.pinX + dx, hs.pinY - hs.r - 6 + dy);
            fill(sel ? color(40, 20, 5) : color(60, 30, 5));
            text(hs.label, hs.pinX, hs.pinY - hs.r - 6);
        }
        // Bottom progress text
        fill(80, 50, 20); noStroke(); textSize(13); textStyle(NORMAL); textAlign(LEFT);
        applyVietFont();
        text('Đã khám phá: ' + this.tappedIds.size + ' / ' + SKIN_HOTSPOTS.length +
             '  (cần ' + this.GATE_COUNT + ' để tiếp tục)', 34, 555);
        pop();
    }

    _drawSkinInfoPanel() {
        const px = 762, py = 72, pw = 410, ph = 430;
        const sc = color(140, 80, 30);
        push();
        rectMode(CORNER);

        if (this.activeHotspot) {
            const hs = this.activeHotspot;
            const [r, g, b] = hs.swatchColor;

            // Panel shadow
            noStroke(); fill(0, 0, 0, 20);
            rect(px + 3, py + 3, pw, ph, 10);

            fill(255, 251, 245); stroke(sc); strokeWeight(1.5);
            rect(px, py, pw, ph, 10);

            // Colored header bar
            fill(r, g, b, 40); noStroke();
            rect(px, py, pw, 48, 10, 10, 0, 0);

            // Swatch + name
            fill(r, g, b); noStroke(); rect(px + 14, py + 14, 22, 22, 5);
            fill(sc); textSize(17); textStyle(BOLD); textAlign(LEFT); applyVietFont();
            text(hs.label, px + 44, py + 31);

            // Divider
            stroke(sc); strokeWeight(0.8); line(px + 14, py + 48, px + pw - 14, py + 48);

            // Description
            noStroke(); fill(45, 25, 8); textSize(14); textStyle(NORMAL);
            text(hs.desc, px + 14, py + 60, pw - 28, 118);

            // SGK chip
            fill(240, 232, 215); stroke(sc); strokeWeight(1);
            rect(px + 14, py + 186, 126, 24, 12);
            fill(sc); noStroke(); textSize(11); textStyle(NORMAL); textAlign(CENTER);
            applyVietFont();
            text('📖 ' + hs.sgk, px + 77, py + 203);

            // Pronunciation chip
            fill(255, 252, 230); stroke(color(180, 150, 50)); strokeWeight(1);
            rect(px + 148, py + 186, pw - 162, 24, 12);
            fill(color(90, 60, 8)); noStroke(); textSize(11); textAlign(LEFT);
            text('🔊 ' + hs.pron, px + 160, py + 203);

            // Diseases section
            const dis = hs.diseases || [];
            const disH = 42 + dis.length * 24;
            fill(255, 248, 240); stroke(sc); strokeWeight(1);
            rect(px, py + ph - disH - 20, pw, disH + 20, 10);
            fill(sc); noStroke(); textSize(13); textStyle(BOLD); textAlign(LEFT);
            text('Bệnh lý liên quan:', px + 14, py + ph - disH - 3);
            fill(50, 30, 10); textSize(12); textStyle(NORMAL);
            for (let i = 0; i < dis.length; i++)
                text('• ' + dis[i], px + 16, py + ph - disH + 18 + i * 24, pw - 30, 22);

            // "Đã khám phá" badge
            fill(40, 160, 75, 230); noStroke();
            rect(px + pw - 132, py + 14, 118, 28, 14);
            fill(255); textSize(12); textStyle(BOLD); textAlign(CENTER);
            text('Đã khám phá ✓', px + pw - 73, py + 33);

        } else {
            // Panel shadow
            noStroke(); fill(0, 0, 0, 15);
            rect(px + 3, py + 3, pw, ph, 10);

            fill(250, 247, 240, 220); stroke(color(195, 175, 140)); strokeWeight(1.2);
            rect(px, py, pw, ph, 10);
            fill(140, 105, 55); noStroke();
            textSize(15); textStyle(NORMAL); textAlign(CENTER); applyVietFont();
            text('Nhấn vào một bộ phận', px + pw / 2, py + ph / 2 - 52);
            text('trên sơ đồ để xem chi tiết', px + pw / 2, py + ph / 2 - 28);
            text('từng cấu trúc →', px + pw / 2, py + ph / 2 - 4);

            // Progress bar
            const total = SKIN_HOTSPOTS.length;
            const seen  = this.tappedIds.size;
            fill(215, 205, 195); rect(px + 30, py + ph / 2 + 32, pw - 60, 14, 7);
            if (seen > 0) {
                fill(160, 100, 40);
                rect(px + 30, py + ph / 2 + 32, (pw - 60) * seen / total, 14, 7);
            }
            fill(100, 70, 30); textSize(13); textAlign(CENTER);
            text(seen + ' / ' + total + ' bộ phận đã xem  (cần ' + this.GATE_COUNT + ')',
                 px + pw / 2, py + ph / 2 + 62);

            if (seen < this.GATE_COUNT) {
                fill(130, 85, 30); textSize(13);
                text('Khám phá thêm ' + (this.GATE_COUNT - seen) + ' bộ phận để mở "Tiếp theo"',
                     px + pw / 2, py + ph / 2 + 86);
            } else {
                fill(30, 140, 60); textSize(13); textStyle(BOLD);
                text('Sẵn sàng! Nhấn "Tiếp theo →" bên dưới', px + pw / 2, py + ph / 2 + 86);
            }
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
        if      (this.isHot)  { fill(200, 50, 20);  text('Môi trường NÓNG (≥38°C)', 380, 82); }
        else if (this.isCold) { fill(30,  80, 200); text('Môi trường LẠNH (≤35°C)', 380, 82); }
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

            if (this.isHot) {
                fill(210, 50, 50, 200); noStroke();
                rect(sx + 218, sy + eH + 18, 28, dH - 36, 14);
                rect(sx + 392, sy + eH + 18, 22, dH - 36, 11);
                fill(40, 10, 10); textSize(12);
                text('Mạch máu giãn → tản nhiệt', sx + 255, sy + eH + dH / 2);
            } else if (this.isCold) {
                fill(180, 50, 50, 180); noStroke();
                rect(sx + 225, sy + eH + 18, 10, dH - 36, 5);
                rect(sx + 398, sy + eH + 18,  8, dH - 36, 4);
                fill(40, 10, 10); textSize(12);
                text('Mạch máu co → giữ nhiệt', sx + 242, sy + eH + dH / 2);
            } else {
                fill(180, 50, 50, 100); noStroke();
                rect(sx + 218, sy + eH + 18, 16, dH - 36, 8);
                fill(40, 10, 10); textSize(12);
                text('Mạch máu bình thường', sx + 248, sy + eH + dH / 2);
            }
        }

        this._drawThermoEffectors(sx, sy, eH, dH);
        this._drawTempBar();
        this._drawThermoPanel();
        this._drawThermoBubble();
    }

    _drawThermoPanel() {
        const px = 810, py = 90, pw = 360, ph = 380;
        const lx = px, ly = py + ph + 14, lw = pw, lh = 95;
        push();
        rectMode(CORNER); textAlign(LEFT);

        // Main info panel
        if (this.isHot) {
            fill(255, 238, 225); stroke(200, 100, 50);
        } else if (this.isCold) {
            fill(225, 238, 255); stroke(50, 100, 200);
        } else {
            fill(230, 248, 230); stroke(50, 160, 80);
        }
        strokeWeight(1.5); rect(px, py, pw, ph, 10);

        const titleColor = this.isHot ? color(180, 55, 20) : this.isCold ? color(30, 70, 185) : color(20, 130, 60);
        fill(titleColor); noStroke(); textSize(16); textStyle(BOLD);
        text(this.isHot ? '🌡️ Da khi NÓNG (≥38°C)' : this.isCold ? '❄️ Da khi LẠNH (≤35°C)' : '✅ Thân nhiệt bình thường', px + 14, py + 28);

        const bullets = this.isHot
            ? ['Mạch máu giãn → tăng lưu lượng máu', 'Tuyến mồ hôi hoạt động → bay hơi làm mát', 'Da ửng đỏ, cảm giác nóng bừng']
            : this.isCold
            ? ['Mạch máu co → giảm mất nhiệt', 'Lông dựng lên → tạo lớp không khí cách nhiệt', 'Cơ run rẩy → sinh nhiệt nội tại']
            : ['Mạch máu ở trạng thái bình thường', 'Không có phản ứng điều hòa đặc biệt', 'Thân nhiệt duy trì ở 37°C'];

        noStroke(); textSize(14); textStyle(NORMAL);
        for (let i = 0; i < bullets.length; i++) {
            fill(titleColor); ellipse(px + 20, py + 58 + i * 36, 7, 7);
            fill(40, 30, 20); text(bullets[i], px + 32, py + 63 + i * 36, pw - 44, 30);
        }

        // Preset buttons
        const presets = [
            { label: '❄️  33°C  —  Trời rét',    temp: 33, r: 30,  g: 70,  b_: 185 },
            { label: '✅  37°C  —  Bình thường', temp: 37, r: 20,  g: 130, b_: 60  },
            { label: '🌡️  40°C  —  Sốt cao',    temp: 40, r: 180, g: 55,  b_: 20  },
        ];
        noStroke(); textSize(13); textStyle(NORMAL); textAlign(CENTER);
        for (let i = 0; i < presets.length; i++) {
            const p = presets[i];
            const bby = py + 188 + i * 38;
            const selected = Math.abs(this.thermoTemp - p.temp) < 0.5;
            if (selected) {
                fill(p.r, p.g, p.b_); stroke(p.r, p.g, p.b_); strokeWeight(1.5);
            } else {
                fill(250, 248, 245); stroke(p.r, p.g, p.b_); strokeWeight(1.5);
            }
            rect(px + 14, bby, pw - 28, 28, 14);
            fill(selected ? 255 : color(p.r, p.g, p.b_)); noStroke(); textStyle(selected ? BOLD : NORMAL);
            text(p.label, px + pw / 2, bby + 19);
        }
        textStyle(NORMAL);

        // Legend panel
        fill(250, 250, 246); stroke(180, 175, 160); strokeWeight(1);
        rect(lx, ly, lw, lh, 8);
        fill(55, 45, 25); noStroke(); textSize(13); textStyle(BOLD);
        text('Chú thích:', lx + 14, ly + 18);
        textStyle(NORMAL);
        const legend = [
            { color: color(210, 80, 50), label: 'NÓNG (≥38°C) — da đỏ, đổ mồ hôi' },
            { color: color(30, 160, 70),  label: 'Bình thường (36–37°C)' },
            { color: color(50, 100, 210), label: 'LẠNH (≤35°C) — da tái, run rẩy' },
        ];
        for (let i = 0; i < legend.length; i++) {
            fill(legend[i].color); noStroke(); rect(lx + 14, ly + 28 + i * 22, 14, 14, 3);
            fill(50, 40, 20); textSize(13); text(legend[i].label, lx + 34, ly + 40 + i * 22);
        }
        pop();
    }

    _drawTempBar() {
        const bx = 720, by = 112, bw = 54, bh = 475;
        const temp = this.thermoTemp;

        fill(215); stroke(100); strokeWeight(1); rect(bx, by, bw, bh, 5);

        const fillH = map(temp, 32, 42, 0, bh);
        const r     = map(temp, 32, 42,   0, 255);
        const b     = map(temp, 32, 42, 255,   0);
        fill(r, 55, b); noStroke();
        rect(bx, by + bh - fillH, bw, fillH, 5);

        for (let deg = 32; deg <= 42; deg++) {
            const ty = by + map(deg, 32, 42, bh, 0);
            stroke(80); strokeWeight(1); line(bx - 5, ty, bx, ty);
            fill(30); noStroke(); textSize(12); textAlign(RIGHT);
            text(deg + '°C', bx - 8, ty + 4);
        }

        const spY = by + map(37, 32, 42, bh, 0);
        stroke(20, 155, 60); strokeWeight(2);
        line(bx - 8, spY, bx + bw + 5, spY);
        noStroke(); fill(15, 125, 50); textSize(12); textAlign(LEFT);
        text('37°C bình thường', bx + bw + 8, spY + 4);

        stroke(210, 55, 20, 185); strokeWeight(1);
        line(bx - 4, by + map(38, 32, 42, bh, 0), bx + bw + 3, by + map(38, 32, 42, bh, 0));
        stroke(25, 75, 210, 185);
        line(bx - 4, by + map(35, 32, 42, bh, 0), bx + bw + 3, by + map(35, 32, 42, bh, 0));

        const handleY = by + map(temp, 32, 42, bh, 0);
        fill(255); stroke(70); strokeWeight(2);
        ellipse(bx + bw / 2, handleY, bw + 12, 26);
        fill(30); noStroke(); textSize(13); textStyle(BOLD); textAlign(CENTER);
        text(nf(temp, 2, 1) + '°C', bx + bw / 2, handleY + 5);
        textStyle(NORMAL);

        fill(30); noStroke(); textSize(14); textAlign(CENTER);
        text('Thân nhiệt', bx + bw / 2, by - 22);
        textAlign(LEFT);
    }

    // ── STEP 2 – Diseases visualization ──────────────────────────────

    _drawDiseases() {
        background(238, 245, 240);

        push();
        fill(15, 85, 42); noStroke(); textSize(22); textStyle(BOLD); textAlign(CENTER);
        text('Bệnh Da & Phòng Chống Nóng Lạnh', 390, 38);
        pop();

        if (this.step2Tab === 'diseases') {
            const cw = 230, ch = 560, gap = 10, startX = 30, startY = 62;
            for (let i = 0; i < SKIN_DISEASES_VIZ.length; i++) {
                this._drawDiseaseCard(i, startX + i * (cw + gap), startY, cw, ch);
            }
            this._drawDiseaseDetail();
        } else {
            this._drawScenarios();
        }

        this._drawStep2Tabs();

        const diseaseDone = this._viewedDiseases.size >= SKIN_DISEASES_VIZ.length;
        const scenCorrect = this._scenarioAnswers.reduce((n, a, i) =>
            n + (a !== undefined && SKIN_SCENARIOS[i].options[a].correct ? 1 : 0), 0);
        push();
        textAlign(CENTER); noStroke();
        if (diseaseDone && scenCorrect >= 2) {
            fill(20, 140, 60); textSize(13); textStyle(BOLD);
            text('Hoàn thành cả hai phần! Nhấn "Tiếp theo →" bên dưới.', 390, 745);
        } else {
            fill(110, 80, 25); textSize(11); textStyle(NORMAL);
            const parts = [];
            if (!diseaseDone) parts.push('xem đủ 3 bệnh da');
            if (scenCorrect < 2) parts.push('đúng ≥2 tình huống phòng chống');
            text('Cần: ' + parts.join(' và '), 390, 745);
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
        rect(cx, cy, cw, 44, 8, 8, 0, 0);
        fill(255); textSize(14); textStyle(BOLD); textAlign(CENTER);
        text(d.name, cx + cw / 2, cy + 18);
        fill(200, 248, 210); textSize(11); textStyle(ITALIC);
        text(d.sub, cx + cw / 2, cy + 35);

        // Normal skin label
        noStroke(); fill(55, 95, 60); textSize(11); textStyle(BOLD); textAlign(LEFT);
        text('BÌNH THƯỜNG:', cx + 8, cy + 58);
        this._drawSkinMiniNormal(cx + 8, cy + 62, cw - 16, 148);

        // Diseased skin label
        noStroke(); fill(155, 30, 30); textSize(11); textStyle(BOLD); textAlign(LEFT);
        text('KHI BỊ BỆNH:', cx + 8, cy + 223);
        this._drawSkinMiniDiseased(cx + 8, cy + 227, cw - 16, 148, idx);

        // Prevention section
        stroke(180, 210, 185); strokeWeight(1);
        line(cx + 8, cy + 384, cx + cw - 8, cy + 384);
        noStroke(); fill(18, 75, 30); textSize(11); textStyle(BOLD); textAlign(LEFT);
        text('PHÒNG TRÁNH:', cx + 8, cy + 397);
        fill(38, 52, 40); textStyle(NORMAL); textSize(11);
        for (let j = 0; j < d.prevention.length; j++) {
            const iy = cy + 410 + j * 44;
            fill(20, 150, 55); noStroke(); ellipse(cx + 14, iy + 6, 7, 7);
            fill(38, 52, 40); textAlign(LEFT);
            text(d.prevention[j], cx + 24, iy, cw - 32, 42);
        }

        // Bottom indicator
        if (!isView) {
            fill(20, 140, 60, 210); noStroke();
            rect(cx + cw / 2 - 62, cy + ch - 28, 124, 22, 11);
            fill(255); textSize(11); textStyle(BOLD); textAlign(CENTER);
            text('Nhấn để xem chi tiết', cx + cw / 2, cy + ch - 13);
        } else {
            fill(25, 155, 70); noStroke(); textSize(12); textStyle(BOLD); textAlign(CENTER);
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
        noStroke(); fill(110, 48, 14); textSize(12); textStyle(BOLD); textAlign(LEFT);
        applyVietFont();
        text('Tác nhân gây bệnh:', rx + 16, ry + 86);
        fill(58, 28, 8); textStyle(NORMAL); textSize(13);
        text(d.pathogen, rx + 16, ry + 103);

        // Description
        stroke(175, 210, 178); strokeWeight(1);
        line(rx + 16, ry + 115, rx + rw - 16, ry + 115);
        noStroke(); fill(32, 52, 38); textSize(13); textStyle(NORMAL); textAlign(LEFT);
        text(d.desc, rx + 16, ry + 130, rw - 32, 100);

        // Symptoms
        stroke(175, 210, 178); strokeWeight(1);
        line(rx + 16, ry + 240, rx + rw - 16, ry + 240);
        noStroke(); fill(22, 72, 168); textSize(13); textStyle(BOLD); textAlign(LEFT);
        text('Triệu chứng:', rx + 16, ry + 257);
        fill(38, 45, 78); textStyle(NORMAL); textSize(13);
        for (let i = 0; i < d.symptoms.length; i++) {
            fill(22, 72, 168); noStroke(); ellipse(rx + 24, ry + 273 + i * 27, 7, 7);
            fill(38, 45, 78);
            text(d.symptoms[i], rx + 36, ry + 277 + i * 27);
        }

        // Prevention
        const prevY = ry + 365;
        stroke(175, 210, 178); strokeWeight(1);
        line(rx + 16, prevY, rx + rw - 16, prevY);
        noStroke(); fill(18, 128, 54); textSize(13); textStyle(BOLD); textAlign(LEFT);
        text('Cách phòng tránh:', rx + 16, prevY + 18);
        fill(30, 58, 36); textStyle(NORMAL); textSize(13);
        for (let i = 0; i < d.prevention.length; i++) {
            fill(18, 145, 50); noStroke(); ellipse(rx + 24, prevY + 35 + i * 32, 7, 7);
            fill(30, 58, 36);
            text(d.prevention[i], rx + 36, prevY + 39 + i * 32, rw - 52, 30);
        }
        pop();
    }

    _drawStep2Tabs() {
        const tabY = 694, tabH = 34;
        const tabs = [
            { id: 'diseases',  label: '📋 Bệnh Da',            x: 30,  w: 200 },
            { id: 'scenarios', label: '🧠 4 Tình huống',        x: 238, w: 252 },
        ];
        push();
        rectMode(CORNER);
        for (const t of tabs) {
            const active = this.step2Tab === t.id;
            const done   = t.id === 'diseases'
                ? this._viewedDiseases.size >= SKIN_DISEASES_VIZ.length
                : this._scenarioAnswers.reduce((n, a, i) =>
                    n + (a !== undefined && SKIN_SCENARIOS[i].options[a].correct ? 1 : 0), 0) >= 2;
            fill(active ? color(20, 110, 45) : done ? color(210, 242, 215) : color(235, 245, 235));
            stroke(active ? color(15, 88, 35) : color(155, 200, 162)); strokeWeight(1.5);
            rect(t.x, tabY, t.w, tabH, 6);
            fill(active ? 255 : done ? color(20, 100, 40) : color(75, 108, 82));
            noStroke(); textSize(13); textStyle(active ? BOLD : NORMAL); textAlign(CENTER);
            applyVietFont();
            text(t.label + (done ? '  ✓' : ''), t.x + t.w / 2, tabY + 22);
        }
        pop();
    }

    _drawScenarios() {
        const q        = SKIN_SCENARIOS[this._scenarioIdx];
        const answered = this._scenarioAnswers[this._scenarioIdx];
        const total    = SKIN_SCENARIOS.length;
        const px = 30, py = 62, pw = 730;

        push();
        rectMode(CORNER);

        // Header strip
        fill(30, 95, 160); stroke(20, 75, 128); strokeWeight(1.5);
        rect(px, py, pw, 40, 6);
        fill(255); noStroke(); textSize(13); textStyle(BOLD); textAlign(LEFT);
        text('Tình huống ' + (this._scenarioIdx + 1) + '/' + total +
             '  —  Phòng chống nóng lạnh', px + 14, py + 26);

        // Situation box
        fill(245, 250, 255); stroke(175, 200, 228); strokeWeight(1);
        rect(px, py + 48, pw, 110, 4);
        fill(35, 35, 62); noStroke(); textSize(13); textStyle(NORMAL); textAlign(LEFT);
        text(q.situation, px + 12, py + 64, pw - 24, 94);

        // Context (physiology)
        fill(78, 68, 28); noStroke(); textSize(12); textStyle(ITALIC);
        applyVietFont();
        text('Bối cảnh sinh lý: ' + q.context, px + 12, py + 170, pw - 24, 44);

        // Prompt
        fill(20, 55, 148); noStroke(); textSize(13); textStyle(BOLD); textAlign(LEFT);
        text('→ Bạn nên làm gì?', px + 12, py + 228);

        // Options
        const optY0 = py + 240, optH = 72, optGap = 8;
        for (let i = 0; i < q.options.length; i++) {
            const opt = q.options[i];
            const oy  = optY0 + i * (optH + optGap);
            const isSel    = answered === i;
            const revealed = answered !== undefined;
            const hov      = !revealed &&
                             mouseX >= px && mouseX <= px + pw &&
                             mouseY >= oy  && mouseY <= oy + optH;

            let fg, sg;
            if (revealed) {
                if      (opt.correct) { fg = color(210, 245, 215); sg = color(25, 155, 65); }
                else if (isSel)       { fg = color(248, 212, 212); sg = color(192, 45, 45); }
                else                  { fg = color(245, 245, 245); sg = color(185, 185, 185); }
            } else {
                fg = hov ? color(218, 235, 255) : color(252, 252, 252);
                sg = hov ? color(70, 130, 200)  : color(175, 200, 228);
            }
            fill(fg); stroke(sg); strokeWeight(1.5);
            rect(px, oy, pw, optH, 5);
            noStroke(); fill(35, 35, 35); textSize(13); textStyle(NORMAL); textAlign(LEFT);
            applyVietFont();
            text(String.fromCharCode(65 + i) + '.  ' + opt.text, px + 14, oy + 11, pw - 52, optH);
            if (revealed) {
                textSize(16); textStyle(BOLD); textAlign(RIGHT);
                if      (opt.correct) { fill(25, 155, 65);  text('v', px + pw - 10, oy + optH / 2 + 5); }
                else if (isSel)       { fill(192, 45, 45);  text('x', px + pw - 10, oy + optH / 2 + 5); }
                textStyle(NORMAL);
            }
        }

        // Feedback box (shown after answering)
        if (answered !== undefined) {
            const isOk  = q.options[answered].correct;
            const fbY   = optY0 + q.options.length * (optH + optGap) - optGap + 10;
            fill(isOk ? color(222, 248, 226) : color(248, 226, 222));
            stroke(isOk ? color(25, 155, 65) : color(192, 45, 45)); strokeWeight(1);
            rect(px, fbY, pw, 82, 5);
            fill(isOk ? color(18, 120, 50) : color(152, 35, 35));
            noStroke(); textSize(13); textStyle(NORMAL); textAlign(LEFT);
            applyVietFont();
            text(q.options[answered].feedback, px + 12, fbY + 14, pw - 24, 70);
        }

        // Nav buttons
        const navY = py + 586;
        if (this._scenarioIdx > 0) {
            fill(220, 235, 220); stroke(130, 175, 135); strokeWeight(1);
            rect(px, navY, 148, 34, 6);
            fill(25, 78, 30); noStroke(); textSize(13); textStyle(NORMAL); textAlign(CENTER);
            applyVietFont();
            text('← Tình huống trước', px + 74, navY + 22);
        }
        if (this._scenarioIdx < total - 1) {
            fill(220, 235, 220); stroke(130, 175, 135); strokeWeight(1);
            rect(px + pw - 148, navY, 148, 34, 6);
            fill(25, 78, 30); noStroke(); textSize(13); textStyle(NORMAL); textAlign(CENTER);
            applyVietFont();
            text('Tình huống sau →', px + pw - 74, navY + 22);
        }
        pop();

        this._drawScenarioDetail();
    }

    _drawScenarioDetail() {
        const rx = 762, ry = 62, rw = 415, rh = 630;
        const total   = SKIN_SCENARIOS.length;
        const correct = this._scenarioAnswers.reduce((n, a, i) =>
            n + (a !== undefined && SKIN_SCENARIOS[i].options[a].correct ? 1 : 0), 0);
        const done    = this._scenarioAnswers.filter(a => a !== undefined).length;

        push();
        rectMode(CORNER);
        fill(245, 250, 255); stroke(158, 195, 218); strokeWeight(1.5);
        rect(rx, ry, rw, rh, 10);

        fill(22, 78, 148); noStroke(); textSize(16); textStyle(BOLD); textAlign(CENTER);
        text('Kết quả tình huống', rx + rw / 2, ry + 36);

        textSize(52); textStyle(BOLD);
        fill(correct >= 2 ? color(20, 160, 70) : color(155, 45, 45));
        text(correct + '/' + total, rx + rw / 2, ry + 108);
        fill(75, 75, 75); textSize(13); textStyle(NORMAL);
        text('câu trả lời đúng', rx + rw / 2, ry + 130);
        text('Đã làm: ' + done + '/' + total + ' tình huống', rx + rw / 2, ry + 152);

        // Progress dots
        const dotSpacing = (rw - 60) / (total - 1);
        for (let i = 0; i < total; i++) {
            const a      = this._scenarioAnswers[i];
            const dx     = rx + 30 + i * dotSpacing;
            const dy     = ry + 182;
            const active = i === this._scenarioIdx;
            if      (a === undefined)                        fill(active ? color(92, 158, 210) : color(200, 215, 228));
            else if (SKIN_SCENARIOS[i].options[a].correct)  fill(20, 160, 70);
            else                                             fill(192, 45, 45);
            noStroke(); ellipse(dx, dy, active ? 30 : 22, active ? 30 : 22);
            fill(255); textSize(11); textStyle(BOLD); textAlign(CENTER);
            text(i + 1, dx, dy + 5);
        }

        // Status text
        textSize(13); textAlign(CENTER);
        if (correct >= 2) {
            fill(20, 160, 70); textStyle(BOLD);
            text('Giỏi lắm! Phần phòng chống hoàn thành.', rx + rw / 2, ry + 225);
        } else if (done >= total) {
            fill(192, 45, 45); textStyle(NORMAL);
            text('Cần ít nhất 2 câu đúng.', rx + rw / 2, ry + 225);
        } else {
            fill(92, 70, 20); textStyle(NORMAL);
            text('Cần thêm ' + (2 - correct) + ' câu đúng', rx + rw / 2, ry + 222);
            text('để hoàn thành phần này.', rx + rw / 2, ry + 244);
        }
        pop();
    }

    _handleDiseaseClick() {
        // Tab button clicks (tabY=694, tabH=34)
        if (mouseY >= 694 && mouseY <= 728) {
            if (mouseX >= 30  && mouseX <= 230) { this.step2Tab = 'diseases';  return true; }
            if (mouseX >= 238 && mouseX <= 490) { this.step2Tab = 'scenarios'; return true; }
        }

        if (this.step2Tab === 'diseases') {
            const cw = 230, ch = 560, gap = 10, startX = 30, startY = 62;
            for (let i = 0; i < SKIN_DISEASES_VIZ.length; i++) {
                const cx = startX + i * (cw + gap);
                if (mouseX >= cx && mouseX <= cx + cw &&
                    mouseY >= startY && mouseY <= startY + ch) {
                    this._selectedDisease = i;
                    this._viewedDiseases.add(i);
                    this._syncButtons();
                    return true;
                }
            }

        } else {
            const q        = SKIN_SCENARIOS[this._scenarioIdx];
            const answered = this._scenarioAnswers[this._scenarioIdx];
            const total    = SKIN_SCENARIOS.length;
            const px = 30, py = 62, pw = 730;
            const optY0 = py + 240, optH = 72, optGap = 8;

            // Option clicks (only when unanswered)
            if (answered === undefined) {
                for (let i = 0; i < q.options.length; i++) {
                    const oy = optY0 + i * (optH + optGap);
                    if (mouseX >= px && mouseX <= px + pw &&
                        mouseY >= oy  && mouseY <= oy + optH) {
                        this._scenarioAnswers[this._scenarioIdx] = i;
                        this._syncButtons();
                        return true;
                    }
                }
            }

            // Nav buttons (navY = py + 586 = 648)
            const navY = py + 586;
            if (this._scenarioIdx > 0 &&
                mouseX >= px && mouseX <= px + 148 &&
                mouseY >= navY && mouseY <= navY + 34) {
                this._scenarioIdx--;
                return true;
            }
            if (this._scenarioIdx < total - 1 &&
                mouseX >= px + pw - 148 && mouseX <= px + pw &&
                mouseY >= navY && mouseY <= navY + 34) {
                this._scenarioIdx++;
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
        text('Mô hình 3D của Da', 440, 52);
        fill(170); textSize(13); textStyle(NORMAL);
        text('Kéo chuột: xoay  |  Cuộn: zoom  |  Chuột phải: di chuyển', 440, 78);
        pop();

        // 3D viewport border (now 780px wide per design)
        push();
        noFill(); stroke(70, 110, 220); strokeWeight(2);
        rect(30, 108, 780, 570, 8);
        pop();

        // Status text below viewport
        push();
        textSize(13); textAlign(CENTER); noStroke();
        if (!model3DViewer.isReady) {
            fill(255, 80, 80);
            text('WebGL không khả dụng — không thể hiển thị mô hình 3D', 420, 700);
        } else if (model3DViewer.isLoading) {
            fill(120, 160, 255);
            text('Đang tải mô hình… (skin.glb ~27 MB)', 420, 700);
        } else {
            fill(80, 180, 100);
            text('Mô hình đã tải  ·  dùng chuột để xoay / zoom', 420, 700);
        }
        pop();

        // Right guide panel
        push();
        rectMode(CORNER); textAlign(LEFT);
        fill(30, 38, 64); stroke(60, 90, 180); strokeWeight(1.5);
        rect(820, 108, 350, 570, 8);

        fill(180, 200, 255); noStroke(); textSize(14); textStyle(BOLD);
        text('Hướng dẫn điều khiển', 838, 134);

        fill(140, 165, 220); textSize(12); textStyle(NORMAL);
        const controls = [
            '🖱️ Kéo trái: xoay mô hình',
            '🖱️ Cuộn: phóng to / thu nhỏ',
            '🖱️ Kéo phải: di chuyển',
        ];
        for (let i = 0; i < controls.length; i++) {
            text(controls[i], 838, 158 + i * 26);
        }

        // Layer toggles section
        fill(200, 220, 255); textSize(13); textStyle(BOLD);
        text('Các lớp da:', 838, 250);

        const layers = [
            { color: color(255, 200, 150), label: 'Biểu bì (Epidermis)' },
            { color: color(255, 140, 110), label: 'Lớp bì (Dermis)' },
            { color: color(255, 220, 100), label: 'Mô dưới da (Hypodermis)' },
        ];
        textStyle(NORMAL); textSize(12);
        for (let i = 0; i < layers.length; i++) {
            fill(layers[i].color); noStroke();
            rect(838, 262 + i * 32, 14, 14, 3);
            fill(160, 185, 228);
            text(layers[i].label, 858, 274 + i * 32);
        }

        // Tip at bottom
        fill(100, 130, 190); textSize(11); textStyle(ITALIC);
        text('Nhấn Reset để trở về góc nhìn ban đầu.', 838, 480);
        text('Dùng Zoom +/- để điều chỉnh tỉ lệ.', 838, 498);
        pop();
    }

    // ── HELPERS ───────────────────────────────────────────────────────

    _syncButtons() {
        if (this.step === 0) {
            if (this.tappedIds.size < this.GATE_COUNT) this.nextBtn.hide();
            else this.nextBtn.show();
            this.zoom3DPlusBtn.hide(); this.zoom3DMinusBtn.hide(); this.zoom3DResetBtn.hide();
            this.cutLayerBtn.hide(); this.colorBtn.hide();
            this.view3DBtn.hide();
            this.nextBtn.x = 600;
            this.nextBtn.label     = 'Tiếp theo →';
            this.nextBtn.eventTag  = 'SKIN_NEXT';
            this.nextBtn.eventData = null;
        } else if (this.step === 1) {
            this.nextBtn.show();
            this.zoom3DPlusBtn.hide(); this.zoom3DMinusBtn.hide(); this.zoom3DResetBtn.hide();
            this.cutLayerBtn.hide(); this.colorBtn.hide();
            this.view3DBtn.show();
            this.view3DBtn.x = 990; this.view3DBtn.y = 434; this.view3DBtn.w = 300; this.view3DBtn.h = 38;
            this.nextBtn.x = 600;
            this.nextBtn.label     = 'Tiếp theo →';
            this.nextBtn.eventTag  = 'SKIN_NEXT';
            this.nextBtn.eventData = null;
        } else if (this.step === 2) {
            const _d = this._viewedDiseases.size >= SKIN_DISEASES_VIZ.length;
            const _s = this._scenarioAnswers.reduce((n, a, i) =>
                n + (a !== undefined && SKIN_SCENARIOS[i].options[a].correct ? 1 : 0), 0) >= 2;
            if (_d && _s) this.nextBtn.show(); else this.nextBtn.hide();
            this.zoom3DPlusBtn.hide(); this.zoom3DMinusBtn.hide(); this.zoom3DResetBtn.hide();
            this.cutLayerBtn.hide(); this.colorBtn.hide();
            this.view3DBtn.hide();
            this.nextBtn.x = 600;
            this.nextBtn.label     = 'Tiếp theo →';
            this.nextBtn.eventTag  = 'SKIN_NEXT';
            this.nextBtn.eventData = null;
        } else {
            this.nextBtn.show();
            this.nextBtn.x = 1050; // shift right so it clears the 3D control buttons
            this.nextBtn.label     = '← Về trang chủ';
            this.nextBtn.eventTag  = 'SWITCH_SCENE';
            this.nextBtn.eventData = 'BodyMap';
            this.zoom3DPlusBtn.show(); this.zoom3DMinusBtn.show(); this.zoom3DResetBtn.show();
            this.cutLayerBtn.show(); this.colorBtn.show();
            this.view3DBtn.hide();
        }
    }

    _isInThermoArea(mx, my) {
        const { x, y, w, h } = this._THERMO;
        return mx >= x && mx <= x + w && my >= y && my <= y + h;
    }

    _updateThermoFromMouseY(my) {
        const { y, h } = this._THERMO;
        this.thermoTemp = constrain(map(my, y, y + h, 42, 32), 32, 42);
    }

    _drawThermoLabels() {
        const sx = 30, sy = 112, eH = 55, dH = 252;
        push(); noStroke(); textAlign(LEFT);
        if (this.isHot) {
            fill(40, 10, 10); textSize(12);
            text('Mạch máu giãn → tản nhiệt', sx + 255, sy + eH + dH / 2);
        } else if (this.isCold) {
            fill(40, 10, 10); textSize(12);
            text('Mạch máu co → giữ nhiệt', sx + 242, sy + eH + dH / 2);
        }
        pop();
    }

    _drawThermoBubble() {
        const bx = 200, by = 610, bw = 400, bh = 56;
        push();
        rectMode(CORNER);
        fill(255, 252, 230, 230); stroke(160, 130, 60); strokeWeight(1.5);
        rect(bx, by, bw, bh, 12);
        // left-pointing tail
        noStroke(); fill(255, 252, 230, 230);
        triangle(bx, by + 20, bx - 18, by + 30, bx, by + 40);
        stroke(160, 130, 60); strokeWeight(1.5);
        line(bx, by + 20, bx - 18, by + 30);
        line(bx - 18, by + 30, bx, by + 40);

        fill(70, 50, 10); noStroke(); textSize(13); textAlign(CENTER);
        applyVietFont();
        text('Kéo thanh nhiệt kế để thấy da phản ứng theo nhiệt độ!', bx + bw / 2, by + 33);
        pop();
    }

    _drawThermoEffectors(sx, sy, eH, dH) {
        const T = this.effectorTimer;
        push(); rectMode(CORNER);
        if (this.isHot) {
            if (T >= 24) {
                for (let i = 0; i < 6; i++) {
                    const px = sx + 70 + i * 94;
                    stroke(90, 140, 210); strokeWeight(2);
                    line(px, sy, px, sy - 12);
                    const dy = sy - 22 - ((this.animFrame * 2 + i * 55) % 88);
                    fill(80, 140, 210, 200); noStroke();
                    ellipse(px, dy, 9, 13);
                }
                fill(30, 80, 180); noStroke(); textSize(13); textAlign(LEFT);
                text('→ Tiết mồ hôi để làm mát cơ thể', sx + 10, sy - 30);
            }
        } else if (this.isCold) {
            if (T >= 24) {
                stroke(70, 45, 25); strokeWeight(2);
                for (let i = 0; i < 8; i++) {
                    const hx = sx + 54 + i * 78;
                    line(hx, sy + 5, hx + 13, sy - 25);
                }
                fill(30, 50, 160); noStroke(); textSize(13); textAlign(LEFT);
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
                fill(60, 60, 190); noStroke(); textSize(12); textAlign(LEFT);
                text('→ Cơ run rẩy để sinh nhiệt', sx + 10, sy + eH + 195);
            }
        } else {
            fill(30, 130, 60); noStroke(); textSize(13); textAlign(LEFT);
            text('→ Thân nhiệt ổn định tại 37°C', sx + 10, sy - 18);
        }
        pop();
    }

    _drawStepDots(total, current) {
        const dotGap = 20, pillW = 26, pillH = 12, dotD = 12;
        const totalW = (total - 1) * dotGap + pillW + (total - 1) * dotD;
        let cx = (width - totalW) / 2;
        push();
        rectMode(CORNER); noStroke();
        for (let i = 0; i < total; i++) {
            if (i === current) {
                fill(34, 34, 34);
                rect(cx, 785 - pillH / 2, pillW, pillH, pillH / 2);
                cx += pillW + dotGap;
            } else {
                fill(255); stroke(34, 34, 34); strokeWeight(1.5);
                ellipse(cx + dotD / 2, 785, dotD, dotD);
                noStroke();
                cx += dotD + dotGap;
            }
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
            this.view3DBtn.label = 'Ẩn 3D';
            bus.emit('FINISH_NARRATION');
        } else {
            model3DViewer.hide();
            this.view3DBtn.label = 'Xem 3D';
        }
    }
}
