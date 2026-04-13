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
                texts: [
                  "Chào các bạn, đây là hệ thần kinh trung ương.",
                  "Nó bao gồm não bộ nằm trong hộp sọ, và tủy sống nằm trong cột sống.",
                  "Não bộ là cơ quan phức tạp nhất, giúp điều khiển mọi hoạt động có ý thức của chúng ta."
                ],
                boxX: 500, boxY: 50, charX: 420, charY: 100
            },
            { 
                id: "eye", name: "Cơ quan thị giác", x: 400, y: 180, r: 30,
                texts: [
                  "Các bạn đang xem cấu tạo của mắt.",
                  "Mắt đóng vai trò như một chiếc máy ảnh sinh học thu nhận ánh sáng.",
                  "Nhờ có mắt, ta có thể phân biệt được màu sắc và hình dáng của vạn vật."
                ],
                boxX: 500, boxY: 150, charX: 420, charY: 180
            }
            //tương tự thêm ngoặc vuông [] phân tách bằng dấu phẩy cho Da và Hệ sinh dục
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
                    texts: part.texts, 
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