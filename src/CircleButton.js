class CircleButton extends Clickable {
    constructor(x, y, r, eventTag, eventData) {
        super(x, y, r * 2, r * 2, eventTag, eventData);
        this.r = r;
    }

    checkHovered(mx, my) {
        this.isHovered = dist(mx, my, this.x, this.y) < this.r;
    }

    display() {
        if (!this.isVisible) return;
        push();
        noStroke();
        fill(255, 255, 255, this.isHovered ? 220 : 140);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
        pop();
    }
}
