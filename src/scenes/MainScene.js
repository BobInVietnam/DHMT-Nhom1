class MainScene extends Scene {
    constructor() {
        super();
        this.isXRay = false;
        this.hoveredOrgan = null;

        // Định nghĩa các cơ quan nội tạng đơn lẻ (v6 - Final Interaction Model)
        this.organs = [
            // Hệ Thần Kinh
            { name: "NÃO BỘ", scene: "NervousSystem", system: "nervous", x: 600, y: 100, w: 90, h: 70, color: [255, 255, 150] },
            { name: "TỦY SỐNG", scene: "NervousSystem", system: "nervous", x: 600, y: 350, w: 15, h: 300, color: [255, 255, 200] },

            { name: "TIM", scene: null, system: "circulatory", x: 620, y: 240, w: 45, h: 50, color: [255, 50, 50] },
            { name: "PHỔI TRÁI", scene: null, system: "respiratory", x: 560, y: 260, w: 60, h: 100, color: [200, 230, 255] },
            { name: "PHỔI PHẢI", scene: null, system: "respiratory", x: 640, y: 260, w: 60, h: 100, color: [200, 230, 255] },
            { name: "DẠ DÀY", scene: null, system: "digestive", x: 600, y: 380, w: 70, h: 60, color: [255, 180, 100] },
            { name: "GAN", scene: null, system: "digestive", x: 560, y: 360, w: 70, h: 50, color: [150, 75, 0] },
            { name: "RUỘT", scene: null, system: "digestive", x: 600, y: 480, w: 80, h: 100, color: [255, 200, 150] },
            
            // Hệ Nội Tiết
            { name: "TUYẾN GIÁP", scene: "EndocrineSystem", system: "endocrine", x: 600, y: 190, w: 30, h: 20, color: [255, 100, 255] },
            { name: "TUYẾN TỤY", scene: "EndocrineSystem", system: "endocrine", x: 580, y: 410, w: 40, h: 20, color: [255, 150, 255] },
            { name: "TUYẾN THƯỢNG THẬN", scene: "EndocrineSystem", system: "endocrine", x: 600, y: 435, w: 60, h: 15, color: [255, 0, 255] },
            
            // Hệ Bài Tiết
            { name: "THẬN", scene: null, system: "excretory", x: 600, y: 440, w: 100, h: 40, color: [150, 50, 50] }
        ];

        this.xRayButton = new Button(150, 700, 240, 60, "🩻 X-RAY: TẮT", "TOGGLE_XRAY", null);
        
        bus.on("TOGGLE_XRAY", () => { 
            this.isXRay = !this.isXRay; 
            this.xRayButton.label = this.isXRay ? "🩻 X-RAY: BẬT" : "🩻 X-RAY: TẮT";
        });
    }

    update(dt) {
        super.update(dt);
        this.hoveredOrgan = null;
        if (this.isXRay) {
            for (let organ of this.organs) {
                if (mouseX > organ.x - organ.w/2 && mouseX < organ.x + organ.w/2 &&
                    mouseY > organ.y - organ.h/2 && mouseY < organ.y + organ.h/2) {
                    this.hoveredOrgan = organ;
                }
            }
        }
    }

    draw() {
        background(240);

        // Vẽ cơ thể người chi tiết (Tay, Chân, Đầu, Thân)
        push();
        stroke(120);
        strokeWeight(2);
        
        if (!this.isXRay) {
            fill(255, 220, 200);
            cursor(ARROW);
        } else {
            fill(200, 230, 255, 80); 
            cursor(ARROW);
        }
        
        rectMode(CENTER);
        rect(600, 400, 160, 450, 50); // Thân
        circle(600, 100, 110);         // Đầu
        rect(500, 350, 40, 280, 20);  // Tay trái
        rect(700, 350, 40, 280, 20);  // Tay phải
        rect(570, 650, 50, 300, 25);  // Chân trái
        rect(630, 650, 50, 300, 25);  // Chân phải
        pop();

        // Vẽ nội tạng khi X-ray bật
        if (this.isXRay) {
            // Pass 1: Vẽ tất cả các hộp cơ quan
            for (let organ of this.organs) {
                push();
                rectMode(CENTER);
                stroke(50, 150);
                strokeWeight(2);
                fill(organ.color);
                
                if (this.hoveredOrgan === organ) {
                    cursor(HAND);
                    stroke(255);
                    strokeWeight(3);
                }
                rect(organ.x, organ.y, organ.w, organ.h, 5);
                pop();
            }

            // Pass 2: Tên bộ phận hiện lên lớp trên cùng khi HOVER
            if (this.hoveredOrgan) {
                let organ = this.hoveredOrgan;
                push();
                fill(0);
                noStroke();
                textAlign(CENTER);
                textSize(20);
                textStyle(BOLD);
                text(organ.name, organ.x, organ.y - organ.h/2 - 12);
                pop();
            }
        }

        this.xRayButton.display();
    }

    checkClick() {
        this.xRayButton.checkClick();
        if (this.isXRay && this.hoveredOrgan && this.hoveredOrgan.scene) {
            bus.emit("SWITCH_SCENE", this.hoveredOrgan.scene);
        }
    }
}