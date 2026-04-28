class BodyMapScene extends ZoomableScene {
    constructor() {
        super();

        this.human     = new ImageEntity(width/2, height/2, 0, height, "male_xray", true)
        this.leftHand  = new CircleButton(494, 337, 16, "SWITCH_SCENE", "Skin")
        this.rightHand = new CircleButton(710, 337, 16, "SWITCH_SCENE", "Skin")
        this.brain     = new ImageButton(width/2, height/2 - 330, 100, 100, "brain",  false, "SWITCH_SCENE", "Nervous")
        this.kidney    = new ImageButton(width/2, height/2 - 80,  100, 100, "kidney", false, "SWITCH_SCENE", "Endocrine")
        this.balls     = new ImageButton(width/2, height/2 + 50,   50,  50, "balls",  false, "SWITCH_SCENE", "Reproductive")

        this.zoomableObjects.push(this.human, this.leftHand, this.rightHand, this.brain, this.kidney, this.balls)
    }

    enter() {
        this.camera.x    = 0;
        this.camera.y    = 0;
        this.camera.zoom = 1.0;
    }

    // Body map uses fixed camera — no accidental panning
    checkMouseDragged() {}

    draw() {
        background(200)
        super.draw()
    }
}