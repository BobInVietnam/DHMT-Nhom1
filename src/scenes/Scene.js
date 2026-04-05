class Scene {
    constructor() {
        this.mouseBlocking = false
        this.objects = []
    }
    enter() {}

    draw() {
        for (object in this.objects) {
            object.display()
        } 
    }

    exit() {}

    checkClick() {}
}