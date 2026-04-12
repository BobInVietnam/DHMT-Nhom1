class Scene {
    constructor() {
        this.objects = [];
    }

    enter() {}

    draw() {
        for (let object of this.objects) {
            object.display();
        }
    }

    exit() {}

    checkClick() {
        for (let object of this.objects) {
            object.checkClick();
        }
    }
}