class BodyMapScene extends Scene {
    constructor() {
        super();
        this.skin = new Button(100, 100, 150, 50, "Go to Skin", "SWITCH_SCENE", "Skin")
        this.brain = new ImageButton(width/2, height/2 - 330, 100, 100, "brain", "SWITCH_SCENE", "Nervous")
        this.kidney = new ImageButton(width/2, height/2 - 80, 100, 100, "kidney", "SWITCH_SCENE", "Endocrine")
        this.balls = new ImageButton(width/2, height/2 + 50, 50, 50, "balls", "SWITCH_SCENE", "Reproductive")
        this.objects.push(this.skin)
        this.objects.push(this.brain)
        this.objects.push(this.kidney)
        this.objects.push(this.balls)
    }

    draw() {
        background(200);
        push()
        imageMode(CENTER)
        image(assets.get("male_xray"), width/2, height/2, 400, 800)
        pop()
        super.draw();
    }
}