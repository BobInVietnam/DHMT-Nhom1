class SkinThermalScene extends Scene {
    constructor() {
        super();
        this.temperature = 37.0; 
        this.minTemp = 30.0;
        this.maxTemp = 42.0;

        // Khởi tạo mảng rỗng
        this.pores = [];
        this.sweatParticles = [];
        this.bloodVessels = [];
        
        // Khởi tạo nút bấm (Đã an toàn với string-based colors)
        this.backBtn = new Button(120, 60, 200, 50, "← QUAY LẠI", "SWITCH_SCENE", "Main");
    }

    /**
     * Phương thức enter() được gọi bởi SceneManager khi chuyển vào cảnh này.
     * Đây là nơi an toàn nhất để gọi các hàm p5.js như color(), random().
     */
    enter() {
        console.log("Entering SkinThermalScene - Initializing colors and entities");
        
        // Khởi tạo màu sắc p5.Color
        this.skinNormal = color(255, 219, 172);
        this.skinHot = color(255, 120, 100);
        this.skinCold = color(180, 220, 255);
        this.currentSkinColor = color(255, 219, 172);

        // Khởi tạo lại thực thể (để làm sạch dữ liệu cũ)
        this.pores = [];
        this.sweatParticles = [];
        this.bloodVessels = [];
        this.initEntities();
    }

    initEntities() {
        // Lỗ chân lông và Lông
        for (let i = 0; i < 15; i++) {
            this.pores.push({
                x: random(width * 0.15, width * 0.85),
                y: random(height * 0.25, height * 0.75),
                size: 6,
                hairAngle: PI/4
            });
        }
        // Mạch máu
        for (let i = 0; i < 5; i++) {
            this.bloodVessels.push({
                y: random(height * 0.35, height * 0.8),
                thickness: 2,
                amplitude: random(10, 25)
            });
        }
    }

    update(dt) {
        super.update(dt);

        // Tương tác nhiệt kế (Vùng trượt ở dưới)
        if (mouseIsPressed && mouseY > 650) {
            this.temperature = map(mouseX, 200, 1000, this.minTemp, this.maxTemp, true);
        }

        // Nội suy màu sắc
        if (this.skinNormal) {
            let targetColor;
            if (this.temperature > 37) {
                let t = map(this.temperature, 37, 42, 0, 1);
                targetColor = lerpColor(this.skinNormal, this.skinHot, t);
            } else {
                let t = map(this.temperature, 30, 37, 1, 0);
                targetColor = lerpColor(this.skinCold, this.skinNormal, t);
            }
            this.currentSkinColor = lerpColor(this.currentSkinColor, targetColor, 0.1);
        }

        // Cập nhật lỗ chân lông
        for (let p of this.pores) {
            if (this.temperature > 38) {
                p.size = lerp(p.size, 14, 0.1);
                p.hairAngle = lerp(p.hairAngle, PI/6, 0.1); 
                if (random() < 0.12) {
                    this.sweatParticles.push({ x: p.x, y: p.y, vy: random(2, 5), alpha: 255, type: 'sweat' });
                    this.sweatParticles.push({ x: p.x + random(-20, 20), y: p.y, vy: random(-2, -4), alpha: 180, type: 'vapor' });
                }
            } else if (this.temperature < 35) {
                p.size = lerp(p.size, 3, 0.1);
                p.hairAngle = lerp(p.hairAngle, PI/2, 0.1); 
            } else {
                p.size = lerp(p.size, 6, 0.1);
                p.hairAngle = lerp(p.hairAngle, PI/4, 0.1);
            }
        }

        // Cập nhật mạch máu
        for (let bv of this.bloodVessels) {
            let targetThick = (this.temperature > 37) ? map(this.temperature, 37, 42, 2, 12) : map(this.temperature, 30, 37, 1.2, 2);
            bv.thickness = lerp(bv.thickness, targetThick, 0.1);
        }

        // Cập nhật hạt
        for (let i = this.sweatParticles.length - 1; i >= 0; i--) {
            let s = this.sweatParticles[i];
            s.y += s.vy;
            s.alpha -= 5;
            if (s.alpha <= 0) this.sweatParticles.splice(i, 1);
        }
    }

    draw() {
        push();
        background(245);
        
        // Đảm bảo Reset rectMode để không bị lệch hình từ cảnh trước
        rectMode(CORNER);
        noStroke();

        // 1. Vẽ mặt da
        if (this.currentSkinColor) fill(this.currentSkinColor); else fill("#ffdbc5");
        rect(width*0.1, height*0.15, width*0.8, height*0.65, 40);
        
        // 2. Vẽ mạch máu
        push();
        for (let bv of this.bloodVessels) {
            stroke("rgba(255, 0, 0, 0.4)");
            strokeWeight(bv.thickness);
            noFill();
            beginShape();
            // Sử dụng các điểm nối line thay vì curveVertex để tránh lỗi pixels (nếu có)
            for (let x = width * 0.12; x < width * 0.88; x += 30) {
                let y = bv.y + sin(x * 0.025 + frameCount * 0.05) * bv.amplitude;
                vertex(x, y);
            }
            endShape();
        }
        pop();

        // 3. Vẽ lỗ chân lông và lông
        push();
        for (let p of this.pores) {
            noStroke();
            fill(0, 70);
            ellipse(p.x, p.y, p.size);
            
            // Lông dày hơn và rõ hơn
            stroke(60, 120);
            strokeWeight(4);
            line(p.x, p.y, p.x + cos(-p.hairAngle) * 30, p.y + sin(-p.hairAngle) * 30);
        }
        pop();

        // 4. Vẽ mồ hôi và hơi nước
        push();
        for (let s of this.sweatParticles) {
            if (s.type === 'sweat') {
                fill(100, 200, 255, s.alpha);
                ellipse(s.x, s.y, 8, 14);
            } else {
                fill(255, 255, 255, s.alpha * 0.7);
                ellipse(s.x, s.y, random(6, 12), random(6, 12));
            }
        }
        pop();
        
        pop(); // Kết thúc push chính

        // 5. Vẽ UI (Vẽ trên cùng)
        this.backBtn.display();
        this.drawThermometer();
        
        // Hiển thị hướng dẫn
        fill(40);
        textAlign(CENTER, CENTER);
        textSize(22);
        textStyle(BOLD);
        text("Kéo thanh trượt ngang bên dưới để điều chỉnh nhiệt độ", width/2, height - 120);

        // Tiêu đề trang
        fill(0, 100, 200);
        textAlign(CENTER);
        textSize(36);
        textStyle(BOLD);
        text("DA & ĐIỀU HÒA THÂN NHIỆT", width/2, 60);
    }

    drawThermometer() {
        push();
        let tx = 200, ty = 740, tw = 800, th = 24;
        
        fill(0);
        textSize(24);
        textAlign(CENTER);
        text(`Nhiệt độ hiện tại: ${this.temperature.toFixed(1)}°C`, width/2, ty - 35);
        
        // Thân đường chạy nhiệt kế
        rectMode(CENTER);
        fill(230);
        stroke(200);
        strokeWeight(2);
        rect(width/2, ty, tw + 20, th + 10, 20);
        
        // Vạch chuẩn 37
        fill(0, 40);
        rect(tx + map(37, 30, 42, 0, tw), ty, 6, th + 15);
        
        // Kim trượt
        let ix = map(this.temperature, this.minTemp, this.maxTemp, tx, tx + tw);
        noStroke();
        fill(0, 50);
        ellipse(ix + 4, ty + 4, 44); // Shadow
        
        fill(255, 0, 0);
        stroke(255);
        strokeWeight(4);
        ellipse(ix, ty, 38);
        
        if (this.temperature > 37) {
            fill(255, 0, 0, map(this.temperature, 37, 42, 0, 100));
            ellipse(ix, ty, 55); // Heat glow
        } else {
            fill(0, 100, 255, map(this.temperature, 30, 37, 100, 0));
            ellipse(ix, ty, 55); // Cold glow
        }
        pop();
    }

    checkClick() {
        this.backBtn.checkClick();
    }
}
