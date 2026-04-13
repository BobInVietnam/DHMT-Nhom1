class SceneManager {
    constructor() {
        this.scenes = {};
        this.currentScene = null;

        // Lắng nghe sự kiện chuyển cảnh từ EventBus
        bus.on("SWITCH_SCENE", (sceneName) => {
            console.log("Đang yêu cầu chuyển sang cảnh:", sceneName);
            this.switchScene(sceneName);
        });
    }

    addScene(name, scene) {
        this.scenes[name] = scene;
        console.log(`Đã đăng ký Scene: ${name}`);
    }

    switchScene(name) {
        // Kiểm tra xem scene có tồn tại trong danh sách không
        if (!this.scenes[name]) {
            console.error(`LỖI: Không tìm thấy Scene có tên "${name}". Hãy kiểm tra lại main.js!`);
            return;
        }

        if (this.currentScene && this.currentScene.exit) {
            this.currentScene.exit();
        }

        this.currentScene = this.scenes[name];

        if (this.currentScene && this.currentScene.enter) {
            this.currentScene.enter();
        }
        
        console.log(`Đã chuyển sang cảnh: ${name}`);
    }

    draw() {
        if (this.currentScene) {
            this.currentScene.draw();
        }
    }

    checkClick() {
        if (this.currentScene) {
            this.currentScene.checkClick();
        }
    }
}