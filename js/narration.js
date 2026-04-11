class Narration {
  constructor() {
    this.isVisible = false;
    this.text = "";
    this.x = 0;
    this.y = 0;
  }

  show(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  draw() {
    if (!this.isVisible) return; 
    
    push();
    fill(255, 255, 255, 240); 
    stroke(100, 150, 255);    
    strokeWeight(2);
    rect(this.x, this.y, 350, 150, 15); 

    fill(0);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    text(this.text, this.x + 20, this.y + 20, 310, 110); 
    fill(255, 80, 80);
    ellipse(this.x + 350, this.y, 24, 24); 
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    text("X", this.x + 350, this.y); 
    pop();
  }

  checkClick(mx, my) {
    if (!this.isVisible) return false;
    
    let d = dist(mx, my, this.x + 350, this.y);
    if (d < 12) { 
      this.hide();
      return true; 
    return false;
  }
}
}