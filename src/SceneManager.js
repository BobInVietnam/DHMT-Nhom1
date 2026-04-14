class SceneManager {
    constructor() {
        this.scenes = {};
        this.currentScene = null;

        // Lắng nghe tín hiệu chuyển cảnh từ các Button phát ra
        bus.on("SWITCH_SCENE", (sceneName) => {
            console.log("Chuyển sang cảnh:", sceneName);
            this.switchScene(sceneName);
        });
    }

    preload() {
        this.currentScene.preload()
    }

    addScene(name, scene) {
        this.scenes[name] = scene;
    }

    // Tên hàm switchScene để khớp với main.js của bạn
    switchScene(name) {
        if (this.scenes[name]) {
            if (this.currentScene) this.currentScene.exit();
            this.currentScene = this.scenes[name];
            if (this.currentScene.enter) this.currentScene.enter();
        } else {
            console.error(`Không tìm thấy cảnh: ${name}`);
        }
    }

    draw() {
        if (this.currentScene) this.currentScene.draw();
    }

    checkClick() {
        if (this.currentScene) this.currentScene.checkClick();
    }
}