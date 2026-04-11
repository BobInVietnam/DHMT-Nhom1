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
                id: "brain", name: "Hệ thần kinh", x: 400, y: 120, r: 40, 
                info: "Hệ thần kinh bao gồm não bộ, tủy sống và các dây thần kinh. Não bộ là trung tâm điều khiển mọi hoạt động có ý thức của cơ thể.",
                boxX: 500, boxY: 50, charX: 420, charY: 100
            },
            { 
                id: "eye", name: "Cơ quan thị giác", x: 400, y: 180, r: 30,
                info: "Mắt là cơ quan phân tích thị giác, giúp chúng ta tiếp nhận ánh sáng, hình ảnh và màu sắc từ môi trường xung quanh.",
                boxX: 500, boxY: 150, charX: 420, charY: 180
            },
            { 
                id: "skin", name: "Da", x: 400, y: 300, r: 80,
                info: "Da bao bọc toàn thân, là cơ quan có diện tích lớn nhất. Da có chức năng bảo vệ cơ thể, điều hòa thân nhiệt và bài tiết mồ hôi.",
                boxX: 500, boxY: 270, charX: 420, charY: 300
            },
            { 
                id: "reproductive", name: "Hệ sinh dục", x: 400, y: 500, r: 60,
                info: "Hệ sinh dục đảm nhiệm chức năng sinh sản, duy trì nòi giống qua các thế hệ. Cấu tạo cơ quan sinh dục nam và nữ có sự khác biệt rõ rệt.",
                boxX: 500, boxY: 450, charX: 420, charY: 480
            }
        ];
    }

    enter() {
        console.log("Main scene")
    }

    draw() {
        background(220)

        push()

        this.myButton.display()
        this.changeButton.display()

        if (this.showCircle) {
            circle(600, 300, 50)
        }

        this.drawBodyParts()

        pop()
    }

    drawBodyParts() {
        for (let part of this.bodyParts) {
            let d = dist(mouseX, mouseY, part.x, part.y);

            if (d < part.r) {
                fill(255, 0, 0, 100); 
            } else {
                fill(0, 0, 255, 50); 
            }

            noStroke();
            ellipse(part.x, part.y, part.r * 2);
        }
    }

    exit() {
        console.log("Exit main scene")
    }

    // CLICK
    checkClick() {
        this.myButton.checkClick()
        this.changeButton.checkClick()

        for (let part of this.bodyParts) {
            let d = dist(mouseX, mouseY, part.x, part.y);

            if (d < part.r) {
                bus.emit("SHOW_INFO", {
                    text: part.info,
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