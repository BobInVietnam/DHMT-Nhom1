class SceneManager {
    constructor() {
        this.scenes = {}
        this.currentScene = null
    }

    addScene(name, scene) {
        this.scenes[name] = scene
    }

    switchTo(name) {
        if (this.scenes[name]) {
            if (this.currentScene) {
                this.currentScene.exit()
            }
            this.currentScene = this.scenes[name]
            if (typeof this.currentScene.enter === 'function') {
                this.currentScene.enter()
            }
        } else {
            console.error(`Scene ${name} not found.`);
        }
    }

    draw() {
        if (this.currentScene && typeof this.currentScene.draw === 'function') {
            this.currentScene.draw()
        }
    }

    checkClick() {
        this.currentScene.checkClick()
    }
}