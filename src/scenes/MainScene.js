const MainSceneContent = {
    text: [
        "Chào mừng đến với lớp học!",
        "Chương trình này sẽ dạy cho các bạn về kiến thức sinh học lớp 8",
        "Bạn hãy ấn START để bắt đầu nhé"
    ],
    sprite: [
        CharacterSprite.TALK,
        CharacterSprite.EXPL,
        CharacterSprite.NORM
    ]
}

class MainScene extends Scene {
    constructor() {
        super();

        let btnX = width / 2;
        let btnY = height / 2;
        this.startBtn = new Button(btnX, btnY, 250, 60, "START", "SWITCH_SCENE", "BodyMap");
        this.narration = new Narration(950, 350)
        this.narrator = new Narrator(800, 600, MainSceneContent)

        this.objects.push(this.startBtn, this.narrator, this.narration);
    }

    draw() {
        background(255);
        push()
        textSize(32)
        textStyle(BOLD)
        textAlign(CENTER, CENTER)
        rectMode(CENTER)
        text("Chào mừng đến với Lớp Học!", width/2, height/2 - 200, 600, 200)
        pop()
        super.draw();
    }
}