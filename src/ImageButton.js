class ImageButton extends Clickable {
    constructor(x, y, w, h, imageName, eventTag, eventData) {
        super(x, y, w, h, eventTag, eventData);
        this.dispimage = assets.get(imageName)
        this.transparency = 255;
    }

    display() {
        push();
        imageMode(CENTER);

        if (this.isHovered()) {
            tint(255, 255, 255, this.transparency);
            cursor(HAND);
        } else {
            cursor(ARROW);
        }
        image(this.dispimage, this.x, this.y, this.w, this.h)
        pop();
    }
}