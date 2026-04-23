class BodyMapScene extends ZoomableScene {
    constructor() {
        super();

        this.human = new ImageEntity(width/2, height/2, 0, height, "male_xray", true)
        this.skin = new Button(100, 100, 150, 50, "Go to Skin", "SWITCH_SCENE", "Skin")
        this.brain = new ImageButton(width/2, height/2 - 330, 100, 100, "brain", "SWITCH_SCENE", "Nervous")
        this.kidney = new ImageButton(width/2, height/2 - 80, 100, 100, "kidney", "SWITCH_SCENE", "Endocrine")
        this.balls = new ImageButton(width/2, height/2 + 50, 50, 50, "balls", "SWITCH_SCENE", "Reproductive")

        this.zoomableObjects.push(this.human, this.brain, this.kidney, this.balls)
        this.objects.push(this.skin)
    }

    draw() {
        background(200)
        super.draw()
    }
}