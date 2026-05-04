const CharacterSprite = {
    NORM: "teach_normal", TALK: "teach_talk", EXPL: "teach_explain",
    P_NORM: "teach_point_normal", P_TALK: "teach_point_talk", P_EXPL: "teach_point_explain"
};

class Narrator extends ImageButton {
    constructor(x, y, initialContent) {
        super(x, y, 160, 300, CharacterSprite.NORM, true, "SHOW_NARRATION", initialContent);
        this.isVisible = false;
        
        bus.on("CHANGE_NARRATOR_SPRITE", (sprite) => this.changeSprite(sprite));
    }

    display() {
        if (!this.isVisible || !this.image) return;
        
        push();
        imageMode(CENTER);
        let pulse = this.isHovered ? 10 : 0;
        let targetH = 350; 
        let targetW = targetH * (this.image.width / this.image.height); 
        
        if (this.isHovered) {
            blendMode(ADD); 
            fill(100, 100, 100); 
        }
        
        image(this.image, this.x, this.y, targetW + pulse, targetH + pulse);
        pop();
    }

    changeContent(content) {
        this.eventData = content;
    }

    changeSprite(sprite) {
        this.image = assets.get(sprite);
    }
}