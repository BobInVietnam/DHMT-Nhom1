class CircleButton extends Clickable {
    constructor(x, y, r, eventTag, eventData, label = '') {
        super(x, y, r * 2, r * 2, eventTag, eventData);
        this.r = r;
        this.label = label;
    }

    checkHovered(mx, my) {
        this.isHovered = dist(mx, my, this.x, this.y) < this.r;
    }

    display() {
        if (!this.isVisible) return;
        push();
        stroke(this.isHovered ? color(80, 160, 255) : color(220, 235, 255));
        strokeWeight(2);
        fill(255, 255, 255, this.isHovered ? 200 : 100);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
        if (this.label) {
            applyVietFont();
            noStroke();
            fill(this.isHovered ? color(32) : color(160));
            textSize(11); textStyle(BOLD); textAlign(CENTER, TOP);
            text(this.label, this.x, this.y + this.r + 4);
            textStyle(NORMAL);
        }
        pop();
    }
}
