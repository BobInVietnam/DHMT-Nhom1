class SubScene extends Scene{
    constructor() {
        super()

        let btnX = width / 2;
        let btnY = height / 2;

        this.changeButton = new Button(btnX, btnY, 400, 50, "SWITCH BACK TO MAIN SCENE", "SWITCH_SCENE", "Main");
    }

    enter() {
        console.log("Sub scene")
    }

    draw() {
        background(220)

        push()
        this.changeButton.display()
        pop()
    }

    exit() {
        console.log("Exit sub scene")
    }

    checkClick() {
        this.changeButton.checkClick()
    }
}