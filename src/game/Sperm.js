const MAX_HEALTH = 100
const MAX_ENERGY = 100
const SPEED = 200

class Sperm extends GameEntity {
    constructor(x, y, movingSpeed) {
        super(x, y, 40, 40);
        this.movingSpeed = movingSpeed;
        this.health = 100;
        this.energy = 100;
    }

    handleInput() {
        let move = createVector(0, 0);

        if (keyIsDown(LEFT_ARROW))  move.x -= 1;
        if (keyIsDown(RIGHT_ARROW)) move.x += 1;
        if (keyIsDown(UP_ARROW))    move.y -= 1;
        if (keyIsDown(DOWN_ARROW))  move.y += 1;

        // Normalize makes the length 1, then limit/set sets it to SPEED
        move.normalize();
        move.mult(SPEED * (keyIsDown('b') && this.energy > 0 ? 2 : 1));
        if(keyIsDown('b')) this.energy = max(0, this.energy - 1);

        this.velocity.x = move.x + this.movingSpeed;
        this.velocity.y = move.y;
    }

    takeDamage() {
        this.health -= 4;
        if (this.health <= 0) {
            bus.emit("PLAYER_DOWN", null)
        }
    }

    heal() {
        this.health = min(MAX_HEALTH, this.health + 20)
        this.energy = min(MAX_ENERGY, this.energy + 50)
    }

    display() {
        push()
        fill(0, 255, 0);
        rect(this.x, this.y, this.w, this.h);
        pop()
    }
}