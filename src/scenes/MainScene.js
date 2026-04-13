class MainScene extends Scene {
    constructor() {
        super()

        let btnX = width / 2;
        let btnY = height / 2;
        this.myButton = new Button(btnX, btnY, 150, 50, "CLICK ME", "SHOW_CIRCLE", null);
        this.showCircle = false;
        this.changeButton = new Button(btnX, btnY + 75, 200, 50, "SWITCH SCENE", "SWITCH_SCENE", "Sub");

        bus.on("SHOW_CIRCLE", () => {
            this.showCircle = !this.showCircle;
        });

        this.bodyParts = [
            { 
                id: "nervous_system", name: "Hệ thần kinh", x: 400, y: 120, r: 40, 
                texts: [
                  "Chào các bạn, đây là Hệ thần kinh.",
                  "Mô hình này bao gồm não bộ, cột sống, các cơ quan thụ cảm (như mắt, tai) và các dây thần kinh.",
                  "Hệ thần kinh giúp cơ thể tiếp nhận và phản ứng lại với các kích thích từ môi trường."
                ],
                boxX: 500, boxY: 50, charX: 420, charY: 100
            },
            { 
                id: "endocrine_system", 
                name: "Hệ nội tiết (Tuyến tụy)", 
                x: 400, y: 250, r: 30,
                texts: [
                  "Đây là Hệ nội tiết, và cơ quan các em đang chọn là Tuyến tụy.",
                  "Hệ nội tiết bao gồm nhiều tuyến khác nhau, đóng vai trò tiết ra hormone.",
                  "Các hormone này đi thẳng vào máu và giúp điều hòa các quá trình sinh lý của cơ thể."
                ],
                boxX: 500, boxY: 180, charX: 420, charY: 230
            },
            { 
                id: "skin_system", 
                name: "Da & Điều hòa thân nhiệt", 
                x: 300, y: 350, r: 45,
                texts: [
                  "Chúng ta đang quan sát cấu tạo của Da.",
                  "Da được cấu tạo từ nhiều lớp: Lớp biểu bì, lớp bì và lớp mỡ dưới da.",
                  "Da đóng vai trò vô cùng quan trọng trong việc bảo vệ cơ thể và điều hòa thân nhiệt.",
                  "Khi trời nóng, mạch máu dưới da dãn ra, lỗ chân lông nở và tiết mồ hôi để giảm nhiệt.",
                  "Khi trời lạnh, mạch máu co lại, lông dựng lên để giữ ấm cho cơ thể."
                ],
                boxX: 400, boxY: 250, charX: 320, charY: 300
            },
            { 
                id: "reproductive_system", 
                name: "Hệ sinh sản", 
                x: 400, y: 500, r: 50,
                texts: [
                  "Đây là Hệ sinh sản.",
                  "Hệ cơ quan này đảm nhiệm chức năng sinh sản, duy trì nòi giống qua các thế hệ.",
                  "Sau khi tìm hiểu xong bài học này, các em có thể tham gia minigame: Tinh trùng vượt chướng ngại vật!"
                ],
                boxX: 500, boxY: 420, charX: 420, charY: 450
            }
        ];
    }

    enter() {
        console.log("Đã vào Main scene - Màn hình chính");
    }

    draw() {
        background(240);

        push()
        //nút test
        this.myButton.display()
        this.changeButton.display()
        if (this.showCircle) {
            circle(600, 300, 50)
        }

        //thay bằng ảnh X-ray/2D
        this.drawBodyParts()
        pop()
    }

    drawBodyParts() {
        for (let part of this.bodyParts) {
            let d = dist(mouseX, mouseY, part.x, part.y);

            if (d < part.r) {
                fill(255, 200, 100, 150); 
            } else {
                fill(100, 150, 255, 80); 
            }

            noStroke();
            ellipse(part.x, part.y, part.r * 2);

            fill(50);
            textAlign(CENTER);
            textSize(14);
            text(part.name, part.x, part.y - part.r - 10);
        }
    }

    exit() {
        console.log("Thoát khỏi Main scene");
    }

    //CLICK
    checkClick() {
        this.myButton.checkClick()
        this.changeButton.checkClick()

        for (let part of this.bodyParts) {
            let d = dist(mouseX, mouseY, part.x, part.y);

            if (d < part.r) {
                bus.emit("SHOW_INFO", {
                    texts: part.texts,  //kịch bản
                    boxX: part.boxX,
                    boxY: part.boxY,
                    charX: part.charX,
                    charY: part.charY
                });

                return true; 
            }
        }
    }
}