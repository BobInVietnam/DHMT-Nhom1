class Clickable extends Entity {
    constructor(x, y, w, h, eventTag, eventData) {
        super(x, y, w, h);
        this.eventTag = eventTag
        this.eventData = eventData
    }

    display() {}
    
    isHovered() {
        return (
        mouseX > this.x - this.w / 2 &&
        mouseX < this.x + this.w / 2 &&
        mouseY > this.y - this.h / 2 &&
        mouseY < this.y + this.h / 2
        );
    }
    checkClick() {
        if (this.isHovered()) {
            bus.emit(this.eventTag, this.eventData)
        }   
    }
}