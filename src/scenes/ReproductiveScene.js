class ReproductiveScene extends Scene {
    constructor() {
        super();
        this.backBtn = new Button(100, 50, 40, 40, "X", "SWITCH_SCENE", "BodyMap");
        this.objects.push(this.backBtn);
    }

    draw() {
        background(150);
        textAlign(CENTER);
        text("Reproductive System", width / 2, 100);

        super.draw();
    }
}