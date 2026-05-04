class Wall extends GameEntity {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    display() {
        push()
        image(assets.get("game_wall") ,this.x, this.y, this.w, this.h);
        pop()
    }
}