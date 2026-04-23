class Character extends Entity {
    constructor() {
        super(0, 0, 150, 300);
        this.isVisible = false;
        //load ảnh
    }

    show(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.isVisible = true;
    }

    hide() {
        this.isVisible = false;
    }

    display() {
        if (!this.isVisible) return;
        
        push();
        fill(200, 220, 255);
        rect(this.x, this.y, this.w, this.h, 10); 
        fill(0);
        textAlign(CENTER, CENTER);
        text("Cô\ngiáo", this.x + this.w / 2, this.y + this.h / 2);
        pop();
    }
}