class MainScene extends Scene{
    constructor() {
        super()

        let btnX = width / 2;
        let btnY = height / 2;

        this.myButton = new Button(btnX, btnY, 150, 50, "CLICK ME", "SHOW_CIRCLE", null);
        this.showCircle = false
        this.changeButton = new Button(btnX, btnY + 75, 200, 50, "SWITCH SCENE", "SWITCH_SCENE", "Sub");

        bus.on("SHOW_CIRCLE", () => {this.showCircle = !this.showCircle})
    }

    enter() {
        console.log("Main scene")
    }

    draw() {
        background(220)

        push()
        
        this.myButton.display()
        this.changeButton.display()
        if (this.showCircle) {
            circle(600, 300, 50)
        }

        pop()
    }

    exit() {
        console.log("Exit main scene")
    }

    checkClick() {
        this.myButton.checkClick()
        this.changeButton.checkClick()
    }
}