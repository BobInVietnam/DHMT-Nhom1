class BodyMapScene extends ZoomableScene {
    constructor() {
        super();

        this.switchGenderButton = new Button(200, 80, 260, 40, "Thay đổi giới tính", "SWITCH_GENDER", null)
        this.isMale = true

        this.male     = new ImageEntity(width/2, height/2, 0, height, "male_xray", true)
        this.female   = new ImageEntity(width/2, height/2, 0, height, "female_xray", true)
        this.leftHand  = new CircleButton(494, 337, 16, "SWITCH_SCENE", "Skin")
        this.rightHand = new CircleButton(710, 337, 16, "SWITCH_SCENE", "Skin")
        this.brain     = new ImageButton(width/2, height/2 - 330, 100, 100, "brain",  false, "SWITCH_SCENE", "Nervous")
        this.kidney    = new ImageButton(width/2, height/2 - 80,  100, 100, "kidney", false, "SWITCH_SCENE", "Endocrine")
        this.balls     = new ImageButton(width/2, height/2 + 50,   50,  50, "balls",  false, "SWITCH_SCENE", "Reproductive")
        this.vagina     = new ImageButton(width/2 + 3, height/2 + 10,   50,  60, "vagina",  true, "SWITCH_SCENE", "Reproductive")

        this.vagina.hide()
        this.female.hide()

        this.objects.push(this.switchGenderButton)
        this.zoomableObjects.push(this.male, this.female, this.leftHand, this.rightHand, this.brain, this.kidney, this.balls, this.vagina)

        bus.on("SWITCH_GENDER", () => {
            this.isMale = !this.isMale
            if (this.isMale) {
                this.male.show()
                this.balls.show()
                this.vagina.hide()
                this.female.hide()
            } else {
                this.male.hide()
                this.balls.hide()
                this.vagina.show()
                this.female.show()
            }
        })
    }

    enter() {
        this.camera.x    = 0;
        this.camera.y    = 0;
        this.camera.zoom = 1.0;
    }

    draw() {
        background(200)
        super.draw()
    }
}