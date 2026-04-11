class Character {
  constructor() {
    this.isVisible = false;
    this.x = 0;
    this.y = 0;
    // đổi link ảnh 
    // this.img = loadImage('assets/cogiao.png'); 
  }

  show(x, y) {
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
    // Nếu có ảnh thì dùng: image(this.img, this.x, this.y, 100, 200);
    
    // giả lập nhân vật
    fill(200, 220, 255);
    rect(this.x, this.y, 80, 180, 10); 
    fill(0);
    textAlign(CENTER, CENTER);
    text("Cô\ngiáo", this.x + 40, this.y + 90);
    pop();
  }
}