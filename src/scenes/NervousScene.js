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

        this.step = 0
        this.backBtn = new Button(100, 50, 150, 40, "Quay lại", "SWITCH_SCENE", "BodyMap");
        this.eyeBtn = new CircleButton(width / 2 - 120, height / 2 - 150, 30, "NEXT_NERVE_STEP", 1, "Mắt");
        this.earBtn = new CircleButton(width / 2 + 120, height / 2 - 100, 30, "NEXT_NERVE_STEP", 2, "Tai");
        this.nervous = new ImageEntity(width/2, height/2, 0, height - 100, "male_nerve", true)

        this.narrator = new Narrator(800, 600, NervousSceneContent);
        this.narration = new Narration(950, 350);

        this.objects.push(
            this.nervous,
            this.backBtn, 
            this.eyeBtn, 
            this.earBtn, 
            this.narration, 
            this.narrator,
        );


    }

    enter() {
        this.step = 0
        this.eyeBtn.hide()
        this.earBtn.hide()
        this.narrator.show();
        bus.emit('SHOW_NARRATION', NervousSceneContent);
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

        super.draw();
    }

}