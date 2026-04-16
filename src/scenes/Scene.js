class Scene {
    constructor() {
        this.mouseBlocking = false
        this.objects = []
    }
    enter() {}

    update(dt) {
        for (let object of this.objects) {
            if (typeof object.update === 'function') {
                object.update(dt);
            }
        }
    }

    draw() {
        for (let object of this.objects) {
            object.display();
        } 
    }

    exit() {}

    checkClick() {}
}