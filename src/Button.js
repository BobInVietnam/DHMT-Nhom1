class Button extends Clickable {
  constructor(x, y, w, h, label, eventTag, eventData) {
    super(x, y, w, h, eventTag, eventData)
    this.label = label;
  }

  display() {
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    // Change color if hovering
    if (this.isHovered) {
      fill(200);
      cursor(HAND);
    } else {
      fill(240);
      cursor(ARROW);
    }

    // Draw button shape
    stroke(50);
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h, 10);

    // Draw label
    fill(0);
    noStroke();
    textSize(16);
    text(this.label, this.x, this.y);
    pop();
  }
}