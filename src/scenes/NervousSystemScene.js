class NervousSystemScene extends Scene {
    constructor() {
        super();
        this.impulses = [];
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

        this.nervePaths = [
            { start: {x: 600, y: 150}, end: {x: 600, y: 600} },
            { start: {x: 600, y: 200}, end: {x: 400, y: 300} },
            { start: {x: 600, y: 200}, end: {x: 800, y: 300} },
            { start: {x: 600, y: 600}, end: {x: 500, y: 750} },
            { start: {x: 600, y: 600}, end: {x: 700, y: 750} }
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

        if (frameCount % 20 === 0) {
            let p = random(this.nervePaths);
            this.impulses.push({ path: p, t: 0, speed: random(0.02, 0.05) });
        }
        for (let i = this.impulses.length - 1; i >= 0; i--) {
            let p = this.impulses[i];
            p.t += p.speed;
            if (p.t >= 1) this.impulses.splice(i, 1);
        }
    }

    draw() {
        background(240);

        // Cơ thể X-Ray
        push();
        stroke(120); fill(200, 230, 255, 80); rectMode(CENTER);
        rect(600, 400, 160, 450, 50); circle(600, 100, 110);
        rect(500, 350, 40, 280, 20); rect(700, 350, 40, 280, 20);
        rect(570, 650, 50, 300, 25); rect(630, 650, 50, 300, 25);
        pop();

        // Vẽ các cơ quan
        for (let organ of this.allOrgans) {
            let alpha = (organ.system === "nervous") ? 255 : this.otherOrgansAlpha;
            if (alpha <= 0) continue;
            push();
            rectMode(CENTER);
            fill(organ.color[0], organ.color[1], organ.color[2], alpha);
            stroke(50, alpha * 0.5);
            rect(organ.x, organ.y, organ.w, organ.h, 5);
            pop();
        }

        // Tên cơ quan khi HOVER (Pass 2)
        if (this.hoveredOrgan) {
            let organ = this.hoveredOrgan;
            let alpha = (organ.system === "nervous") ? 255 : this.otherOrgansAlpha;
            if (alpha > 50) {
                push(); fill(0, alpha); noStroke(); textAlign(CENTER);
                textSize(18); textStyle(BOLD);
                text(organ.name, organ.x, organ.y - organ.h/2 - 12);
                pop();
            }
        }

        // Dây thần kinh và Xung
        if (this.systemPartsAlpha > 0) {
            stroke(100, 100, 255, this.systemPartsAlpha); strokeWeight(2);
            for (let p of this.nervePaths) line(p.start.x, p.start.y, p.end.x, p.end.y);
            noStroke();
            for (let p of this.impulses) {
                let x = lerp(p.path.start.x, p.path.end.x, p.t);
                let y = lerp(p.path.start.y, p.path.end.y, p.t);
                fill(255, 255, 100, this.systemPartsAlpha); circle(x, y, 4);
            }
        }

        this.backBtn.display();
        fill(50); textAlign(CENTER); textSize(36); textStyle(BOLD);
        text("HỆ THẦN KINH", width/2, 40);
    }

    checkClick() { this.backBtn.checkClick(); }
}
