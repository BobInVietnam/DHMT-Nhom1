const NervousSceneContent = {
    text: [
        "Chào mừng bạn đến với bài học về Hệ Thần Kinh!",
        "Hệ thần kinh bao gồm: bộ não, tủy sống và các cơ quan thụ cảm.",
        "Mô hình 2D bên trái cho thấy sự kết nối giữa các dây thần kinh.",
        "Bạn có thể nhấn vào Mắt hoặc Tai để tìm hiểu sâu hơn về cấu tạo 3D của chúng.",
        "Hãy thử khám phá nhé!"
    ],
    sprite: [
        CharacterSprite.TALK,
        CharacterSprite.NORM,
        CharacterSprite.EXPL,
        CharacterSprite.TALK,
        CharacterSprite.NORM
    ]
};

class NervousScene extends Scene {
    constructor() {
        super();

        this.backBtn = new Button(100, 50, 150, 40, "Quay lại", "SWITCH_SCENE", "BodyMap");
        this.eyeBtn = new Button(width / 2 - 120, height / 2 - 150, 120, 40, "Mắt (Thị giác)", "SWITCH_SCENE", "EyeDetail");
        this.earBtn = new Button(width / 2 + 120, height / 2 - 100, 120, 40, "Tai (Thính giác)", "SWITCH_SCENE", "EarDetail");

        this.narration = new Narration(950, 350);
        this.narrator = new Narrator(800, 600, NervousSceneContent);

        this.objects.push(
            this.backBtn, 
            this.eyeBtn, 
            this.earBtn, 
            this.narration, 
            this.narrator
        );
    }

    draw() {
        background(240);

        push();
        fill(30);
        textSize(35);
        textStyle(BOLD);
        textAlign(CENTER);
        text("HỆ THẦN KINH", width / 2, 60);
        pop();

        this.drawNervousSystem2D();

        super.draw();
    }

    drawNervousSystem2D() {
        push();
        stroke(100, 150, 255);
        strokeWeight(5);
        line(width / 2, 180, width / 2, height - 150);
        
        fill(255, 200, 200);
        stroke(200, 50, 50);
        ellipse(width / 2, 150, 100, 80);
        
        strokeWeight(2);
        for(let i = 0; i < 5; i++) {
            line(width/2, 250 + i*50, width/2 - 100, 280 + i*60);
            line(width/2, 250 + i*50, width/2 + 100, 280 + i*60);
        }
        
        fill(0);
        noStroke();
        textSize(16);
        textAlign(CENTER);
        text("Sơ đồ hệ thần kinh 2D", width/2, height - 100);
        pop();
    }
}