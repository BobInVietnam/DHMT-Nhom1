const BOOSTER_SIZE = 50

class Booster extends GameEntity {
    constructor(x, y) {
        super(x, y, BOOSTER_SIZE, BOOSTER_SIZE);
    }

    display() {
        push()
        image(assets.get("game_boost") ,this.x, this.y, this.w, this.h);
        pop()
    }
}