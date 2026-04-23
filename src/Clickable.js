class Clickable extends Entity {
    constructor(x, y, w, h, eventTag, eventData) {
        super(x, y, w, h);
        this.eventTag = eventTag
        this.eventData = eventData
        this.isHovered = false;
    }

    display() {
        if (!this.isVisible) return
    }
    
    checkHovered(mx = mouseX, my = mouseY) {
        this.isHovered = (
        mx > this.x - this.w / 2 &&
        mx < this.x + this.w / 2 &&
        my > this.y - this.h / 2 &&
        my < this.y + this.h / 2
        );
    }

    checkClick(mx, my) {
        if (this.isVisible && this.isHovered) {
            bus.emit(this.eventTag, this.eventData)
        }   
    }
}