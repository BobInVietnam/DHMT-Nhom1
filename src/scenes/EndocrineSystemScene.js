class EndocrineSystemScene extends Scene {
    constructor() {
        super();
        this.hormones = [];
        this.otherOrgansAlpha = 255;
        this.systemPartsAlpha = 0;

        // Tất cả các hệ cơ quan (v6 - Final Interaction Model)
        this.allOrgans = [
            { name: "NÃO BỘ", x: 600, y: 100, w: 90, h: 70, color: [255, 255, 150], system: "nervous" },
            { name: "TỦY SỐNG", x: 600, y: 350, w: 15, h: 300, color: [255, 255, 200], system: "nervous" },
            { name: "TIM", x: 620, y: 240, w: 45, h: 50, color: [255, 50, 50], system: "circulatory" },
            { name: "PHỔI TRÁI", x: 560, y: 260, w: 60, h: 100, color: [200, 230, 255], system: "respiratory" },
            { name: "PHỔI PHẢI", x: 640, y: 260, w: 60, h: 100, color: [200, 230, 255], system: "respiratory" },
            { name: "DẠ DÀY", x: 600, y: 380, w: 70, h: 60, color: [255, 180, 100], system: "digestive" },
            { name: "GAN", x: 560, y: 360, w: 70, h: 50, color: [150, 75, 0], system: "digestive" },
            { name: "RUỘT", x: 600, y: 480, w: 80, h: 100, color: [255, 200, 150], system: "digestive" },
            { name: "TUYẾN GIÁP", x: 600, y: 190, w: 30, h: 20, color: [255, 100, 255], system: "endocrine" },
            { name: "TUYẾN TỤY", x: 580, y: 410, w: 40, h: 20, color: [255, 150, 255], system: "endocrine" },
            { name: "TUYẾN THƯỢNG THẬN", x: 600, y: 435, w: 60, h: 15, color: [255, 0, 255], system: "endocrine" },
            { name: "THẬN", x: 600, y: 440, w: 100, h: 40, color: [150, 50, 50], system: "excretory" }
        ];

        this.glands = [
            { name: "TUYẾN YÊN", x: 600, y: 110, hormone: "Growth", color: [255, 100, 255] },
            { name: "TUYẾN GIÁP", x: 600, y: 200, hormone: "Metabolism", color: [200, 150, 255] },
            { name: "TUYẾN TỤY", x: 600, y: 350, hormone: "Insulin", color: [255, 200, 255] },
            { name: "TUYẾN THƯỢNG THẬN", x: 600, y: 420, hormone: "Adrenaline", color: [255, 150, 150] }
        ];

        this.backBtn = new Button(100, 50, 150, 40, "QUAY LẠI", "SWITCH_SCENE", "Main");
    }

    update(dt) {
        super.update(dt);
        this.hoveredOrgan = null;
        for (let organ of this.allOrgans) {
            if (mouseX > organ.x - organ.w/2 && mouseX < organ.x + organ.w/2 &&
                mouseY > organ.y - organ.h/2 && mouseY < organ.y + organ.h/2) {
                this.hoveredOrgan = organ;
            }
        }
        if (this.otherOrgansAlpha > 0) this.otherOrgansAlpha -= dt * 150;
        if (this.systemPartsAlpha < 255) this.systemPartsAlpha += dt * 150;

        if (frameCount % 30 === 0) {
            let g = random(this.glands);
            this.hormones.push({ x: g.x, y: g.y, vx: random(-1, 1), vy: random(1, 4), life: 255, color: g.color });
        }
        for (let i = this.hormones.length - 1; i >= 0; i--) {
            let h = this.hormones[i]; h.x += h.vx; h.y += h.vy; h.life -= 2;
            if (h.life <= 0) this.hormones.splice(i, 1);
        }
    }

    draw() {
        background(240);
        push();
        stroke(120); fill(200, 230, 255, 80); rectMode(CENTER);
        rect(600, 400, 160, 450, 50); circle(600, 100, 110);
        rect(500, 350, 40, 280, 20); rect(700, 350, 40, 280, 20);
        rect(570, 650, 50, 300, 25); rect(630, 650, 50, 300, 25);
        pop();

        for (let organ of this.allOrgans) {
            let alpha = (organ.system === "endocrine") ? 255 : this.otherOrgansAlpha;
            if (alpha <= 0) continue;
            push(); rectMode(CENTER); fill(organ.color[0], organ.color[1], organ.color[2], alpha);
            stroke(50, alpha * 0.5); rect(organ.x, organ.y, organ.w, organ.h, 5); pop();
        }

        if (this.hoveredOrgan) {
            let organ = this.hoveredOrgan;
            let alpha = (organ.system === "endocrine") ? 255 : this.otherOrgansAlpha;
            if (alpha > 50) {
                push(); fill(0, alpha); noStroke(); textAlign(CENTER);
                textSize(18); textStyle(BOLD); text(organ.name, organ.x, organ.y - organ.h/2 - 12); pop();
            }
        }

        if (this.systemPartsAlpha > 0) {
            for (let h of this.hormones) {
                fill(h.color[0], h.color[1], h.color[2], (h.life / 255) * this.systemPartsAlpha);
                noStroke(); circle(h.x, h.y, 5);
            }
            for (let g of this.glands) {
                fill(g.color[0], g.color[1], g.color[2], this.systemPartsAlpha);
                stroke(255, this.systemPartsAlpha); ellipse(g.x, g.y, 25, 15);
            }
        }
        this.backBtn.display();
        fill(50); textAlign(CENTER); textSize(36); textStyle(BOLD);
        text("HỆ NỘI TIẾT", width/2, 40);
    }

    checkClick() { this.backBtn.checkClick(); }
}
