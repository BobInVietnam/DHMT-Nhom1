class NervousScene extends Scene {
    constructor() {
        super();
        this.backBtn = new Button(100, 50, 150, 40, "Back", "SWITCH_SCENE", "BodyMap");
        this.objects.push(this.backBtn);
    }

    draw() {
        background(180);
        textAlign(CENTER);
        text("Nervous System", width / 2, 100);

        super.draw();
    }
}