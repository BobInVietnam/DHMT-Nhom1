class Button extends Entity {
  constructor(x, y, w, h, label, eventTag, eventData) {
    super(x, y, w, h)
    this.label = label;
    this.eventTag = eventTag
    this.eventData = eventData
  }

  display() {
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    // Change color if hovering
    if (this.isHovered()) {
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

  isHovered() {
    return (
      mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2
    );
  }

  checkClick() {
    if (this.isHovered()) {
      bus.emit(this.eventTag, this.eventData)
    }
  }
}