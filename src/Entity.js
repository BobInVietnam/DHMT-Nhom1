class Entity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
        // Transform properties
        this.scale = 1.0;
        this.rotation = 0; // In radians
        this.alpha = 255;
        this.anchor = { x: 0.5, y: 0.5 }; // Origin (0-1)
        
        this.visible = true;
    }

    update(dt) {
        // Logic update per frame
    }

    display() {
        if (!this.visible) return;
        
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        scale(this.scale);
        
        // Custom drawing logic in subclasses
        this.draw();
        
        pop();
    }
    
    draw() {
        // To be implemented by subclasses
    }
}