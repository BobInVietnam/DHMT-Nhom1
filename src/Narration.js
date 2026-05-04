class Narration extends Clickable {
    constructor(x, y) {
        super(x, y, 400, 160, "RUN_NARRATION", null); 
        this.hide();
        this.contents = {text: [], sprite: []};        
        this.currentIndex = 0;
        
        bus.on("SHOW_NARRATION", (content) => {this.showContent(content)})
        bus.on("RUN_NARRATION", () => {
            this.currentIndex++;
            if (this.currentIndex >= this.contents.text.length) {
                bus.emit("FINISH_NARRATION"); 
                return;
            }
            if (this.contents.sprite && this.contents.sprite[this.currentIndex]) {
                bus.emit("CHANGE_NARRATOR_SPRITE", this.contents.sprite[this.currentIndex]);
            }
        })
        bus.on("FINISH_NARRATION", () => {
            this.hide();
        })
    }

    showContent(content) {
        this.contents = content; 
        this.currentIndex = 0;  
        if (this.contents.sprite && this.contents.sprite[this.currentIndex]) {
            bus.emit("CHANGE_NARRATOR_SPRITE", this.contents.sprite[this.currentIndex]);
        }
        this.show();
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
        fill(255, 255, 255, 240);
        stroke(100, 150, 255);
        strokeWeight(2);
        rectMode(CORNER); 
        rect(this.x, this.y, this.w, this.h, 15); 

        fill(0);
        noStroke();
        textSize(16);
        textAlign(LEFT, TOP);
        
        if (this.contents && this.contents.text && this.contents.text.length > 0) {
            let currentText = this.contents.text[this.currentIndex]; 
            text(currentText, this.x + 20, this.y + 20, this.w - 40, this.h - 40); 
        }

        if (this.currentIndex < this.contents.text.length - 1) {
            fill(100, 150, 255);
            textSize(20);
            text("▼", this.x + this.w - 35, this.y + this.h - 35);
        }
        pop();
    }
}