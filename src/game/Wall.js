class Wall extends GameEntity {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    display() {
        push()
        fill(100, 100, 255);
        rect(this.x, this.y, this.w, this.h);
        pop()
    }
}