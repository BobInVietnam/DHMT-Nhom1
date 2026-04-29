class ReproductiveScene extends Scene {
    constructor() {
        super();
        this.backBtn = new Button(100, 50, 40, 40, "X", "SWITCH_SCENE", "BodyMap");
        this.gameBtn = new Button(width/2, height/2, 100, 40, "Game", "SWITCH_SCENE", "Game")
        this.objects.push(this.backBtn, this.gameBtn);
    }

    draw() {
        background(150);
        textAlign(CENTER);
        text("Reproductive System", width / 2, 100);

        super.draw();
    }
}