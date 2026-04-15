class ImageButton extends Clickable {
    constructor(x, y, w, h, imageName, eventTag, eventData) {
        super(x, y, w, h, eventTag, eventData);
        this.dispimage = assets.get(imageName)
    }

    display() {
        push();
        imageMode(CENTER);
        image(this.dispimage, this.x, this.y, this.w, this.h)
        if (this.isHovered()) {
            cursor(HAND);
        } else {
            cursor(ARROW);
        }
        pop();
    }
}