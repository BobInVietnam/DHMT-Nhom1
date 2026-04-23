class Entity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.isVisible = true;
    }

    setPos(x, y) {
        this.x = x
        this.y = y
    }

    getPos() {
        return {"x": this.x, "y": this.y}
    }

    setSize(w, h) {
        this.w = w
        this.h = h
    }

    getSize() {
        return {"w": this.w, "h": this.h}
    }

    show() {
        this.isVisible = true;
    }

    hide() {
        this.isVisible = false;
    }
    display() {
        if (!this.isVisible) return
    }
}