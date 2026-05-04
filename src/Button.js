class Button extends Clickable {
  constructor(x, y, w, h, label, eventTag, eventData) {
    super(x, y, w, h, eventTag, eventData)
    this.label = label;
  }

  display() {
    if (!this.isVisible) return

    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    applyVietFont();

    if (this.isHovered) {
      fill(55, 120, 210);
      stroke(35, 90, 175);
      cursor(HAND);
    } else {
      fill(255, 255, 255);
      stroke(160, 185, 220);
      cursor(ARROW);
    }

    strokeWeight(1.5);
    rect(this.x, this.y, this.w, this.h, 10);

    fill(this.isHovered ? 255 : 40);
    noStroke();
    textSize(15);
    textStyle(BOLD);
    text(this.label, this.x, this.y);
    textStyle(NORMAL);
    pop();
  }
}