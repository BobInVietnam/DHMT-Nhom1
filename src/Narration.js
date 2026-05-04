class Narration extends Clickable {
    constructor(x, y) {
        super(x, y, 400, 160, "RUN_NARRATION", null); 
        this.isVisible = false;
        this.contents = {text: [], sprite: []};        
        this.currentIndex = 0;
        
        bus.on("SHOW_NARRATION", (content) => {this.showContent(content)});
        bus.on("RUN_NARRATION", () => {
            this.currentIndex++;
            if (this.currentIndex >= this.contents.text.length) {
                bus.emit("FINISH_NARRATION"); 
                return;
            }
            if (this.contents.sprite && this.contents.sprite[this.currentIndex]) {
                bus.emit("CHANGE_NARRATOR_SPRITE", this.contents.sprite[this.currentIndex]);
            }
        });
        bus.on("FINISH_NARRATION", () => {
            this.isVisible = false; 
        });
    }

    showContent(content) {
        this.contents = content; 
        this.currentIndex = 0;  
        if (this.contents.sprite && this.contents.sprite[this.currentIndex]) {
            bus.emit("CHANGE_NARRATOR_SPRITE", this.contents.sprite[this.currentIndex]);
        }
        this.isVisible = true;
    }

    checkHovered(mx = mouseX, my = mouseY) {
        this.isHovered = (mx >= this.x && mx <= this.x + this.w && my >= this.y && my <= this.y + this.h);
    }

    checkClick(mx, my) {
        if (!this.isVisible) return false;
        if (mx >= this.x && mx <= this.x + this.w && my >= this.y && my <= this.y + this.h) {
            bus.emit("RUN_NARRATION");
            return true; 
        }
        return false;
    }

    display() {
        if (!this.isVisible) return;
        
        push();
        fill(245, 238, 219, 245); 
        stroke(120, 140, 180);
        strokeWeight(2);
        rectMode(CORNER); 
        rect(this.x, this.y, this.w, this.h, 15); 
        
        noStroke();
        triangle(this.x + 80, this.y + this.h - 2, this.x + 110, this.y + this.h - 2, this.x + 95, this.y + this.h + 20);
        stroke(120, 140, 180);
        line(this.x + 80, this.y + this.h, this.x + 95, this.y + this.h + 20);
        line(this.x + 110, this.y + this.h, this.x + 95, this.y + this.h + 20);

        fill(40);
        noStroke();
        textSize(16);
        textAlign(LEFT, TOP);
        
        if (this.contents && this.contents.text && this.contents.text.length > 0) {
            let currentText = this.contents.text[this.currentIndex]; 
            text(currentText, this.x + 25, this.y + 25, this.w - 50, this.h - 50); 
        }

        if (this.currentIndex < this.contents.text.length - 1) {
            fill(120, 140, 180);
            textSize(20);
            text("▼", this.x + this.w - 35, this.y + this.h - 35);
        }
        pop();
    }
}