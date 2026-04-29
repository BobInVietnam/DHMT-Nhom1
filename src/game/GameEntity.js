class GameEntity extends Entity {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    setVelocity(x, y) {
        this.velocity.x = x
        this.velocity.y = y
    }
    /**
     * Standard AABB Collision Check
     * Returns true if this entity overlaps with 'other'
     */
    getCollision(other) {
        return (
            this.x < other.x + other.w &&
            this.x + this.w > other.x &&
            this.y < other.y + other.h &&
            this.y + this.h > other.y
        );
    }

    update() {
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;
    }
}