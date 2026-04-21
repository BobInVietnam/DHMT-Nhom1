class ZoomableScene extends Scene {
    constructor() {
        super()
        this.zoomableObjects = []
        this.camera = {
            x: 0,
            y: 0,
            zoom: 1.0,
            minZoom: 0.2,
            maxZoom: 5.0
        };

        this.isPanning = false;
    }

    getWorldMouse() {
        return {
            x: (mouseX - this.camera.x) / this.camera.zoom,
            y: (mouseY - this.camera.y) / this.camera.zoom
        };
    }

    draw() {
        const worldMouse = this.getWorldMouse();
        // --- WORLD SPACE ---
        push(); // Save standard 2D state
        
        // 1. Apply Transformations in specific order: Translate THEN Scale
        translate(this.camera.x, this.camera.y);
        scale(this.camera.zoom);
        // 2. Draw the Model
        this.drawZoomable(worldMouse.x, worldMouse.y)
        pop(); // Restore to screen space

        // --- SCREEN SPACE ---
        super.draw(); 
    }

    drawZoomable(mx, my) {
        for (let object of this.zoomableObjects) {
            if (typeof object.checkHovered === 'function') object.checkHovered(mx, my)
            object.display();
        }
    }

    checkMouseWheel(event) {
        const zoomFactor = 1.1;
        const mouseBeforeZoom = this.getWorldMouse();

        // Adjust Zoom
        if (event.delta > 0) {
            this.camera.zoom /= zoomFactor;
        } else {
            this.camera.zoom *= zoomFactor;
        }
        this.camera.zoom = constrain(this.camera.zoom, this.camera.minZoom, this.camera.maxZoom);

        // Adjust Pan to zoom toward mouse position
        const mouseAfterZoom = this.getWorldMouse();
        this.camera.x += (mouseAfterZoom.x - mouseBeforeZoom.x) * this.camera.zoom;
        this.camera.y += (mouseAfterZoom.y - mouseBeforeZoom.y) * this.camera.zoom;

        return false; // Block page scroll
    }

    checkClick() {
        this.isPanning = true;
        
        // Update: checkClick now needs world coordinates
        const worldMouse = this.getWorldMouse();

        for (let i = this.objects.length - 1; i >= 0; i--) {
            let object = this.objects[i];
            if (typeof object.checkClick === 'function') {
                if (object.checkClick(worldMouse.x, worldMouse.y)) return;
            }
        }
        for (let i = this.zoomableObjects.length - 1; i >= 0; i--) {
            let object = this.zoomableObjects[i];
            if (typeof object.checkClick === 'function') {
                if (object.checkClick(worldMouse.x, worldMouse.y)) return;
            }
        }
    }

    checkMouseReleased() {
        this.isPanning = false;
    }

    checkMouseDragged() {
        if (this.isPanning) {
            // Smooth Panning: movement is relative to screen displacement
            this.camera.x += (mouseX - pmouseX);
            this.camera.y += (mouseY - pmouseY);
        }
    }
}