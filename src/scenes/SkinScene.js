const SkinNarration0 = {
    text: [
        "Da là cơ quan lớn nhất cơ thể người, bao phủ toàn bộ bề mặt cơ thể.",
        "Da gồm 3 lớp chính: lớp biểu bì ở ngoài, lớp bì ở giữa và lớp mô dưới da.",
        "Lớp biểu bì chứa tế bào sừng tạo hàng rào bảo vệ và tế bào melanin tạo màu da.",
        "Lớp bì chứa collagen, mạch máu, dây thần kinh, nang lông và tuyến mồ hôi.",
        "Lớp mô dưới da chứa mô mỡ giúp cách nhiệt và dự trữ năng lượng cho cơ thể.",
        "Da có chức năng: bảo vệ, điều hòa thân nhiệt, cảm nhận xúc giác và tổng hợp vitamin D."
    ],
    sprite: [
        CharacterSprite.TALK, CharacterSprite.EXPL, CharacterSprite.EXPL,
        CharacterSprite.EXPL, CharacterSprite.P_EXPL, CharacterSprite.P_TALK
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
        "Đây là mô hình 3D của da người với đầy đủ ba lớp: biểu bì, lớp bì và mô dưới da.",
        "Bạn có thể kéo chuột để xoay, cuộn để phóng to/thu nhỏ, và nhấp phải để di chuyển."
    ],
    sprite: [CharacterSprite.TALK, CharacterSprite.EXPL]
};

class SkinScene extends Scene {
    constructor() {
        super();
        this.step = 0;
        this.animFrame = 0;
        this.isHot = true;

        this.narration = new Narration(980, 380);
        this.narrator  = new Narrator(1000, 660, SkinNarration0);
        this.backBtn   = new Button(80,   40, 130, 40, "← Quay lại", "SWITCH_SCENE",    "BodyMap");
        this.skipBtn   = new Button(1120, 40, 100, 35, "SKIP >>>",   "SWITCH_SCENE",    "BodyMap");
        this.nextBtn   = new Button(380, 768, 180, 46, "Tiếp theo →","SKIN_NEXT",       null);

        // 3D model zoom controls — only visible in step 2, placed below the Three.js canvas
        this.zoom3DPlusBtn  = new Button(560, 760, 88, 34, "Zoom +", "SKIN_3D_ZOOM_IN",  null);
        this.zoom3DMinusBtn = new Button(656, 760, 88, 34, "Zoom −", "SKIN_3D_ZOOM_OUT", null);
        this.zoom3DResetBtn = new Button(752, 760, 88, 34, "Reset",  "SKIN_3D_RESET",    null);
        this.zoom3DPlusBtn.hide();
        this.zoom3DMinusBtn.hide();
        this.zoom3DResetBtn.hide();

        this.objects.push(
            this.narration, this.narrator,
            this.backBtn, this.skipBtn, this.nextBtn,
            this.zoom3DPlusBtn, this.zoom3DMinusBtn, this.zoom3DResetBtn
        );

        bus.on("SKIN_NEXT",        () => this.nextStep());
        bus.on("SKIN_3D_ZOOM_IN",  () => model3DViewer.zoomIn());
        bus.on("SKIN_3D_ZOOM_OUT", () => model3DViewer.zoomOut());
        bus.on("SKIN_3D_RESET",    () => model3DViewer.resetCamera());
    }

    enter() {
        this.step = 0;
        this.animFrame = 0;
        this.isHot = true;
        this.narrator.show();
        this.narrator.eventData = SkinNarration0;
        bus.emit("FINISH_NARRATION");
        model3DViewer.hide();
        this._syncButtons();
    }

    exit() {
        model3DViewer.hide();
    }

    nextStep() {
        if (this.step < 2) this.step++;
        this.animFrame = 0;
        bus.emit("FINISH_NARRATION");
        if (this.step === 1) {
            this.narrator.eventData = SkinNarration1;
        } else if (this.step === 2) {
            // Set optional narrator speech; narrator stays visible per design
            this.narrator.eventData = SkinNarration2;
            model3DViewer.load('./assets/skin.glb');
            // Three.js canvas: left panel x=[30,770], y=[108,678], right of narrator
            model3DViewer.show(30, 108, 740, 570);
        }
        this._syncButtons();
    }

    _syncButtons() {
        if (this.step === 2) {
            this.zoom3DPlusBtn.show();
            this.zoom3DMinusBtn.show();
            this.zoom3DResetBtn.show();
            this.nextBtn.label     = "← Về trang chủ";
            this.nextBtn.eventTag  = "SWITCH_SCENE";
            this.nextBtn.eventData = "BodyMap";
        } else {
            this.zoom3DPlusBtn.hide();
            this.zoom3DMinusBtn.hide();
            this.zoom3DResetBtn.hide();
            this.nextBtn.label     = "Tiếp theo →";
            this.nextBtn.eventTag  = "SKIN_NEXT";
            this.nextBtn.eventData = null;
        }
    }

    draw() {
        this.animFrame++;
        this.isHot = (Math.floor(this.animFrame / 300) % 2 === 0);
        if      (this.step === 0) this._drawOverview();
        else if (this.step === 1) this._drawThermoReg();
        else                      this._drawModel3D();
        super.draw();
    }

    // ── Step 0: 2D skin anatomy cross-section ─────────────────────────────

    _drawOverview() {
        background(245, 235, 225);

        push();
        fill(80, 40, 10); noStroke(); textSize(26); textStyle(BOLD); textAlign(CENTER);
        text("Cấu tạo của Da", 380, 50);
        pop();

        const sx = 30, sy = 72, sw = 700;
        const eH = 88, dH = 295, hH = 270;

        // ── Epidermis ──
        fill(255, 215, 175); stroke(180, 130, 90); strokeWeight(1);
        rect(sx, sy, sw, eH);
        stroke(200, 160, 110); strokeWeight(1.5); noFill();
        for (let x = sx; x < sx + sw; x += 18) arc(x, sy + 4, 18, 10, PI, TWO_PI);

        fill(50, 20, 5); noStroke(); textAlign(LEFT);
        textSize(14); textStyle(BOLD); text("Lớp biểu bì (Epidermis)", sx + 10, sy + 22);
        textStyle(NORMAL); textSize(12);
        text("Tế bào sừng (Keratinocyte) | Melanin | Tế bào Langerhans", sx + 12, sy + 44);
        text("Chức năng: hàng rào bảo vệ, tạo màu da, miễn dịch da", sx + 12, sy + 62);

        // ── Dermis ──
        fill(255, 180, 155); stroke(180, 100, 80); strokeWeight(1);
        rect(sx, sy + eH, sw, dH);
        fill(50, 20, 5); noStroke();
        textSize(14); textStyle(BOLD); text("Lớp bì (Dermis)", sx + 10, sy + eH + 20);
        textStyle(NORMAL);

        // hair follicle
        fill(70, 45, 22); noStroke();
        rect(sx + 115, sy + eH - 52, 7, 90, 3);
        ellipse(sx + 118, sy + eH + 270, 20, 28);
        stroke(70, 45, 22); strokeWeight(1.5);
        line(sx + 118, sy + eH + 60, sx + 118, sy + eH + 256);
        noStroke(); fill(40, 20, 0); textSize(11);
        text("Nang lông", sx + 130, sy + eH + 82);

        // sweat gland (coiled)
        noFill(); stroke(60, 120, 220); strokeWeight(2);
        for (let i = 0; i < 5; i++) {
            arc(sx + 340 + i*2, sy + eH + 205 + i*10, 24, 19, 0, PI);
            arc(sx + 328 + i*2, sy + eH + 215 + i*10, 24, 19, PI, TWO_PI);
        }
        line(sx + 340, sy + eH + 195, sx + 340, sy + eH - 5);
        noStroke(); fill(40, 80, 180); textSize(11);
        text("Tuyến mồ hôi", sx + 356, sy + eH + 245);

        // blood vessels
        fill(210, 45, 45); noStroke(); ellipse(sx + 490, sy + eH + 135, 24, 15);
        fill(60, 75, 200);             ellipse(sx + 522, sy + eH + 135, 18, 12);
        fill(40, 20, 0); textSize(11);
        text("Mạch máu (đỏ = động mạch / xanh = tĩnh mạch)", sx + 540, sy + eH + 138);

        // nerve fiber
        stroke(220, 185, 30); strokeWeight(2.5); noFill();
        beginShape();
        for (let x = sx + 200; x < sx + 690; x += 14)
            vertex(x, sy + eH + 188 + sin(x * 0.18) * 8);
        endShape();
        noStroke(); fill(40, 20, 0); textSize(11);
        text("Dây thần kinh", sx + 220, sy + eH + 175);

        // collagen fibers hint
        stroke(255, 155, 125, 160); strokeWeight(1);
        for (let i = 0; i < 5; i++) {
            noFill();
            bezier(sx + 185 + i*72, sy + eH + 48,
                   sx + 205 + i*72, sy + eH + 88,
                   sx + 175 + i*72, sy + eH + 108,
                   sx + 195 + i*72, sy + eH + 148);
        }
        noStroke(); fill(160, 70, 50); textSize(11);
        text("Collagen / Sợi đàn hồi", sx + 180, sy + eH + 48);

        // ── Hypodermis ──
        fill(255, 235, 125); stroke(200, 180, 70); strokeWeight(1);
        rect(sx, sy + eH + dH, sw, hH);
        fill(50, 45, 5); noStroke();
        textSize(14); textStyle(BOLD);
        text("Lớp mô dưới da (Hypodermis)", sx + 10, sy + eH + dH + 20);
        textStyle(NORMAL); textSize(11);
        text("Tế bào mỡ (Adipocyte) – dự trữ năng lượng, cách nhiệt", sx + 12, sy + eH + dH + 37);
        for (let fx = sx + 50; fx < sx + sw - 30; fx += 70)
            for (let fy = sy + eH + dH + 58; fy < sy + eH + dH + hH - 18; fy += 60) {
                fill(255, 248, 170, 215); stroke(200, 180, 70); strokeWeight(1);
                ellipse(fx, fy, 58, 50);
            }
    }

    // ── Step 1: Thermoregulation animation ────────────────────────────────

    _drawThermoReg() {
        let t = (this.animFrame % 300) / 300.0;
        background(this.isHot ? lerpColor(color(255,230,200), color(255,210,185), t)
                              : lerpColor(color(200,228,255), color(185,220,255), t));

        push();
        fill(40, 40, 80); noStroke(); textSize(26); textStyle(BOLD); textAlign(CENTER);
        text("Điều hòa thân nhiệt", 380, 48);
        textSize(19); textStyle(NORMAL);
        if (this.isHot) { fill(200, 50, 20); text("Moi truong NONG", 380, 88); }
        else             { fill(30,  80,200); text("Moi truong LANH", 380, 88); }
        pop();

        const sx = 30, sy = 112, sw = 660, eH = 55, dH = 252, hH = 168;

        // Epidermis
        fill(255, 210, 170); stroke(180, 130, 90); strokeWeight(1); rect(sx, sy, sw, eH);
        fill(50, 20, 5); noStroke(); textSize(12); textAlign(LEFT); text("Biểu bì", sx+8, sy+34);

        // Dermis
        fill(255, 185, 158); stroke(180, 100, 80); strokeWeight(1); rect(sx, sy+eH, sw, dH);
        fill(50, 20, 5); noStroke(); textSize(12); text("Lớp bì", sx+8, sy+eH+22);

        // Hypodermis
        fill(255, 235, 130); stroke(200, 180, 70); strokeWeight(1); rect(sx, sy+eH+dH, sw, hH);
        fill(50, 45, 5); noStroke(); textSize(12); text("Mô dưới da", sx+8, sy+eH+dH+22);

        if (this.isHot) {
            // vasodilation
            fill(210, 50, 50, 200); noStroke();
            rect(sx+218, sy+eH+18, 28, dH-36, 14);
            rect(sx+392, sy+eH+18, 22, dH-36, 11);
            fill(40, 10, 10); textSize(12);
            text("Mach mau gian → tan nhiet", sx+252, sy+eH+dH/2);

            // sweat drops
            for (let i = 0; i < 6; i++) {
                let px = sx + 70 + i * 94;
                stroke(90, 140, 210); strokeWeight(2); line(px, sy, px, sy - 12);
                let dy = sy - 22 - ((this.animFrame * 2 + i * 55) % 88);
                fill(80, 140, 210, 200); noStroke(); ellipse(px, dy, 9, 13);
            }
            fill(30, 80, 180); noStroke(); textSize(13);
            text("→ Tiết mồ hôi để làm mát cơ thể", sx+10, sy - 30);
        } else {
            // vasoconstriction
            fill(180, 50, 50, 180); noStroke();
            rect(sx+225, sy+eH+18, 10, dH-36, 5);
            rect(sx+398, sy+eH+18,  8, dH-36, 4);
            fill(40, 10, 10); textSize(12);
            text("Mach mau co → giu nhiet", sx+238, sy+eH+dH/2);

            // raised hairs
            stroke(70, 45, 25); strokeWeight(2);
            for (let i = 0; i < 8; i++) { let hx = sx+54+i*78; line(hx, sy+5, hx+13, sy-25); }
            fill(30, 50, 160); noStroke(); textSize(13);
            text("→ Lông dựng lên, mạch máu co để giữ nhiệt", sx+10, sy - 30);

            // shiver
            let sh = sin(this.animFrame * 0.45) * 5;
            stroke(100, 100, 200); strokeWeight(1.5); noFill();
            for (let i = 0; i < 3; i++) {
                beginShape();
                for (let x = sx+120+i*158; x < sx+268+i*158; x += 14)
                    vertex(x+sh, sy+eH+155 + sin(x*0.3 + this.animFrame*0.25)*6);
                endShape();
            }
            fill(60, 60, 190); noStroke(); textSize(12);
            text("→ Cơ run rẩy để sinh nhiệt", sx+10, sy+eH+190);
        }

        this._drawTempBar(sy, eH + dH + hH);
    }

    _drawTempBar(sy, totalH) {
        let bx = 725, by = sy, bw = 44, bh = totalH;
        let t   = (this.animFrame % 300) / 300.0;
        let lo  = this.isHot ? 37.0 : 35.0, hi = this.isHot ? 40.0 : 37.0;
        let temp = lerp(lo, hi, sin(t * PI));

        fill(210); stroke(100); strokeWeight(1); rect(bx, by, bw, bh, 5);
        let fillH = map(temp, 34, 41, 0, bh);
        let r = map(temp, 34, 41, 0, 255), b = map(temp, 34, 41, 255, 0);
        fill(r, 60, b); noStroke(); rect(bx, by + bh - fillH, bw, fillH, 5);

        for (let deg = 34; deg <= 41; deg++) {
            let ty = by + map(deg, 34, 41, bh, 0);
            stroke(80); strokeWeight(1); line(bx-5, ty, bx, ty);
            fill(30); noStroke(); textSize(11); textAlign(RIGHT); text(deg + "°C", bx-8, ty+4);
        }
        fill(30); noStroke(); textSize(13); textAlign(CENTER);
        text("Thân nhiệt", bx+bw/2, by - 22);
        fill(r, 60, b); textSize(16); text(nf(temp,2,1)+"°C", bx+bw/2, by+bh+24);
        textAlign(LEFT);
    }

    // ── Step 2: 3D model view (Three.js overlay handles the actual rendering) ──

    _drawModel3D() {
        background(22, 28, 48);

        // Title and instructions above the Three.js canvas area (y < 108)
        push();
        fill(255); noStroke(); textSize(26); textStyle(BOLD); textAlign(CENTER);
        text("Mô hình 3D của Da", 400, 52);
        fill(170); textSize(13); textStyle(NORMAL);
        text("Kéo chuột: xoay  |  Cuộn: zoom  |  Chuột phải / Ctrl+kéo: di chuyển", 400, 80);
        pop();

        // Border frame around the Three.js canvas area (x=30,y=108,w=740,h=570)
        push();
        noFill(); stroke(70, 110, 220); strokeWeight(2);
        rect(30, 108, 740, 570, 8);
        pop();

        // Status line below the viewport — shows viewer state so issues are visible
        push();
        textSize(13); textAlign(CENTER); noStroke();
        if (!model3DViewer.isReady) {
            fill(255, 80, 80);
            text("⚠ WebGL không khả dụng — không thể hiển thị mô hình 3D", 400, 700);
        } else if (model3DViewer.isLoading) {
            fill(120, 160, 255);
            text("Đang tải mô hình… (skin.glb ~27 MB)", 400, 700);
        } else {
            fill(80, 180, 100);
            text("Mô hình đã tải  ·  dùng chuột để xoay / zoom", 400, 700);
        }
        pop();
    }
}
