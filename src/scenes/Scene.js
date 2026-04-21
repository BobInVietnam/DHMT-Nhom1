class Scene {
    constructor() {
        this.objects = [];
    }

    enter() {}

    draw() {
        for (let object of this.objects) {
            if (typeof object.checkHovered === 'function') object.checkHovered(mouseX, mouseY)
            object.display();
        }
    }

    exit() {}

    checkClick() {
        for (let i = this.objects.length - 1; i >= 0; i--) {
            let object = this.objects[i];
            if (typeof object.checkClick === 'function') {
                if (object.checkClick(mouseX, mouseY)) return;
            }
        }
    }

    checkMouseRelease() {}
    checkMouseDragged() {}
    checkMouseWheel(event) {}
}