class ImageButton extends Clickable {
    constructor(x, y, w, h, imageName, eventTag, eventData) {
        super(x, y, w, h, eventTag, eventData);
        this.dispimage = assets.get(imageName)
        this.transparency = 255;
    }

    display() {
        push();
        imageMode(CENTER);

        if (this.isHovered) {
            blendMode(ADD); 
            fill(100, 100, 100); 
        }
        image(this.dispimage, this.x, this.y, this.w, this.h)
        pop();
    }
}