class ReproductiveSystemScene extends Scene {
    constructor(bodyImg) {
        super();
        this.bodyImg = bodyImg;
        this.backBtn = new Button(100, 50, 150, 40, "QUAY LẠI", "SWITCH_SCENE", "Main");
    }

    draw() {
        background(240, 255, 240);
        
        fill(50);
        textAlign(CENTER);
        textSize(32);
        textStyle(BOLD);
        text("HỆ SINH SẢN", width/2, height/2);
        
        textSize(20);
        textStyle(NORMAL);
        text("(Nội dung đang được cập nhật...)", width/2, height/2 + 50);

        this.backBtn.display();
    }

    checkClick() {
        this.backBtn.checkClick();
    }
}
