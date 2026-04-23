class SkinScene extends Scene {
    constructor() {
        super();
        this.backBtn = new Button(100, 50, 150, 40, "Back", "SWITCH_SCENE", "BodyMap");
        this.objects.push(this.backBtn);
    }

    draw() {
        background(160);
        textAlign(CENTER);
        text("Skin & Temperature", width / 2, 100);

        super.draw();
    }
}