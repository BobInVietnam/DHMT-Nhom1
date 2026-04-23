class Narration extends Entity {
    constructor() {
        super(0, 0, 350, 150); 
        this.isVisible = false;
        this.texts = [];        
        this.currentIndex = 0;  
    }

    show(textArray, posX, posY) {
        this.texts = textArray; 
        this.currentIndex = 0;  
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
        fill(255, 255, 255, 240);
        stroke(100, 150, 255);
        strokeWeight(2);
        rect(this.x, this.y, this.w, this.h, 15); 

        fill(0);
        noStroke();
        textSize(16);
        textAlign(LEFT, TOP);
        let currentText = this.texts[this.currentIndex]; 
        text(currentText, this.x + 20, this.y + 20, this.w - 40, this.h - 40); 

        if (this.currentIndex < this.texts.length - 1) {
            fill(100, 150, 255);
            textSize(20);
            text("▼", this.x + this.w - 30, this.y + this.h - 30);
        }

        fill(255, 80, 80);
        ellipse(this.x + this.w, this.y, 24, 24); 
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(14);
        text("X", this.x + this.w, this.y); 
        pop();
    }

    checkClick(mx, my) {
        if (!this.isVisible) return false;
        
        let d = dist(mx, my, this.x + this.w, this.y);
        if (d < 12) {
            bus.emit("HIDE_INFO"); 
            return true; 
        }

        if (mx >= this.x && mx <= this.x + this.w && my >= this.y && my <= this.y + this.h) {
            this.currentIndex++; 
            if (this.currentIndex >= this.texts.length) {
                bus.emit("HIDE_INFO"); 
            }
            return true; 
        }

        return false;
    }
}