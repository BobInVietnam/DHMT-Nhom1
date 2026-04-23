class ImageButton extends Clickable {
    constructor(x, y, w, h, imageName, keepAspectRatio, eventTag, eventData) {
        super(x, y, w, h, eventTag, eventData);
        this.image = assets.get(imageName)
        this.aspectRatio = this.image.width / this.image.height
        if (keepAspectRatio) {
            this.w = max(w, h * this.aspectRatio)
            this.h = max(h, w / this.aspectRatio)
        }
    }

    display() {
        if (!this.isVisible) return

        push()
        imageMode(CENTER)
        if (this.isHovered) {
            blendMode(ADD); 
            fill(100, 100, 100); 
        }
        image(this.image, this.x, this.y, this.w, this.h)
        pop();
    }
}