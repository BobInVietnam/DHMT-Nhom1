class HarmingObject extends GameEntity {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    display() {
        push()
        noStroke();
        image(assets.get("game_wbc") ,this.x, this.y, this.w, this.h);
        
        // Add a pulsing glow using sin() for a "dangerous" look
        let glow = sin(frameCount * 0.1) * 50;
        fill(255, 0, 0, glow);
        rect(this.x - 5, this.y - 5, this.w + 10, this.h + 10);
        pop()
    }
}