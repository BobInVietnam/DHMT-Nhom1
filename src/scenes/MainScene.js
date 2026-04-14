class MainScene extends Scene {
    constructor() {
        super();

        let btnX = width / 2;
        let btnY = height / 2;

        this.startBtn = new Button(btnX, btnY, 250, 60, "START", "SWITCH_SCENE", "BodyMap");
        this.imgBtn = new ImageButton(100, 100, 100, 100, "Body::Liver", "SWITCH_SCENE", "BodyMap");
        this.objects.push(this.startBtn);
        this.objects.push(this.imgBtn);
    }

    draw() {
        background(220);
        textSize(32);
        textAlign(CENTER);
        text("Human Body App", width / 2, 150);

        super.draw();
    }
}