class Button extends Entity {
  constructor(x, y, w, h, label, eventTag, eventData) {
    super(x, y, w, h)
    this.label = label;
    this.eventTag = eventTag;
    this.eventData = eventData;
    
    // Sử dụng chuỗi màu thay vì đối tượng color() của p5.js trong constructor
    this.baseColorHex = "#ffffff";
    this.hoverColorHex = "#dde6ff";
    this.shadowColorHex = "rgba(0, 0, 0, 0.1)";
  }

  display() {
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    // Kiểm tra trạng thái chuột
    let isHover = this.isHovered();

    // Hiệu ứng bóng đổ
    noStroke();
    fill(this.shadowColorHex);
    rect(this.x + 4, this.y + 4, this.w, this.h, 12);

    // Vẽ thân nút
    if (isHover) {
      fill(this.hoverColorHex);
      stroke("#0078ff");
      strokeWeight(3);
      cursor(HAND);
    } else {
      fill(this.baseColorHex);
      stroke("#969696");
      strokeWeight(2);
    }
    rect(this.x, this.y, this.w, this.h, 10);

    // Vẽ nhãn (Label)
    fill(0);
    noStroke();
    textSize(20);
    textStyle(BOLD);
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
      if (this.eventTag) {
        bus.emit(this.eventTag, this.eventData);
      }
    }
  }
}