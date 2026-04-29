const BOOSTER_SIZE = 50

class Booster extends GameEntity {
    constructor(x, y) {
        super(x, y, BOOSTER_SIZE, BOOSTER_SIZE);
    }

    display() {
        push()
        fill(255, 255, 0);
        rect(this.x, this.y, this.w, this.h);
        pop()
    }
}