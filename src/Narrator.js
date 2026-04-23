const CharacterSprite = {
    NORM: "teach_normal",
    TALK: "teach_talk",
    EXPL: "teach_explain",
    P_NORM: "teach_point_normal",
    P_TALK: "teach_point_talk",
    P_EXPL: "teach_point_explain"
}

class Narrator extends ImageButton {
    constructor(x, y, initialContent) {
        super(x, y, 0, 300, CharacterSprite.NORM, true, "SHOW_NARRATION", initialContent);
        this.isVisible = true;
        bus.on("CHANGE_NARRATOR_SPRITE", (sprite) => this.changeSprite(sprite))
    }

    changeContent(content) {
        this.eventData = content
    }

    changeSprite(sprite) {
        this.image = assets.get(sprite)
    }

    display() {
        if (!this.isVisible) return

        push()
        imageMode(CENTER)
        let pulse = 0
        if (this.isHovered) {
            pulse = 10
        }
        image(this.image, this.x, this.y, this.w + pulse, this.h + pulse)
        pop();
    }
}