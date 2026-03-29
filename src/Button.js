class Button {
  constructor(x, y, w, h, label, onClick) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.onClick = onClick;
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
      this.onClick(); // Run the provided function
    }
  }
}