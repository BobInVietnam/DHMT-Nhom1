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

const REPRO_ORGANS_F = [
    { id:'f_buong_trung', label:'Buồng trứng', x:112, y:312, r:28,
      color:'#ffd264',
      desc:'Sản xuất trứng (noãn) và tiết hormone estrogen, progesterone. Mỗi tháng phóng thích 1 trứng chín.',
      sgk:'Bài 39, tr.163', pron:'buồng trứng [buo̩ŋ tʂúŋ]' },
    { id:'f_ong_dan_trung', label:'Ống dẫn trứng', x:200, y:255, r:22,
      color:'#f7b8d6',
      desc:'Dẫn trứng từ buồng trứng về tử cung. Thụ tinh thường xảy ra tại đây.',
      sgk:'Bài 39, tr.163', pron:'ống dẫn trứng' },
    { id:'f_tu_cung', label:'Tử cung', x:360, y:358, r:30,
      color:'#ffafc8',
      desc:'Cơ quan cơ rỗng, nơi phôi thai làm tổ và phát triển suốt 9 tháng. Lót bên trong là niêm mạc tử cung.',
      sgk:'Bài 39, tr.163', pron:'tử cung [tɨ̌ kuŋ]' },
    { id:'f_co_tu_cung', label:'Cổ tử cung', x:360, y:442, r:20,
      color:'#e88faa',
      desc:'Phần cổ của tử cung nối với âm đạo. Đây là vị trí sàng lọc HPV phòng ngừa ung thư cổ tử cung.',
      sgk:'Bài 39, tr.163', pron:'cổ tử cung' },
    { id:'f_am_dao', label:'Âm đạo', x:360, y:520, r:20,
      color:'#ffc8dc',
      desc:'Kênh dẫn từ tử cung ra ngoài, là đường ra của kinh nguyệt và đường sinh của thai nhi.',
      sgk:'Bài 39, tr.164', pron:'âm đạo' },
];

const REPRO_ORGANS_M = [
    { id:'m_tinh_hoan', label:'Tinh hoàn', x:360, y:498, r:30,
      color:'#ffd7a8',
      desc:'Sản xuất tinh trùng và tiết hormone testosterone. Nhiệt độ thấp hơn thân nhiệt ~2°C giúp tinh trùng phát triển tốt.',
      sgk:'Bài 39, tr.165', pron:'tinh hoàn [tiŋ hwa̰n]' },
    { id:'m_mao_tinh', label:'Mào tinh', x:252, y:460, r:22,
      color:'#e8c078',
      desc:'Nơi tinh trùng trưởng thành và được lưu trữ trong 2–3 tuần trước khi xuất tinh.',
      sgk:'Bài 39, tr.165', pron:'mào tinh' },
    { id:'m_ong_dan_tinh', label:'Ống dẫn tinh', x:478, y:348, r:22,
      color:'#c8b4f0',
      desc:'Dẫn tinh trùng từ mào tinh lên túi tinh và ra ngoài cùng dịch tiết.',
      sgk:'Bài 39, tr.165', pron:'ống dẫn tinh' },
    { id:'m_tui_tinh', label:'Túi tinh', x:268, y:248, r:22,
      color:'#c8b4f0',
      desc:'Tiết dịch kiềm giàu fructose để nuôi dưỡng và bảo vệ tinh trùng trong đường sinh dục nữ.',
      sgk:'Bài 39, tr.165', pron:'túi tinh' },
    { id:'m_tuyen_tien_liet', label:'Tuyến tiền liệt', x:360, y:298, r:26,
      color:'#dcb4e0',
      desc:'Tiết dịch kiềm giúp trung hòa môi trường acid trong niệu đạo, bảo vệ và tăng khả năng sống của tinh trùng.',
      sgk:'Bài 39, tr.165', pron:'tuyến tiền liệt' },
];

const REPRO_ORGAN_GATE = 4;

class ReproductiveScene extends Scene {
    constructor() {
        super();
        this.step          = 0;
        this.gender        = "female";
        this.selectedOrgan = null;
        this.seenOrgans    = new Set();
        this.cycleDay      = 1;

        // Shared UI
        this.narration    = new Narration(530, 390);
        this.narration.setSize(520, 200);
        this.narrator     = new Narrator(980, 390, ReproNarrationFemale);
        this._modalOpen   = false;
        this.backBtn      = new Button(80,   40, 130, 40, "← Quay lại",    "SWITCH_SCENE", "BodyMap");
        this.skipBtn      = new Button(1120, 40, 100, 35, "SKIP >>>",       "SWITCH_SCENE", "BodyMap");
        this.nextBtn      = new Button(520, 730, 160, 46, "Tiếp theo →",    "REPRO_NEXT",   null);

        // Step 0 gender toggle (left-edge of group at x=230 per design; Button uses rectMode CENTER)
        this.femaleBtn    = new Button(290, 730, 120, 46, "♀ Nữ",         "REPRO_GENDER", "female");
        this.maleBtn      = new Button(410, 730, 120, 46, "♂ Nam",        "REPRO_GENDER", "male");

        // Step 4: start game replaces next
        this.startGameBtn = new Button(380, 730, 210, 46, "Bắt đầu chơi", "REPRO_NEXT",   null);
        this.startGameBtn.hide();

        // Step 5 game HUD buttons
        this.pauseBtn     = new Button(90,  38, 135, 36, "Tạm dừng",      "REPRO_PAUSE",  null);
        this.pauseBtn.hide();
        this.menuBtn      = new Button(600, 520, 210, 50, "Về trang chủ", "SWITCH_SCENE", "BodyMap");
        this.menuBtn.hide();

        this.objects.push(
            this.narrator, this.narration,
            this.backBtn, this.skipBtn, this.nextBtn,
            this.femaleBtn, this.maleBtn,
            this.startGameBtn, this.pauseBtn, this.menuBtn
        );

        this._initGame();

        bus.on("REPRO_NEXT",   () => this.nextStep());
        bus.on("REPRO_GENDER", (g) => this._setGender(g));
        bus.on("REPRO_PAUSE",  () => this._togglePause());
        bus.on("FINISH_NARRATION", () => {
            if (this._modalOpen) {
                this._modalOpen = false;
                this.narrator.hide();
                this._syncButtons();
            }
        });
        bus.on("KEY_PRESSED",  (code) => {
            if (this.step === 5 && (code === 32 || code === 80)) this._togglePause();
        });
    }

    _initGame() {
        this.gameState    = "idle";
        this.playerY      = 400;
        this.playerVY     = 0;
        this.worldX       = 0;
        this.GOAL         = 4000;
        this.lives        = 3;
        this.score        = 0;
        this.obstacles    = [];
        this.spawnTimer   = 0;
        this.animFrame    = 0;
        this.hitCooldown  = 0;
        this.winAnimFrame = 0;
    }

    enter() {
        this.step          = 0;
        this.gender        = "female";
        this.selectedOrgan = null;
        this.seenOrgans    = new Set();
        this.cycleDay      = 1;
        this._modalOpen    = false;
        this.narrator.show();
        this.narrator.eventData = ReproNarrationFemale;
        bus.emit("SHOW_NARRATION", ReproNarrationFemale);
        this._modalOpen = true;
        this._syncButtons();
        this._initGame();
        soundManager.loop("repro_ambient");
    }

    exit() {
        soundManager.stopAll();
    }

    nextStep() {
        if (this.step < 5) this.step++;
        if (this.step === 1) {
            this.narrator.show();
            bus.emit("SHOW_NARRATION", ReproNarrationSpermEgg);
            this._modalOpen = true;
        } else if (this.step === 2) {
            this.narrator.show();
            bus.emit("SHOW_NARRATION", ReproNarrationMenstrual);
            this._modalOpen = true;
        } else if (this.step === 3) {
            this.narrator.show();
            bus.emit("SHOW_NARRATION", ReproNarrationContraception);
            this._modalOpen = true;
        } else if (this.step === 4) {
            this.narrator.show();
            bus.emit("SHOW_NARRATION", ReproNarrationGame);
            this._modalOpen = true;
        } else if (this.step === 5) {
            this._initGame();
            this.gameState = "playing";
            this.narrator.hide();
            bus.emit("FINISH_NARRATION");
        }
        this._syncButtons();
    }

    _setGender(g) {
        if (this._modalOpen) return;
        this.gender = g;
        const content = g === "female" ? ReproNarrationFemale : ReproNarrationMale;
        this.narrator.eventData = content;
        this.narrator.show();
        bus.emit("SHOW_NARRATION", content);
        this._modalOpen = true;
        this._syncButtons();
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
        if (this._modalOpen) {
            this.nextBtn.hide();
            this.femaleBtn.hide(); this.maleBtn.hide();
            this.startGameBtn.hide(); this.pauseBtn.hide(); this.menuBtn.hide();
            return;
        }
        // Reset to defaults
        this.backBtn.show(); this.skipBtn.show(); this.nextBtn.show();
        this.femaleBtn.hide(); this.maleBtn.hide();
        this.startGameBtn.hide(); this.pauseBtn.hide(); this.menuBtn.hide();
        this.nextBtn.x = 600;

        if (this.step === 0) {
            this.femaleBtn.show(); this.maleBtn.show();
            if (this.seenOrgans.size >= REPRO_ORGAN_GATE) this.nextBtn.show();
            else this.nextBtn.hide();
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

    checkClick() {
        if (this._modalOpen) {
            super.checkClick();
            return;
        }
        if (this.step === 0) {
            const organs = this.gender === "female" ? REPRO_ORGANS_F : REPRO_ORGANS_M;
            for (const o of organs) {
                if (dist(mouseX, mouseY, o.x, o.y) <= o.r + 8) {
                    this.selectedOrgan = o;
                    this.seenOrgans.add(o.id);
                    this._syncButtons();
                    return;
                }
            }
        }
        if (this.step === 2 && this._isInSliderArea(mouseX, mouseY)) {
            this._updateCycleDayFromX(mouseX);
            return;
        }
        if (this.step === 5 && this.gameState === "win") {
            const cw = 560, ch = 300, cx = (width - cw) / 2, cy = (height - ch) / 2;
            if (mouseX >= cx + cw/2 - 120 && mouseX <= cx + cw/2 + 120 &&
                mouseY >= cy + ch - 62    && mouseY <= cy + ch - 20) {
                bus.emit("SWITCH_SCENE", "BodyMap");
                return;
            }
        }
        super.checkClick();
    }

    checkMouseDragged() {
        if (this._modalOpen) return;
        if (this.step === 2 && mouseIsPressed && this._isInSliderArea(mouseX, mouseY)) {
            this._updateCycleDayFromX(mouseX);
        }
    }

    _isInSliderArea(mx, my) {
        return mx >= 30 && mx <= 730 && my >= 625 && my <= 675;
    }

    _updateCycleDayFromX(mx) {
        this.cycleDay = Math.round(constrain(map(mx, 50, 710, 1, 28), 1, 28));
    }

    draw() {
        this.animFrame++;
        if      (this.step === 0) this._drawOrgans();
        else if (this.step === 1) this._drawSpermEgg();
        else if (this.step === 2) this._drawMenstrualCycle();
        else if (this.step === 3) this._drawContraception();
        else if (this.step === 4) this._drawGameInstructions();
        else                      this._drawGame();
        if (this._modalOpen) {
            push();
            noStroke(); fill(0, 0, 0, 165);
            rectMode(CORNER); rect(0, 0, width, height);
            pop();
        }
        if (this.step < 5) this._drawStepDots(6, this.step);
        super.draw();
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

        this._drawOrganHotspots(REPRO_ORGANS_F);
        this._drawOrganInfoPanel();
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

        this._drawOrganHotspots(REPRO_ORGANS_M);
        this._drawOrganInfoPanel();
    }

    _drawOrganHotspots(organs) {
        push();
        for (const o of organs) {
            const sel  = this.selectedOrgan && this.selectedOrgan.id === o.id;
            const seen = this.seenOrgans.has(o.id);
            const c    = color(o.color);
            // Drop shadow for selected pin
            if (sel) {
                noStroke(); fill(0, 0, 0, 40);
                ellipse(o.x + 2, o.y + 2, o.r * 2 + 6, o.r * 2 + 6);
            }
            // Pin circle
            fill(sel ? c : lerpColor(c, color(255), 0.35));
            stroke(sel ? color(60, 20, 80) : color(100, 60, 120));
            strokeWeight(sel ? 2.5 : 1.5);
            ellipse(o.x, o.y, o.r * 2, o.r * 2);
            // Check mark if seen
            if (seen) {
                fill(255); noStroke(); textSize(13); textStyle(BOLD); textAlign(CENTER);
                applyVietFont();
                text('✓', o.x, o.y + 5);
            }
            // Label with white outline for legibility
            noStroke(); textSize(13); textStyle(sel ? BOLD : NORMAL); textAlign(CENTER);
            applyVietFont();
            fill(255, 255, 255, 200);
            for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1]])
                text(o.label, o.x + dx, o.y - o.r - 6 + dy);
            fill(sel ? color(60, 20, 80) : color(90, 40, 110));
            text(o.label, o.x, o.y - o.r - 6);
        }
        // Progress indicator
        fill(80, 30, 100); noStroke(); textSize(13); textStyle(NORMAL); textAlign(LEFT);
        applyVietFont();
        text('Đã khám phá: ' + this.seenOrgans.size + ' / ' + (REPRO_ORGANS_F.length + REPRO_ORGANS_M.length) +
             '  (cần ' + REPRO_ORGAN_GATE + ' để tiếp tục)', 34, 675);
        pop();
    }

    _drawOrganInfoPanel() {
        const px = 780, py = 90, pw = 400, ph = 420;
        push();
        rectMode(CORNER);
        const isFemale = this.gender === "female";

        if (this.selectedOrgan) {
            const o = this.selectedOrgan;
            const bc = isFemale ? color(255, 235, 255) : color(235, 235, 255);
            const sc = isFemale ? color(180, 80, 155)  : color(100, 80, 200);
            const oc = color(o.color);

            // Panel shadow
            noStroke(); fill(0, 0, 0, 20);
            rect(px + 3, py + 3, pw, ph, 10);

            fill(bc); stroke(sc); strokeWeight(1.5);
            rect(px, py, pw, ph, 10);

            // Colored header tint bar
            const [or, og, ob] = [red(oc), green(oc), blue(oc)];
            fill(or, og, ob, 45); noStroke();
            rect(px, py, pw, 50, 10, 10, 0, 0);

            // Organ color swatch + name
            fill(oc); noStroke(); rect(px + 14, py + 14, 22, 22, 5);
            fill(sc); textSize(17); textStyle(BOLD); textAlign(LEFT); applyVietFont();
            text(o.label, px + 44, py + 31);

            // Divider
            stroke(sc); strokeWeight(0.8); line(px + 14, py + 50, px + pw - 14, py + 50);

            // Description
            noStroke(); fill(45, 15, 55); textSize(14); textStyle(NORMAL);
            text(o.desc, px + 14, py + 62, pw - 28, 122);

            // SGK chip
            fill(isFemale ? color(240, 218, 248) : color(218, 218, 248));
            stroke(sc); strokeWeight(1); rect(px + 14, py + 194, 126, 24, 12);
            fill(sc); noStroke(); textSize(11); textStyle(NORMAL); textAlign(CENTER);
            applyVietFont();
            text('📖 ' + o.sgk, px + 77, py + 210);

            // Pronunciation chip
            fill(255, 252, 230); stroke(180, 150, 50); strokeWeight(1);
            rect(px + 148, py + 194, pw - 162, 24, 12);
            fill(100, 70, 10); noStroke(); textSize(11); textAlign(LEFT);
            applyVietFont();
            text('🔊 ' + o.pron, px + 160, py + 210);

            // Diseases note at bottom
            fill(bc); stroke(sc); strokeWeight(1); rect(px, py + ph - 108, pw, 108, 10);
            fill(sc); noStroke(); textSize(13); textStyle(BOLD);
            text('Bệnh thường gặp:', px + 14, py + ph - 90);
            fill(55, 25, 65); textSize(12); textStyle(NORMAL);
            const diseases = isFemale
                ? ['U nang buồng trứng, lạc nội mạc tử cung', 'Ung thư cổ tử cung (nguyên nhân: HPV)', 'Viêm nhiễm phụ khoa, vô sinh']
                : ['Ung thư tinh hoàn (thường gặp nam 15–35t)', 'Phì đại tuyến tiền liệt (nam lớn tuổi)', 'Vô sinh nam, giãn tĩnh mạch tinh'];
            for (let i = 0; i < diseases.length; i++)
                text('• ' + diseases[i], px + 16, py + ph - 68 + i * 22, pw - 30, 20);

        } else {
            // Placeholder — prompt to click
            noStroke(); fill(0, 0, 0, 15);
            rect(px + 3, py + 3, pw, ph, 10);

            fill(isFemale ? color(255, 246, 255) : color(246, 246, 255));
            stroke(isFemale ? color(200, 140, 210) : color(140, 130, 220)); strokeWeight(1.2);
            rect(px, py, pw, ph, 10);
            fill(isFemale ? color(170, 90, 185) : color(90, 80, 190));
            noStroke(); textSize(15); textAlign(CENTER); applyVietFont();
            text('Nhấn vào một cơ quan', px + pw / 2, py + ph / 2 - 18);
            text('trên sơ đồ để xem chi tiết →', px + pw / 2, py + ph / 2 + 8);

            // Progress bar
            const total = REPRO_ORGANS_F.length + REPRO_ORGANS_M.length;
            const seen  = this.seenOrgans.size;
            fill(215, 205, 228); rect(px + 30, py + ph / 2 + 42, pw - 60, 14, 7);
            if (seen > 0) {
                fill(isFemale ? color(190, 90, 210) : color(100, 90, 210));
                rect(px + 30, py + ph / 2 + 42, (pw - 60) * seen / total, 14, 7);
            }
            fill(95, 65, 125); textSize(13); textAlign(CENTER);
            text(seen + ' / ' + total + ' cơ quan đã xem  (cần ' + REPRO_ORGAN_GATE + ')', px + pw / 2, py + ph / 2 + 72);
        }
        pop();
    }

    // ── Step 1: Sperm & egg ───────────────────────────────────────────────

    _drawSpermEgg() {
        background(255, 245, 242);

        push();
        fill(100, 20, 60); noStroke(); textSize(26); textStyle(BOLD); textAlign(CENTER);
        applyVietFont();
        text("Trứng và Tinh trùng", 600, 50);
        pop();

        const af = this.animFrame;

        // SPERM cluster — left side (~x=120)
        push(); translate(120, 300);
        for (let i = 0; i < 8; i++) {
            const a = (i / 8) * TWO_PI + af * 0.018;
            const r = 72 + sin(af * 0.06 + i) * 12;
            this._drawSpermCell(cos(a)*r*0.55, sin(a)*r*0.45, a + PI, af + i*22, 1.0);
        }
        pop();
        push(); fill(20, 60, 140); noStroke(); textSize(15); textStyle(BOLD); textAlign(CENTER);
        applyVietFont();
        text("Tinh trùng", 120, 415);
        fill(40, 80, 180); textSize(11); textStyle(NORMAL);
        text("~0.06 mm · có đuôi bơi nhanh", 120, 435);
        pop();

        // EGG — right side (~x=900)
        push(); translate(900, 300);
        fill(255, 240, 180, 90); stroke(220, 180, 80); strokeWeight(2); ellipse(0, 0, 175, 175);
        fill(255, 220, 100); stroke(200, 160, 60); strokeWeight(2.5); ellipse(0, 0, 124, 124);
        fill(255, 185, 70); noStroke(); ellipse(0, 0, 54, 54);
        fill(60, 30, 0); noStroke(); textSize(10); textAlign(CENTER);
        applyVietFont();
        text("Zona pellucida", 0, 100);
        text("Tế bào trứng", 0, -28);
        text("Nhân", 0, 18);
        pop();
        push(); fill(140, 80, 10); noStroke(); textSize(15); textStyle(BOLD); textAlign(CENTER);
        applyVietFont();
        text("Trứng (Noãn)", 900, 415);
        fill(120, 60, 8); textSize(11); textStyle(NORMAL);
        text("~0.1 mm · lớn nhất cơ thể người", 900, 435);
        pop();

        // Animated arrows (sperm → egg)
        push();
        for (let i = 0; i < 6; i++) {
            const t  = ((af * 2 + i * 30) % 180) / 180.0;
            const ax = lerp(200, 820, t);
            noFill(); stroke(150, 100, 210, 220 - t*220); strokeWeight(1.5);
            line(ax, 300, ax + 16, 300);
        }
        fill(150, 100, 210); noStroke();
        triangle(840, 300, 824, 293, 824, 307);
        pop();

        // Info panel — center-right (extended to include "Bạn có biết?" fact box)
        push();
        applyVietFont();
        fill(255, 245, 255); stroke(150, 100, 200); strokeWeight(1);
        rectMode(CORNER); rect(250, 458, 700, 180, 8);
        fill(55, 15, 75); noStroke(); textSize(13); textAlign(LEFT);
        const lines = [
            "Hành trình thụ tinh: tinh trùng bơi qua âm đạo → tử cung → ống dẫn trứng.",
            "Khi gặp trứng: enzyme phân hủy màng trứng → tinh trùng xuyên vào → thụ tinh.",
            "Hợp tử (zygote) hình thành → phân chia → phôi → di chuyển về tử cung làm tổ.",
        ];
        for (let i = 0; i < lines.length; i++) text(lines[i], 264, 477 + i * 26);
        // "Bạn có biết?" highlighted fact box
        fill(255, 248, 200); stroke(200, 160, 40); strokeWeight(1);
        rect(260, 550, 680, 78, 6);
        fill(130, 72, 8); noStroke(); textSize(12); textStyle(BOLD);
        text('💡 Bạn có biết?', 272, 566);
        fill(55, 35, 6); textStyle(NORMAL); textSize(12);
        text(
            'Hợp tử mang đầy đủ 46 nhiễm sắc thể (23 từ mẹ + 23 từ cha) — đây là nền tảng ' +
            'di truyền của một con người mới.',
            272, 582, 656, 40
        );
        textStyle(NORMAL);
        pop();

        this._drawFertilizationPath();
    }

    _drawFertilizationPath() {
        const waypoints = [
            { x:  80, label: "Buồng\ntrứng" },
            { x: 272, label: "Ống dẫn\ntrứng" },
            { x: 464, label: "Thụ tinh" },
            { x: 656, label: "Hợp tử\nphân chia" },
            { x: 848, label: "Phôi vào\ntử cung" },
            { x:1040, label: "Làm tổ\nở tử cung" },
        ];
        const y = 670;   // shifted down to clear extended info panel

        const idx    = this.narration ? Math.min(this.narration.currentIndex || 0, waypoints.length - 1) : 0;
        const active = constrain(idx, 0, waypoints.length - 1);

        push();
        applyVietFont();
        fill(100, 20, 60); noStroke(); textSize(13); textStyle(BOLD); textAlign(CENTER);
        text("Hành trình thụ tinh", 600, 650);
        textStyle(NORMAL);

        // Connecting line
        stroke(180, 140, 210); strokeWeight(2);
        line(waypoints[0].x, y, waypoints[waypoints.length - 1].x, y);

        // Waypoints
        for (let i = 0; i < waypoints.length; i++) {
            const wp = waypoints[i];
            const isActive = i === active;
            const r = isActive ? 18 + sin(this.animFrame * 0.12) * 4 : 16;
            fill(isActive ? color(255, 180, 80) : i < active ? color(180, 220, 180) : color(220, 200, 230));
            stroke(150, 100, 180); strokeWeight(2);
            ellipse(wp.x, y, r * 2, r * 2);
            if (i < active) {
                fill(40, 140, 60); noStroke(); textSize(13); textStyle(BOLD); textAlign(CENTER);
                applyVietFont();
                text('✓', wp.x, y + 5);
            }
            fill(55, 15, 45); noStroke(); textSize(12); textStyle(NORMAL); textAlign(CENTER);
            applyVietFont();
            text(wp.label, wp.x, y + 36);
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
        applyVietFont();
        text("Chu kỳ kinh nguyệt (28 ngày)", 380, 50);
        textStyle(NORMAL);
        pop();

        const cx = 300, cy = 370;
        const dayAngle = TWO_PI / 28;

        push();
        noFill();
        // Phase 1: days 1–5 (menstruation) — red
        stroke(200, 50, 80); strokeWeight(72);
        arc(cx, cy, 310, 310, -HALF_PI, -HALF_PI + 5 * dayAngle, OPEN);
        // Phase 2: days 5–14 (follicular) — amber
        stroke(220, 160, 50); strokeWeight(72);
        arc(cx, cy, 310, 310, -HALF_PI + 5 * dayAngle, -HALF_PI + 14 * dayAngle, OPEN);
        // Phase 3: days 14–27 (luteal) — teal
        stroke(60, 150, 110); strokeWeight(72);
        arc(cx, cy, 310, 310, -HALF_PI + 14 * dayAngle, -HALF_PI + 27 * dayAngle, OPEN);
        // Phase 4: day 27–28 (late luteal) — purple
        stroke(140, 80, 180); strokeWeight(72);
        arc(cx, cy, 310, 310, -HALF_PI + 27 * dayAngle, -HALF_PI + 28 * dayAngle, OPEN);

        // Ovulation marker at day 14 — pulsing dot
        const ovAngle = -HALF_PI + 14 * dayAngle;
        const ovR = 8 + sin(this.animFrame * 0.1) * 3;
        fill(255, 230, 50); stroke(200, 160, 20); strokeWeight(2);
        ellipse(cx + cos(ovAngle) * 155, cy + sin(ovAngle) * 155, ovR * 2, ovR * 2);
        pop();

        // 28 tick marks
        push();
        stroke(80, 20, 50); strokeWeight(1);
        for (let i = 0; i < 28; i++) {
            const a = -HALF_PI + i * dayAngle;
            line(cx + cos(a) * 192, cy + sin(a) * 192,
                 cx + cos(a) * 198, cy + sin(a) * 198);
        }
        pop();

        // Selected day marker
        push();
        const selAngle = -HALF_PI + (this.cycleDay - 1) * dayAngle;
        fill(255); stroke(40, 10, 60); strokeWeight(2.5);
        ellipse(cx + cos(selAngle) * 155, cy + sin(selAngle) * 155, 20, 20);
        fill(40, 10, 60); noStroke(); textSize(11); textStyle(BOLD); textAlign(CENTER);
        applyVietFont();
        text(this.cycleDay, cx + cos(selAngle) * 155, cy + sin(selAngle) * 155 + 4);
        pop();

        // Day slider
        push();
        rectMode(CORNER);
        const sx = 50, sy = 640, sw = 660, sh = 16;
        fill(220, 200, 230); stroke(160, 100, 180); strokeWeight(1);
        rect(sx, sy, sw, sh, 8);
        const progX = map(this.cycleDay, 1, 28, sx, sx + sw);
        fill(160, 60, 140); noStroke();
        rect(sx, sy, progX - sx, sh, 8);
        // Handle
        fill(255); stroke(120, 40, 120); strokeWeight(2);
        ellipse(progX, sy + sh / 2, 26, 26);
        fill(80, 20, 80); noStroke(); textSize(12); textStyle(BOLD); textAlign(CENTER);
        applyVietFont();
        text(this.cycleDay, progX, sy + sh / 2 + 4);
        // Axis labels
        fill(95, 45, 75); textSize(12); textStyle(NORMAL);
        text('Ngày 1', sx, sy + 34);
        text('Ngày 14', sx + sw / 2, sy + 34);
        text('Ngày 28', sx + sw, sy + 34);
        fill(75, 35, 95); textSize(12); textAlign(CENTER);
        text('← Kéo để chọn ngày trong chu kỳ →', sx + sw / 2, sy + 50);
        pop();

        this._drawCyclePhasePanel(cx, cy);
    }

    _drawCyclePhasePanel(cx, cy) {
        const phases = [
            { days:[1,5],  color:[200,50,80],   name:'Kinh nguyệt',          desc:'Niêm mạc tử cung bong ra. Ra máu kinh 3–7 ngày. Estrogen và progesterone ở mức thấp nhất.' },
            { days:[5,14], color:[220,160,50],   name:'Nang trứng phát triển',desc:'Estrogen tăng → niêm mạc tử cung dày lên. Nang trứng chín dần trong buồng trứng.' },
            { days:[14,15],color:[255,220,30],   name:'Rụng trứng',           desc:'LH tăng đột biến kích thích phóng thích trứng. Trứng đi vào ống dẫn trứng — thời điểm có thể thụ thai.' },
            { days:[15,28],color:[60,150,110],   name:'Hoàng thể (Luteal)',   desc:'Progesterone tăng, duy trì niêm mạc dày. Nếu không thụ thai → hoàng thể thoái hóa → kinh nguyệt tiếp theo.' },
        ];

        let phase = phases[0];
        for (const p of phases) {
            if (this.cycleDay >= p.days[0] && this.cycleDay < p.days[1]) { phase = p; break; }
        }
        if (this.cycleDay === 28) phase = phases[3];

        const px = 620, py = 80, pw = 560, ph = 530;
        push();
        rectMode(CORNER);
        fill(255, 245, 252); stroke(180, 80, 140); strokeWeight(1.5);
        rect(px, py, pw, ph, 10);

        // Phase color bar
        const [r, g, b] = phase.color;
        fill(r, g, b); noStroke(); rect(px, py, pw, 8, 10, 10, 0, 0);

        // Day + phase name
        fill(color(r, g, b)); noStroke(); textSize(14); textStyle(BOLD); textAlign(LEFT);
        applyVietFont();
        text('Ngày ' + this.cycleDay, px + 14, py + 28);
        fill(55, 15, 45); textSize(17);
        text(phase.name, px + 14, py + 52);

        // Divider
        stroke(200, 160, 190); strokeWeight(1); line(px + 14, py + 62, px + pw - 14, py + 62);

        // Description
        noStroke(); fill(48, 18, 38); textSize(13); textStyle(NORMAL);
        text(phase.desc, px + 14, py + 78, pw - 28, 92);

        // Phase legend swatches
        fill(55, 18, 45); textSize(13); textStyle(BOLD); textAlign(LEFT);
        text('Các giai đoạn:', px + 14, py + 190);
        noStroke(); textStyle(NORMAL); textSize(12);
        for (let i = 0; i < phases.length; i++) {
            const [pr, pg, pb] = phases[i].color;
            fill(pr, pg, pb); rect(px + 14, py + 202 + i * 28, 14, 14, 3);
            fill(48, 18, 38);
            text('Ngày ' + phases[i].days[0] + '–' + (phases[i].days[1] - 1) + ': ' + phases[i].name,
                 px + 34, py + 214 + i * 28);
        }

        // Key facts
        fill(255, 240, 250); stroke(180, 100, 150); strokeWeight(1);
        rect(px + 14, py + ph - 140, pw - 28, 128, 8);
        fill(115, 35, 75); noStroke(); textSize(12); textStyle(BOLD); textAlign(LEFT);
        applyVietFont();
        text('Lưu ý SGK:', px + 24, py + ph - 122);
        fill(55, 18, 42); textStyle(NORMAL); textSize(12);
        const facts = [
            '• Chu kỳ trung bình: 28 ngày (có thể 21–35 ngày)',
            '• Rụng trứng: ngày 14 (±2 ngày)',
            '• Kinh nguyệt: ngày 1–5, mất ~30–80 mL máu',
            '• Thụ thai chỉ xảy ra trong vòng 24h sau rụng trứng',
        ];
        for (let i = 0; i < facts.length; i++)
            text(facts[i], px + 24, py + ph - 104 + i * 22, pw - 50, 20);
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
        const chipData = [
            { eff: '98%', std: true  },
            { eff: '91%', std: false },
            { eff: '99%', std: false },
            { eff: '85%', std: false },
        ];
        for (let i = 0; i < cards.length; i++) {
            const c  = cards[i];
            const cd = chipData[i];
            push();
            fill(...c.labelColor); noStroke(); textSize(13); textStyle(BOLD); textAlign(CENTER);
            applyVietFont();
            text(c.label, c.cx, c.cy + c.labelDY);
            textStyle(NORMAL); textSize(11); fill(...c.bodyColor);
            text(c.line1, c.cx, c.cy + c.line1DY);
            text(c.line2, c.cx, c.cy + c.line2DY);

            // Effectiveness chip
            rectMode(CENTER);
            fill(40, 140, 80); stroke(25, 110, 60); strokeWeight(1);
            rect(c.cx - 52, c.cy + 86, 88, 22, 11);
            fill(255); noStroke(); textSize(11); textStyle(BOLD);
            text('Hiệu quả ' + cd.eff, c.cx - 52, c.cy + 91);

            // STD chip
            fill(cd.std ? color(30, 100, 200) : color(190, 50, 50));
            stroke(cd.std ? color(20, 70, 160) : color(150, 30, 30)); strokeWeight(1);
            rect(c.cx + 52, c.cy + 86, 86, 22, 11);
            fill(255); noStroke();
            text('STD ' + (cd.std ? '✓' : '✗'), c.cx + 52, c.cy + 91);
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

        // Rules box first so sperm renders on top
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

        // Animated sperm drawn after rules box so it's visible on top
        // Head at x=740 keeps tail (150px at scale 1.5) ending at x=590 — clear of rules box
        push(); translate(740, 430);
        this._drawSpermCell(0, 0, 0, this.animFrame, 1.5);
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
            text(i < this.lives ? "❤" : "♡", 758 + i*26, 34);
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
        fill(0, 0, 0, 165); noStroke(); rectMode(CORNER); rect(0, 0, width, height);

        // SystemDone card
        const cw = 560, ch = 300, cx = (width - cw) / 2, cy = (height - ch) / 2;
        fill(255, 252, 230); stroke(200, 160, 40); strokeWeight(2.5);
        rect(cx, cy, cw, ch, 16);

        // Top accent bar
        fill(255, 210, 60); noStroke(); rect(cx, cy, cw, 10, 16, 16, 0, 0);

        textAlign(CENTER); applyVietFont();
        textSize(48); fill(255, 210, 50); noStroke();
        text("🎉", cx + cw / 2, cy + 72);

        textSize(26); textStyle(BOLD); fill(80, 50, 10);
        text("Hoàn thành: Hệ Sinh dục", cx + cw / 2, cy + 116);

        textSize(14); textStyle(NORMAL); fill(60, 40, 8);
        text("Bạn đã vượt qua hành trình thụ tinh!", cx + cw / 2, cy + 144);
        text("Điểm số: " + this.score + "  ·  Còn lại " + this.lives + " mạng", cx + cw / 2, cy + 168);

        // Back to map button
        fill(200, 150, 30); stroke(160, 110, 20); strokeWeight(1.5);
        rect(cx + cw / 2 - 120, cy + ch - 62, 240, 42, 10);
        fill(255); noStroke(); textSize(14); textStyle(BOLD);
        text("← Về bản đồ cơ thể", cx + cw / 2, cy + ch - 37);
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
