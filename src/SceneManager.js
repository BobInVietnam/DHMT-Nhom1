class SceneManager {
    constructor() {
        this.scenes = {}
        this.currentScene = null
        
        // Trạng thái chuyển cảnh
        this.isTransitioning = false;
        this.transitionProgress = 0;
        this.transitionDuration = 0.6; // giây
        this.zoomTarget = { x: 600, y: 400 };
        this.nextSceneName = null;
    }

    addScene(name, scene) {
        this.scenes[name] = scene
    }

    switchTo(name) {
        if (this.scenes[name]) {
            if (this.currentScene && this.currentScene !== this.scenes[name]) {
                if (typeof this.currentScene.exit === 'function') {
                    this.currentScene.exit();
                }
            }
            this.currentScene = this.scenes[name]
            if (typeof this.currentScene.enter === 'function') {
                this.currentScene.enter()
            }
        } else {
            console.error(`Scene ${name} not found.`);
        }
    }

    /**
     * Bắt đầu hiệu ứng chuyển cảnh mượt mà
     */
    transitionTo(name, targetX, targetY) {
        if (this.isTransitioning) return;
        
        this.nextSceneName = name;
        this.zoomTarget = { x: targetX, y: targetY };
        this.isTransitioning = true;
        this.transitionProgress = 0;
    }

    draw() {
        if (!this.currentScene) return;

        let dt = deltaTime / 1000;

        if (this.isTransitioning) {
            // Tăng tiến trình chuyển cảnh
            this.transitionProgress += dt / this.transitionDuration;
            
            if (this.transitionProgress >= 1) {
                this.isTransitioning = false;
                this.switchTo(this.nextSceneName);
                return;
            }

            // HIỆU ỨNG ZOOM MƯỢT MÀ
            push();
            // Nội suy Scale từ 1 ra 4 (phóng to)
            let s = lerp(1, 4, this.transitionProgress);
            
            // Nội suy vị trí từ giữa màn hình ra điểm target
            // Để phóng to vào điểm (targetX, targetY), ta dùng công thức:
            // translate(width/2, height/2) -> scale(s) -> translate(-targetX, -targetY)
            translate(width/2, height/2);
            scale(s);
            translate(-lerp(width/2, this.zoomTarget.x, this.transitionProgress), 
                      -lerp(height/2, this.zoomTarget.y, this.transitionProgress));
            
            // Vẽ cảnh hiện tại đang bị phóng to
            this.currentScene.draw();
            pop();

            // Hiệu ứng Fade mờ dần sang màu trắng
            noStroke();
            fill(255, lerp(0, 255, this.transitionProgress));
            rectMode(CORNER);
            rect(0, 0, width, height);

        } else {
            // Vẽ cảnh bình thường
            if (typeof this.currentScene.update === 'function') {
                this.currentScene.update(dt);
            }
            if (typeof this.currentScene.draw === 'function') {
                this.currentScene.draw();
            }
        }
    }

    checkClick() {
        if (this.isTransitioning) return; // Không cho click khi đang chuyển cảnh
        if (this.currentScene) {
            this.currentScene.checkClick();
        }
    }
}