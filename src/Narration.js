class Narration extends Clickable {
    constructor(x, y) {
        super(x, y, 400, 175, "RUN_NARRATION", null);
        this.hide();
        this.contents = {text: [], sprite: []};        
        this.currentIndex = 0;
        bus.on("SHOW_NARRATION", (content) => {this.showContent(content)})
        bus.on("RUN_NARRATION", () => {
            this.currentIndex++;
            if (this.currentIndex == this.contents.text.length) {
                bus.emit("FINISH_NARRATION"); 
                return
            }
            bus.emit("CHANGE_NARRATOR_SPRITE", this.contents.sprite[this.currentIndex])
        })
        bus.on("FINISH_NARRATION", () => {
            this.hide()
        })
    }

    showContent(content) {
        this.contents = content; 
        this.currentIndex = 0;  
        bus.emit("CHANGE_NARRATOR_SPRITE", this.contents.sprite[this.currentIndex])
        this.show()
    }

    display() {
        if (!this.isVisible) return

        push();
        // Drop-shadow layer
        noStroke(); fill(0, 0, 0, 30);
        rectMode(CENTER);
        rect(this.x + 3, this.y + 3, this.w, this.h, 15);

        fill(250, 252, 255, 248);
        stroke(80, 130, 230);
        strokeWeight(2);
        rect(this.x, this.y, this.w, this.h, 15);

        applyVietFont();
        fill(25, 35, 70);
        noStroke();
        textSize(16);
        textAlign(LEFT, TOP);
        rectMode(CORNER);
        let currentText = this.contents.text[this.currentIndex];
        let tx = this.x - this.w / 2 + 18;
        let ty = this.y - this.h / 2 + 16;
        text(currentText, tx, ty, this.w - 36, this.h - 44);

        if (this.currentIndex < this.contents.text.length - 1) {
            fill(80, 130, 230);
            textSize(18);
            textAlign(RIGHT, BOTTOM);
            text("▼", this.x + this.w / 2 - 14, this.y + this.h / 2 - 8);
        }
        pop();
    }
}