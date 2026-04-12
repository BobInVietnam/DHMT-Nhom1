class SceneManager {
    constructor() {
        this.scenes = {};
        this.currentScene = null;

        bus.on("SWITCH_SCENE", (sceneName) => {
            this.switchScene(sceneName);
        });
    }

    addScene(name, scene) {
        this.scenes[name] = scene;
    }

    switchScene(name) {
        if (this.currentScene) {
            this.currentScene.exit();
        }

        this.currentScene = this.scenes[name];

        if (this.currentScene) {
            this.currentScene.enter();
        }
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