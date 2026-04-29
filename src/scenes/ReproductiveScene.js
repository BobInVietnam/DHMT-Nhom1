const ReproNarrationFemale = {
    text: [
        "Hệ sinh dục nữ gồm: buồng trứng, ống dẫn trứng, tử cung, cổ tử cung và âm đạo.",
        "Buồng trứng (2 chiếc) sản xuất trứng (noãn) và tiết hormone estrogen, progesterone.",
        "Ống dẫn trứng dẫn trứng từ buồng trứng về tử cung và là nơi thụ tinh xảy ra.",
        "Tử cung là cơ quan cơ rỗng, là nơi phôi thai làm tổ và phát triển suốt 9 tháng.",
        "Mỗi tháng, một trứng được phóng thích từ buồng trứng – gọi là hiện tượng rụng trứng."
    ],
    sprite: [
        CharacterSprite.TALK, CharacterSprite.EXPL, CharacterSprite.EXPL,
        CharacterSprite.P_EXPL, CharacterSprite.P_TALK
    ]
};

const ReproNarrationMale = {
    text: [
        "Hệ sinh dục nam gồm: tinh hoàn, mào tinh, ống dẫn tinh, túi tinh và dương vật.",
        "Tinh hoàn (2 chiếc) sản xuất tinh trùng và hormone testosterone.",
        "Tinh trùng trưởng thành trong mào tinh, sau đó theo ống dẫn tinh ra ngoài.",
        "Túi tinh và tuyến tiền liệt tiết dịch nuôi dưỡng và bảo vệ tinh trùng.",
        "Mỗi lần xuất tinh có hàng triệu tinh trùng, nhưng chỉ một tinh trùng thụ tinh được."
    ],
    sprite: [
        CharacterSprite.TALK, CharacterSprite.EXPL, CharacterSprite.EXPL,
        CharacterSprite.P_EXPL, CharacterSprite.P_TALK
    ]
};

const ReproNarrationSpermEgg = {
    text: [
        "Trứng là tế bào sinh dục nữ, kích thước lớn nhất trong cơ thể người (~0.1mm).",
        "Tinh trùng là tế bào sinh dục nam, rất nhỏ và có đuôi để bơi nhanh.",
        "Tinh trùng bơi từ âm đạo qua tử cung lên ống dẫn trứng để gặp trứng.",
        "Trong hàng triệu tinh trùng xuất phát, chỉ vài trăm tinh trùng đến được trứng.",
        "Khi một tinh trùng xuyên qua màng trứng, quá trình thụ tinh xảy ra tạo hợp tử.",
        "Hợp tử phân chia thành phôi, di chuyển về tử cung làm tổ và phát triển thành em bé!"
    ],
    sprite: [
        CharacterSprite.TALK, CharacterSprite.EXPL, CharacterSprite.EXPL,
        CharacterSprite.P_EXPL, CharacterSprite.EXPL, CharacterSprite.P_TALK
    ]
};

const ReproNarrationMenstrual = {
    text: [
        "Chu kỳ kinh nguyệt diễn ra mỗi khoảng 28 ngày ở phụ nữ chưa mang thai.",
        "Ngày 1–5: Kinh nguyệt — lớp niêm mạc tử cung bong ra và chảy máu ra ngoài.",
        "Ngày 5–14: Nang trứng phát triển, niêm mạc tử cung dày lên chuẩn bị đón phôi.",
        "Ngày 14: Rụng trứng — trứng chín được phóng thích từ buồng trứng vào ống dẫn trứng."
    ],
    sprite: [
        CharacterSprite.TALK, CharacterSprite.EXPL,
        CharacterSprite.EXPL, CharacterSprite.P_EXPL
    ]
};

const ReproNarrationContraception = {
    text: [
        "Biện pháp tránh thai giúp ngăn ngừa mang thai ngoài ý muốn, bảo vệ sức khỏe sinh sản tuổi vị thành niên.",
        "Bao cao su: ngăn tinh trùng tiếp xúc với trứng, đồng thời phòng ngừa bệnh lây qua đường tình dục.",
        "Thuốc tránh thai hằng ngày: chứa hormone ngăn rụng trứng, cần uống đúng giờ mỗi ngày.",
        "Đặt vòng tránh thai (IUD): dụng cụ đặt trong tử cung, ngăn tinh trùng thụ tinh, hiệu quả nhiều năm.",
        "Nguyên tắc chung: mọi biện pháp đều nhằm ngăn tinh trùng gặp trứng — chỉ khác về cơ chế và thời điểm tác dụng."
    ],
    sprite: [
        CharacterSprite.TALK, CharacterSprite.EXPL, CharacterSprite.P_EXPL,
        CharacterSprite.P_TALK, CharacterSprite.EXPL
    ]
};

const ReproNarrationGame = {
    text: [
        "Hãy đóng vai tinh trùng và vượt qua hành trình gặp trứng!",
        "Dùng phím mũi tên ↑ ↓ để di chuyển tinh trùng lên xuống tránh chướng ngại vật.",
        "Mục tiêu: đến được trứng ở cuối hành trình càng nhanh càng tốt.",
        "Cẩn thận với bạch cầu (WBC) – chúng sẽ tiêu diệt tinh trùng. Bạn có 3 mạng!",
        "Nhấn 'Bắt đầu chơi' khi sẵn sàng. Chúc may mắn!"
    ],
    sprite: [
        CharacterSprite.TALK, CharacterSprite.P_EXPL, CharacterSprite.EXPL,
        CharacterSprite.P_TALK, CharacterSprite.NORM
    ]
};

class ReproductiveScene extends Scene {
    constructor() {
        super();
        this.step   = 0;
        this.gender = "female";

        // Shared UI
        this.narration    = new Narration(980, 380);
        this.narrator     = new Narrator(1000, 660, ReproNarrationFemale);
        this.backBtn      = new Button(80,   40, 130, 40, "← Quay lại",    "SWITCH_SCENE", "BodyMap");
        this.skipBtn      = new Button(1120, 40, 100, 35, "SKIP >>>",       "SWITCH_SCENE", "BodyMap");
        this.nextBtn      = new Button(520, 768, 160, 46, "Tiếp theo →",    "REPRO_NEXT",   null);

        // Step 0 gender toggle
        this.femaleBtn    = new Button(230, 768, 120, 46, "Nữ",            "REPRO_GENDER", "female");
        this.maleBtn      = new Button(360, 768, 120, 46, "Nam",           "REPRO_GENDER", "male");

        // Step 4: start game replaces next
        this.startGameBtn = new Button(380, 768, 210, 46, "Bắt đầu chơi", "REPRO_NEXT",   null);
        this.startGameBtn.hide();

        // Step 5 game HUD buttons
        this.pauseBtn     = new Button(90,  38, 135, 36, "Tạm dừng",      "REPRO_PAUSE",  null);
        this.pauseBtn.hide();
        this.menuBtn      = new Button(600, 520, 210, 50, "Về trang chủ", "SWITCH_SCENE", "BodyMap");
        this.menuBtn.hide();

        this.objects.push(
            this.narration, this.narrator,
            this.backBtn, this.skipBtn, this.nextBtn,
            this.femaleBtn, this.maleBtn,
            this.startGameBtn, this.pauseBtn, this.menuBtn
        );

        this._initGame();

        bus.on("REPRO_NEXT",   () => this.nextStep());
        bus.on("REPRO_GENDER", (g) => this._setGender(g));
        bus.on("REPRO_PAUSE",  () => this._togglePause());
        bus.on("KEY_PRESSED",  (code) => {
            if (this.step === 5 && (code === 32 || code === 80)) this._togglePause();
        });
    }

    _initGame() {
        this.gameState    = "idle";
        this.playerY      = 400;
        this.playerVY     = 0;
        this.worldX       = 0;
        this.GOAL         = 5000;
        this.lives        = 3;
        this.score        = 0;
        this.obstacles    = [];
        this.spawnTimer   = 0;
        this.animFrame    = 0;
        this.hitCooldown  = 0;
        this.winAnimFrame = 0;
    }

    enter() {
        this.step   = 0;
        this.gender = "female";
        this.narrator.show();
        this.narrator.eventData = ReproNarrationFemale;
        bus.emit("FINISH_NARRATION");
        this._syncButtons();
        this._initGame();
        soundManager.loop("skin_ambient");
    }

    exit() {
        soundManager.stopAll();
    }

    nextStep() {
        if (this.step < 5) this.step++;
        bus.emit("FINISH_NARRATION");
        this._syncButtons();
        if (this.step === 1) this.narrator.eventData = ReproNarrationSpermEgg;
        if (this.step === 2) this.narrator.eventData = ReproNarrationMenstrual;
        if (this.step === 3) this.narrator.eventData = ReproNarrationContraception;
        if (this.step === 4) this.narrator.eventData = ReproNarrationGame;
        if (this.step === 5) {
            this._initGame();
            this.gameState = "playing";
            this.narrator.hide();
            bus.emit("FINISH_NARRATION");
        }
    }

    _setGender(g) {
        this.gender = g;
        this.narrator.eventData = g === "female" ? ReproNarrationFemale : ReproNarrationMale;
        bus.emit("FINISH_NARRATION");
    }

    _togglePause() {
        if (this.gameState === "playing") {
            this.gameState = "paused";
            this.pauseBtn.label = "Tiếp tục";
        } else if (this.gameState === "paused") {
            this.gameState = "playing";
            this.pauseBtn.label = "Tạm dừng";
        }
    }

    _syncButtons() {
        // Reset to defaults
        this.backBtn.show(); this.skipBtn.show(); this.nextBtn.show();
        this.femaleBtn.hide(); this.maleBtn.hide();
        this.startGameBtn.hide(); this.pauseBtn.hide(); this.menuBtn.hide();
        this.narrator.show();
        this.nextBtn.x = 380;

        if (this.step === 0) {
            this.femaleBtn.show(); this.maleBtn.show();
            this.nextBtn.x = 520;
        }
        if (this.step === 4) {
            this.nextBtn.hide();
            this.startGameBtn.show();
        }
        if (this.step === 5) {
            this.backBtn.hide(); this.skipBtn.hide();
            this.nextBtn.hide(); this.startGameBtn.hide();
            this.pauseBtn.show();
        }
    }

    draw() {
        this.animFrame++;
        if      (this.step === 0) this._drawOrgans();
        else if (this.step === 1) this._drawSpermEgg();
        else if (this.step === 2) this._drawMenstrualCycle();
        else if (this.step === 3) this._drawContraception();
        else if (this.step === 4) this._drawGameInstructions();
        else                      this._drawGame();
        super.draw();
    }

    // ── Step 0: organ diagram ─────────────────────────────────────────────

    _drawOrgans() {
        background(245, 235, 250);

        push();
        fill(70, 20, 80); noStroke(); textSize(26); textStyle(BOLD); textAlign(CENTER);
        text(this.gender === "female" ? "Hệ sinh dục nữ" : "Hệ sinh dục nam", 380, 50);
        pop();

        // Highlight selected gender button
        push();
        rectMode(CENTER); noStroke();
        fill(this.gender === "female" ? color(220, 160, 255) : color(160, 200, 255));
        let sel = this.gender === "female" ? this.femaleBtn : this.maleBtn;
        rect(sel.x, sel.y, sel.w + 8, sel.h + 8, 14);
        pop();

        if (this.gender === "female") this._drawFemaleOrgans();
        else                          this._drawMaleOrgans();
    }

    _drawFemaleOrgans() {
        const femaleImg = assets.get("repro_female");
        let cx = 360, cy = 370;

        if (femaleImg) {
            push();
            imageMode(CORNER);
            image(femaleImg, 30, 70, 700, 550);
            pop();
        } else {
            push();

            // Fallopian tubes
            stroke(200, 80, 130); strokeWeight(2.5); noFill();
            bezier(cx-60, cy-72,  cx-130, cy-115, cx-195, cy-80, cx-235, cy-58);
            bezier(cx+60, cy-72,  cx+130, cy-115, cx+195, cy-80, cx+235, cy-58);

            // Ovaries
            fill(255, 210, 100); stroke(200, 140, 50); strokeWeight(2);
            ellipse(cx-248, cy-58, 52, 38);
            ellipse(cx+248, cy-58, 52, 38);

            // Uterus body
            fill(255, 175, 200); stroke(180, 60, 110); strokeWeight(2);
            beginShape();
            vertex(cx-62, cy-82); vertex(cx+62, cy-82);
            vertex(cx+92, cy+58); vertex(cx-92, cy+58);
            endShape(CLOSE);

            // Cervix
            fill(240, 140, 172); rect(cx-26, cy+58, 52, 48, 5);

            // Vagina
            fill(255, 160, 195); rect(cx-18, cy+106, 36, 78, 8);

            // Labels
            fill(60, 10, 40); noStroke(); textSize(12); textAlign(CENTER);
            text("Tử cung", cx, cy - 12);
            text("Cổ tử cung", cx, cy + 90);
            text("Âm đạo", cx, cy + 158);
            text("Ống dẫn trứng (T)", cx - 160, cy - 128);
            text("Ống dẫn trứng (P)", cx + 160, cy - 128);
            fill(140, 90, 10); textSize(12);
            text("Buồng trứng (T)", cx - 248, cy - 100);
            text("Buồng trứng (P)", cx + 248, cy - 100);

            pop();
        }

        // Info box
        push();
        applyVietFont();
        fill(255, 242, 255); stroke(180, 80, 155); strokeWeight(1);
        rectMode(CORNER); rect(30, 620, 740, 118, 8);
        fill(70, 15, 55); noStroke(); textSize(12); textAlign(LEFT);
        text("Chức năng: Sản xuất trứng (noãn), tiết estrogen & progesterone,", 42, 640);
        text("là nơi thụ tinh và thai kỳ phát triển trong 9 tháng.", 42, 658);
        text("Chu kỳ kinh nguyệt: ~28 ngày, mỗi chu kỳ phóng 1 trứng từ buồng trứng.", 42, 676);
        text("Bệnh thường gặp: u nang buồng trứng, ung thư cổ tử cung (soi HPV).", 42, 694);
        pop();
    }

    _drawMaleOrgans() {
        const maleImg = assets.get("repro_male");
        let cx = 360, cy = 360;

        if (maleImg) {
            push();
            imageMode(CORNER);
            image(maleImg, 30, 70, 700, 550);
            pop();
        } else {
            push();

            // Testes
            fill(255, 215, 170); stroke(180, 110, 60); strokeWeight(2);
            ellipse(cx-48, cy+138, 72, 82);
            ellipse(cx+48, cy+138, 72, 82);

            // Epididymis (arc on side of testis)
            stroke(150, 80, 40); strokeWeight(1.8); noFill();
            arc(cx-48, cy+128, 84, 92, -PI/2, PI/2);
            arc(cx+48, cy+128, 84, 92,  PI/2, 3*PI/2);

            // Vas deferens rising up
            stroke(180, 100, 50); strokeWeight(2); noFill();
            bezier(cx-12, cy+98, cx-42, cy+58, cx-62, cy,   cx-62, cy-62);
            bezier(cx+12, cy+98, cx+42, cy+58, cx+62, cy,   cx+62, cy-62);
            // join at top
            bezier(cx-62, cy-62, cx-62, cy-92, cx+62, cy-92, cx+62, cy-62);

            // Seminal vesicles
            fill(200, 180, 255); stroke(120, 80, 200); strokeWeight(1.5);
            ellipse(cx-92, cy-112, 58, 36);
            ellipse(cx+92, cy-112, 58, 36);

            // Prostate
            fill(220, 180, 225); stroke(140, 80, 165); strokeWeight(2);
            ellipse(cx, cy-62, 72, 46);

            // Penis / urethra
            fill(255, 205, 165); stroke(180, 110, 60); strokeWeight(2);
            rect(cx-18, cy-222, 36, 162, 8);

            // Labels
            fill(40, 10, 0); noStroke(); textSize(12); textAlign(CENTER);
            text("Tinh hoàn (T)", cx-48, cy+234);
            text("Tinh hoàn (P)", cx+48, cy+234);
            text("Mào tinh (T)", cx-98, cy+110);
            text("Mào tinh (P)", cx+98, cy+110);
            text("Ống dẫn tinh", cx+118, cy-12);
            text("Túi tinh (T)", cx-92, cy-144);
            text("Túi tinh (P)", cx+92, cy-144);
            text("Tuyến tiền liệt", cx, cy-38);
            text("Niệu đạo / Dương vật", cx, cy-244);

            pop();
        }

        // Info box
        push();
        applyVietFont();
        fill(240, 240, 255); stroke(100, 80, 200); strokeWeight(1);
        rectMode(CORNER); rect(30, 620, 740, 118, 8);
        fill(25, 18, 70); noStroke(); textSize(12); textAlign(LEFT);
        text("Chức năng: Sản xuất tinh trùng, tiết testosterone điều hòa giới tính nam.", 42, 640);
        text("Tinh trùng trưởng thành qua mào tinh, được nuôi dưỡng bởi dịch tiết túi tinh.", 42, 658);
        text("Mỗi lần xuất tinh: hàng triệu tinh trùng – hành trình khắc nghiệt bắt đầu.", 42, 676);
        text("Nhiệt độ tinh hoàn thấp hơn thân nhiệt ~2°C giúp tinh trùng phát triển tốt.", 42, 694);
        pop();
    }

    // ── Step 1: Sperm & egg ───────────────────────────────────────────────

    _drawSpermEgg() {
        background(255, 245, 242);

        push();
        fill(100, 20, 60); noStroke(); textSize(26); textStyle(BOLD); textAlign(CENTER);
        text("Trứng và Tinh trùng", 380, 50);
        pop();

        let af = this.animFrame;

        // EGG (left)
        push(); translate(190, 370);
        fill(255, 240, 180, 90); stroke(220, 180, 80); strokeWeight(2); ellipse(0, 0, 185, 185);
        fill(255, 220, 100); stroke(200, 160, 60); strokeWeight(2.5); ellipse(0, 0, 132, 132);
        fill(255, 185, 70); noStroke(); ellipse(0, 0, 58, 58);
        fill(60, 30, 0); noStroke(); textSize(11); textAlign(CENTER);
        text("Zona pellucida", 0, 108);
        text("Tế bào trứng", 0, -30);
        text("Nhân", 0, 20);
        fill(120, 70, 0); textSize(10); text("~0.1 mm", 108, -78);
        pop();
        push(); fill(140, 80, 10); noStroke(); textSize(16); textStyle(BOLD); textAlign(CENTER);
        text("Trứng (Noãn)", 190, 505); pop();

        // SPERM cluster (right)
        push(); translate(510, 370);
        for (let i = 0; i < 8; i++) {
            let a = (i / 8) * TWO_PI + af * 0.018;
            let r = 78 + sin(af * 0.06 + i) * 14;
            this._drawSpermCell(cos(a)*r*0.55, sin(a)*r*0.45, a + PI, af + i*22, 1.0);
        }
        pop();
        push(); fill(20, 60, 140); noStroke(); textSize(16); textStyle(BOLD); textAlign(CENTER);
        text("Tinh trùng", 510, 505); pop();

        // Animated arrow
        push();
        stroke(150, 100, 210); strokeWeight(2); fill(150, 100, 210);
        for (let i = 0; i < 5; i++) {
            let t = ((af * 2 + i * 22) % 100) / 100.0;
            let ax = lerp(295, 385, t);
            noFill(); stroke(150, 100, 210, 220 - t*220);
            line(ax, 370, ax+14, 370);
        }
        fill(150, 100, 210); noStroke();
        triangle(400, 370, 385, 362, 385, 378);
        pop();

        // Info panel
        push();
        applyVietFont();
        fill(255, 245, 255); stroke(150, 100, 200); strokeWeight(1);
        rectMode(CORNER); rect(30, 168, 690, 140, 8);
        fill(60, 20, 80); noStroke(); textSize(13); textAlign(LEFT);
        let lines = [
            "Trứng: tế bào lớn nhất cơ thể, không di chuyển, chứa cytoplasm nuôi phôi.",
            "Tinh trùng: tế bào nhỏ nhất, có đầu (chứa DNA) và đuôi dài (để bơi).",
            "Hành trình thụ tinh: tinh trùng bơi qua âm đạo → tử cung → ống dẫn trứng.",
            "Khi gặp trứng: tinh trùng giải phóng enzyme phân hủy màng trứng → thụ tinh.",
            "Hợp tử (zygote) hình thành → phân chia → phôi → di chuyển về tử cung làm tổ."
        ];
        for (let i = 0; i < lines.length; i++) text(lines[i], 42, 188 + i*24);
        pop();

        this._drawFertilizationPath();
    }

    _drawFertilizationPath() {
        const waypoints = [
            { x: 42,  label: "Buồng trứng" },
            { x: 202, label: "Ống dẫn trứng" },
            { x: 380, label: "Thụ tinh" },
            { x: 558, label: "Hợp tử" },
            { x: 718, label: "Làm tổ ở\ntử cung" }
        ];
        const y = 555;

        let idx = this.narration.currentIndex;
        let active = idx <= 3 ? idx : 4;

        push();

        // Section header
        fill(100, 20, 60); noStroke(); textSize(14); textStyle(BOLD); textAlign(CENTER);
        text("Hành trình thụ tinh", 380, 530);
        textStyle(NORMAL);

        // Connecting lines
        stroke(180, 140, 210); strokeWeight(2);
        for (let i = 0; i < waypoints.length - 1; i++) {
            line(waypoints[i].x, y, waypoints[i+1].x, y);
        }

        // Waypoint circles + labels
        for (let i = 0; i < waypoints.length; i++) {
            let wp = waypoints[i];
            let isActive = i === active;
            let r = isActive ? 18 + sin(this.animFrame * 0.12) * 4 : 18;

            fill(isActive ? color(255, 180, 80) : color(220, 200, 230));
            stroke(150, 100, 180); strokeWeight(2);
            ellipse(wp.x, y, r * 2, r * 2);

            fill(60, 20, 50); noStroke(); textSize(12); textAlign(CENTER);
            text(wp.label, wp.x, y + 30);
        }

        pop();
    }

    _drawSpermCell(x, y, angle, frame, scale) {
        push(); translate(x, y); rotate(angle);
        stroke(60, 100, 200); strokeWeight(1.5 * scale); noFill();
        beginShape();
        for (let i = 0; i <= 40; i++)
            vertex(-i*2.5*scale, sin(i*0.4 + frame*0.12)*5*scale*(i/40.0));
        endShape();
        fill(80, 130, 220); noStroke();
        ellipse(0, 0, 16*scale, 11*scale);
        fill(120, 170, 255);
        ellipse(6*scale, 0, 8*scale, 7*scale);
        pop();
    }

    // ── Step 2: menstrual cycle ───────────────────────────────────────────

    _drawMenstrualCycle() {
        background(255, 242, 248);

        push();
        fill(100, 20, 60); noStroke(); textSize(26); textStyle(BOLD); textAlign(CENTER);
        text("Chu kỳ kinh nguyệt", 380, 50);
        textStyle(NORMAL);
        pop();

        const cx = 380, cy = 410;
        const dayAngle = TWO_PI / 28;

        push();
        // Phase 1: days 1–5 (menstruation) — red
        noFill(); stroke(200, 50, 80); strokeWeight(80);
        arc(cx, cy, 340, 340, -HALF_PI, -HALF_PI + 5 * dayAngle, OPEN);

        // Phase 2: days 5–14 (follicular) — amber
        stroke(220, 160, 50); strokeWeight(80);
        arc(cx, cy, 340, 340, -HALF_PI + 5 * dayAngle, -HALF_PI + 14 * dayAngle, OPEN);

        // Phase 3: days 14–27 (luteal) — green
        stroke(60, 150, 110); strokeWeight(80);
        arc(cx, cy, 340, 340, -HALF_PI + 14 * dayAngle, -HALF_PI + 27 * dayAngle, OPEN);

        // Ovulation marker at day 14 — pulsing circle
        let ovAngle = -HALF_PI + 14 * dayAngle;
        let ovR = 8 + sin(this.animFrame * 0.1) * 3;
        fill(255, 230, 50); stroke(200, 160, 20); strokeWeight(2);
        ellipse(cx + cos(ovAngle) * 170, cy + sin(ovAngle) * 170, ovR * 2, ovR * 2);
        pop();

        // 28 tick marks on outer ring
        push();
        stroke(80, 20, 50); strokeWeight(1);
        for (let i = 0; i < 28; i++) {
            let a = -HALF_PI + i * dayAngle;
            line(cx + cos(a) * 215, cy + sin(a) * 215,
                 cx + cos(a) * 220, cy + sin(a) * 220);
        }
        pop();

        // Animated day indicator
        push();
        let indAngle = -HALF_PI + ((this.animFrame * 1.2) % 360) * PI / 180;
        fill(255, 255, 255); stroke(80, 20, 50); strokeWeight(2);
        ellipse(cx + cos(indAngle) * 170, cy + sin(indAngle) * 170, 14, 14);
        pop();

        // Phase labels
        push();
        fill(60, 20, 40); noStroke(); textSize(12); textAlign(CENTER);
        text("Kinh nguyệt\n(ngày 1–5)",               cx - 230, cy - 160);
        text("Niêm mạc dày lên\n(ngày 5–14)",         cx + 260, cy - 60);
        text("Rụng trứng\n(ngày 14)",                  cx + 225, cy + 100);
        text("Niêm mạc tiếp tục\nphát triển (14–27)", cx - 255, cy + 100);
        pop();

        // Info box
        push();
        applyVietFont();
        fill(255, 235, 245); stroke(180, 80, 130); strokeWeight(1);
        rectMode(CORNER); rect(30, 655, 740, 90, 8);
        fill(70, 15, 55); noStroke(); textSize(13); textAlign(CENTER);
        text("Chu kỳ trung bình: 28 ngày  |  Rụng trứng: ngày 14  |  Kinh nguyệt: ngày 1–5", 400, 688);
        pop();
    }

    // ── Step 3: contraception ─────────────────────────────────────────────

    _drawContraception() {
        background(255, 248, 255);

        push();
        fill(100, 20, 60); noStroke(); textSize(26); textStyle(BOLD); textAlign(CENTER);
        text("Biện pháp tránh thai", 395, 50);
        textStyle(NORMAL);
        pop();

        const cards = [
            { cx: 210, cy: 210, iconDY: -48, labelDY: 38, line1DY: 54, line2DY: 69,
              bg: [220, 235, 255], border: [80, 120, 200],
              label: "Bao cao su",                 labelColor: [45, 75, 160],
              line1: "Ngăn tinh trùng tiếp xúc trứng",
              line2: "Phòng bệnh lây qua đường tình dục", bodyColor: [35, 60, 130] },
            { cx: 580, cy: 210, iconDY: -52, labelDY: 38, line1DY: 54, line2DY: 69,
              bg: [255, 228, 244], border: [200, 80, 130],
              label: "Thuốc tránh thai hằng ngày", labelColor: [160, 28, 78],
              line1: "Hormone ngăn rụng trứng",
              line2: "Uống đúng giờ mỗi ngày",         bodyColor: [130, 18, 62] },
            { cx: 210, cy: 490, iconDY: -40, labelDY: 20, line1DY: 36, line2DY: 51,
              bg: [220, 255, 232], border: [50, 160, 90],
              label: "Đặt vòng tránh thai (IUD)",  labelColor: [28, 108, 58],
              line1: "Dụng cụ trong tử cung ngăn thụ tinh",
              line2: "Hiệu quả nhiều năm",             bodyColor: [18, 82, 44] },
            { cx: 580, cy: 490, iconDY: -38, labelDY: 20, line1DY: 36, line2DY: 51,
              bg: [255, 246, 215], border: [200, 145, 40],
              label: "Thuốc tránh thai khẩn cấp",  labelColor: [158, 98, 10],
              line1: "Dùng trong 72h sau quan hệ",
              line2: "Ngăn rụng trứng hoặc thụ tinh",  bodyColor: [128, 78, 8] },
        ];

        // Card backgrounds (batched)
        push();
        rectMode(CENTER);
        for (let c of cards) {
            fill(...c.bg); stroke(...c.border); strokeWeight(1.5);
            rect(c.cx, c.cy, 356, 270, 10);
        }
        pop();

        // Icons (each needs its own coordinate space)
        push(); translate(cards[0].cx, cards[0].cy + cards[0].iconDY);
        fill(100, 155, 230); stroke(60, 100, 185); strokeWeight(2);
        rectMode(CENTER); rect(0, 12, 38, 72, 18, 18, 6, 6);
        fill(145, 192, 255); noStroke(); ellipse(0, -26, 30, 18);
        stroke(60, 100, 185); strokeWeight(1.5); noFill(); arc(0, 50, 38, 16, 0, PI);
        pop();

        push(); translate(cards[1].cx, cards[1].cy + cards[1].iconDY);
        for (let r = 0; r < 4; r++)
            for (let c = 0; c < 7; c++) { fill(220, 70, 120); noStroke(); ellipse(-48 + c*16, -24 + r*16, 12, 12); }
        stroke(175, 48, 98); strokeWeight(1.5); noFill(); rectMode(CENTER); rect(0, 0, 120, 68, 6);
        pop();

        push(); translate(cards[2].cx, cards[2].cy + cards[2].iconDY);
        stroke(38, 138, 78); strokeWeight(2.5); noFill(); ellipse(0, -6, 66, 66);
        strokeWeight(3); line(-24, -6, 24, -6); line(0, -6, 0, 30);
        pop();

        push(); translate(cards[3].cx, cards[3].cy + cards[3].iconDY);
        fill(255, 195, 55); stroke(195, 132, 18); strokeWeight(2); ellipse(0, 0, 48, 74);
        fill(200, 132, 18); noStroke(); rectMode(CENTER); rect(0, -10, 7, 24, 3); ellipse(0, 20, 8, 8);
        pop();

        // Card labels
        for (let c of cards) {
            push();
            fill(...c.labelColor); noStroke(); textSize(13); textStyle(BOLD); textAlign(CENTER);
            text(c.label, c.cx, c.cy + c.labelDY);
            textStyle(NORMAL); textSize(11); fill(...c.bodyColor);
            text(c.line1, c.cx, c.cy + c.line1DY);
            text(c.line2, c.cx, c.cy + c.line2DY);
            pop();
        }

        // Bottom info bar
        push();
        applyVietFont();
        fill(255, 235, 248); stroke(180, 80, 130); strokeWeight(1);
        rectMode(CORNER); rect(30, 645, 740, 52, 8);
        fill(80, 20, 55); noStroke(); textSize(12); textAlign(CENTER);
        text("Mọi biện pháp đều nhằm ngăn tinh trùng gặp trứng — chỉ khác về cơ chế và thời điểm tác dụng.", 400, 675);
        pop();
    }

    // ── Step 4: game instructions ─────────────────────────────────────────

    _drawGameInstructions() {
        background(255, 242, 248);

        push();
        fill(100, 20, 60); noStroke(); textSize(26); textStyle(BOLD); textAlign(CENTER);
        text("Hướng dẫn trò chơi", 380, 50);
        pop();

        // Animated sperm
        push(); translate(620, 380);
        this._drawSpermCell(0, 0, 0, this.animFrame, 3.0);
        pop();

        // Rules box
        push();
        fill(255, 245, 252); stroke(180, 60, 120); strokeWeight(2);
        rectMode(CORNER); rect(30, 82, 560, 500, 12);

        fill(80, 10, 45); noStroke(); textSize(20); textStyle(BOLD); textAlign(CENTER);
        text("Luật chơi", 310, 118);
        textStyle(NORMAL); textSize(14); textAlign(LEFT);

        let rules = [
            ["Điều khiển", "Phím lên / xuống để di chuyển tinh trùng"],
            ["Mục tiêu",   "Bơi đến trứng ở cuối hành trình"],
            ["Chướng ngại","Tránh bạch cầu (WBC) – va chạm mất 1 mạng"],
            ["Mạng sống",  "Có 3 mạng – mất hết là thua"],
            ["Tạm dừng",   "Nhấn phím P hoặc nút Tạm dừng để dừng game"],
            ["Điểm số",    "Mỗi mét đi được cộng thêm điểm"],
        ];
        for (let i = 0; i < rules.length; i++) {
            let y = 158 + i * 62;
            fill(160, 40, 80); textSize(13); textStyle(BOLD);
            text(rules[i][0] + ":", 52, y);
            fill(50, 10, 32); textStyle(NORMAL);
            text(rules[i][1], 52, y + 20);
        }
        pop();
    }

    // ── Step 5: sperm game ────────────────────────────────────────────────

    _drawGame() {
        background(255, 232, 242);

        // uterus wall texture
        stroke(255, 185, 215); strokeWeight(0.8); noFill();
        for (let y = -40; y < height + 40; y += 38)
            line(0, y + (this.worldX * 0.08) % 38, width, y + (this.worldX * 0.08) % 38);

        if (this.gameState === "playing") this._updateGame();

        // Goal egg
        let eggSX = this.GOAL - this.worldX + 200;
        if (eggSX < width + 120) {
            let pulse = sin(this.animFrame * 0.1) * 9;
            fill(255, 245, 90, 100); noStroke(); ellipse(eggSX, this.playerY, 165+pulse, 165+pulse);
            fill(255, 225, 80); stroke(200, 160, 50); strokeWeight(3);
            ellipse(eggSX, this.playerY, 112, 112);
            fill(255, 185, 65); noStroke(); ellipse(eggSX, this.playerY, 52, 52);
            fill(80, 40, 0); textSize(13); textAlign(CENTER); text("TRỨNG", eggSX, this.playerY + 72);
        }

        // Obstacles (WBC)
        for (let o of this.obstacles) {
            let osx = o.x - this.worldX + 200;
            fill(o.hit ? color(255,90,90) : color(160,75,225)); stroke(100,40,165); strokeWeight(2);
            ellipse(osx, o.y, o.r*2, o.r*2);
            fill(210, 160, 255); noStroke(); ellipse(osx, o.y, o.r*0.75, o.r*0.75);
            fill(255, 245, 255); textSize(9); textAlign(CENTER); text("WBC", osx, o.y + 3);
        }

        // Player sperm
        push(); translate(200, this.playerY);
        if (!(this.hitCooldown > 0 && Math.floor(this.hitCooldown / 5) % 2 === 1)) {
            this._drawSpermCell(0, 0, 0, this.animFrame, 2.4);
        }
        pop();

        this._drawGameHUD();

        if (this.gameState === "paused")   this._drawPauseOverlay();
        if (this.gameState === "gameover") this._drawGameOverOverlay();
        if (this.gameState === "win")      this._drawWinOverlay();
        if (this.gameState === "winning")  this._drawCellDivisionAnimation();
    }

    _updateGame() {
        if (this.hitCooldown > 0) this.hitCooldown--;

        if (keyIsDown(UP_ARROW)   || keyIsDown(87)) this.playerVY -= 0.65;
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) this.playerVY += 0.65;
        this.playerVY *= 0.83;
        this.playerY = constrain(this.playerY + this.playerVY, 28, height - 28);

        this.worldX += 3;
        this.score   = Math.floor(this.worldX / 10);

        this.spawnTimer++;
        if (this.spawnTimer > 68) {
            this.spawnTimer = 0;
            let oy = random(55, height - 55);
            if (abs(oy - this.playerY) > 55) {
                this.obstacles.push({ x: this.worldX + width + 60, y: oy, r: random(20, 38), hit: false });
            }
        }

        this.obstacles = this.obstacles.filter(o => (o.x - this.worldX) > -120);

        if (this.hitCooldown === 0) {
            for (let o of this.obstacles) {
                let osx = o.x - this.worldX + 200;
                if (dist(200, this.playerY, osx, o.y) < o.r + 13) {
                    o.hit = true;
                    this.lives--;
                    soundManager.play("narration_open");
                    this.hitCooldown = 90;
                    if (this.lives <= 0) { this.gameState = "gameover"; this.menuBtn.show(); }
                    break;
                }
            }
        }

        if (this.worldX >= this.GOAL) {
            this.gameState = "winning";
            this.winAnimFrame = 0;
            soundManager.play("model_load");
        }
    }

    _drawGameHUD() {
        push(); rectMode(CORNER); noStroke();
        // Distance bar background
        fill(255, 200, 225, 210); stroke(200, 100, 155); strokeWeight(1);
        rect(240, 12, 500, 22, 5);
        // Fill
        let prog = constrain(this.worldX / this.GOAL, 0, 1);
        fill(225, 75, 140); noStroke(); rect(240, 12, 500 * prog, 22, 5);
        fill(80, 10, 42); textSize(12); textAlign(LEFT);
        text("Quãng đường: " + Math.floor(prog*100) + "%", 248, 28);

        // Lives
        textSize(18); textAlign(LEFT);
        for (let i = 0; i < 3; i++) {
            fill(i < this.lives ? color(220,38,78) : color(185,185,185));
            text("v", 758 + i*26, 34);
        }

        // Score
        fill(80, 10, 42); textSize(13); textAlign(RIGHT);
        text("Điểm: " + this.score, 1185, 34);
        pop();
    }

    _drawPauseOverlay() {
        push();
        fill(0, 0, 0, 145); noStroke(); rectMode(CORNER); rect(0, 0, width, height);
        fill(255); textSize(42); textStyle(BOLD); textAlign(CENTER);
        text("TẠM DỪNG", width/2, height/2 - 18);
        textSize(16); textStyle(NORMAL);
        text("Nhấn P hoặc nút Tiếp tục để chơi tiếp", width/2, height/2 + 30);
        pop();
    }

    _drawGameOverOverlay() {
        push();
        fill(0, 0, 0, 160); noStroke(); rectMode(CORNER); rect(0, 0, width, height);
        fill(255, 75, 75); textSize(52); textStyle(BOLD); textAlign(CENTER);
        text("THUA CUỘC!", width/2, height/2 - 65);
        fill(255); textSize(18); textStyle(NORMAL);
        text("Tinh trùng đã bị bạch cầu tiêu diệt!", width/2, height/2 - 15);
        text("Điểm: " + this.score, width/2, height/2 + 22);
        pop();
    }

    _drawWinOverlay() {
        push();
        fill(0, 0, 0, 145); noStroke(); rectMode(CORNER); rect(0, 0, width, height);
        fill(255, 225, 75); textSize(52); textStyle(BOLD); textAlign(CENTER);
        text("THÀNH CÔNG!", width/2, height/2 - 65);
        fill(255); textSize(18); textStyle(NORMAL);
        text("Tinh trùng đã đến được trứng!", width/2, height/2 - 15);
        text("Điểm: " + this.score, width/2, height/2 + 22);
        fill(255, 240, 150); textSize(14); textStyle(NORMAL);
        text("Hợp tử phân chia thành phôi và làm tổ trong tử cung.", width/2, height/2 + 55);
        pop();
    }

    _drawCellDivisionAnimation() {
        this.winAnimFrame++;
        const t = this.winAnimFrame / 180;

        push();
        fill(0, 0, 0, 160); noStroke();
        rect(0, 0, width, height);
        pop();

        const cx = width / 2, cy = height / 2;

        if (t < 0.33) {
            // Phase 1: single zygote, pulsing
            let r = 38 + sin(this.animFrame * 0.15) * 6;
            fill(255, 230, 100); stroke(200, 160, 40); strokeWeight(2);
            ellipse(cx, cy, r * 2, r * 2);
            fill(255, 200, 60); noStroke();
            ellipse(cx, cy, r * 0.9, r * 0.9);

        } else if (t < 0.55) {
            // Phase 2: 2 cells
            fill(255, 220, 110); stroke(200, 155, 40); strokeWeight(2);
            ellipse(cx - 28, cy, 58, 58);
            ellipse(cx + 28, cy, 58, 58);
            stroke(200, 155, 40); strokeWeight(1);
            line(cx, cy - 29, cx, cy + 29);

        } else if (t < 0.72) {
            // Phase 3: 4 cells
            fill(255, 215, 120); stroke(195, 150, 38); strokeWeight(2);
            for (let angle of [0, HALF_PI, PI, 3 * HALF_PI]) {
                ellipse(cx + cos(angle) * 25, cy + sin(angle) * 25, 46, 46);
            }

        } else if (t < 0.9) {
            // Phase 4: 8 cells drifting toward uterus silhouette
            const drift = map(t, 0.72, 0.9, 0, 140);
            fill(255, 210, 130); stroke(190, 145, 36); strokeWeight(1.5);
            for (let i = 0; i < 8; i++) {
                let a = (i / 8) * TWO_PI;
                ellipse(cx + drift + cos(a) * 20, cy + sin(a) * 20, 30, 30);
            }
            // Uterus silhouette
            let ux = cx + 200;
            noFill(); stroke(255, 160, 200); strokeWeight(3);
            beginShape();
            vertex(ux - 45, cy + 60); vertex(ux - 60, cy - 40);
            vertex(ux - 20, cy - 80); vertex(ux + 20, cy - 80);
            vertex(ux + 60, cy - 40); vertex(ux + 45, cy + 60);
            endShape();
            fill(255, 200, 220, 60); noStroke();
            ellipse(ux, cy - 10, 110, 130);

        } else {
            // Phase 5: transition to win overlay
            this.gameState = "win";
            this.menuBtn.show();
        }

        fill(255, 240, 200); noStroke(); textSize(15); textAlign(CENTER);
        text("Hợp tử phân chia thành phôi, di chuyển về tử cung làm tổ — sự sống bắt đầu!", cx, cy + 130);
    }
}
