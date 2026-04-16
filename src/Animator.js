class Animator {
    constructor() {
        this.animations = {};
        this.currentAnimation = null;
        this.frameIndex = 0;
        this.timer = 0;
        this.isPlaying = false;
        this.speed = 10; // Frames per second
    }

    addAnimation(name, frames) {
        this.animations[name] = frames;
    }

    play(name, loop = true) {
        this.currentAnimation = name;
        this.loop = loop;
        this.isPlaying = true;
        this.frameIndex = 0;
        this.timer = 0;
    }

    update(dt) {
        if (!this.isPlaying || !this.currentAnimation) return;

        this.timer += dt;
        if (this.timer >= 1 / this.speed) {
            this.timer = 0;
            this.frameIndex++;
            
            const frames = this.animations[this.currentAnimation];
            if (this.frameIndex >= frames.length) {
                if (this.loop) {
                    this.frameIndex = 0;
                } else {
                    this.frameIndex = frames.length - 1;
                    this.isPlaying = false;
                }
            }
        }
    }

    getCurrentFrame() {
        if (!this.currentAnimation) return null;
        return this.animations[this.currentAnimation][this.frameIndex];
    }
}
