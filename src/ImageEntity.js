class ImageEntity extends Entity {
    constructor(x, y, w, h, imgName, keepAspectRatio) {
        super(x, y, w, h)
        this.image = assets.get(imgName)
        this.keepAspectRatio = keepAspectRatio
        this.aspectRatio = this.image.width / this.image.height
    }

    display() {
        push()
        imageMode(CENTER)
        if (this.keepAspectRatio) {
            image(this.image, this.x, this.y, max(this.w, this.h * this.aspectRatio), max(this.h, this.w / this.aspectRatio))
        } else {
            image(this.image, this.x, this.y, this.w, this.h)
        }
        pop()
    }
}