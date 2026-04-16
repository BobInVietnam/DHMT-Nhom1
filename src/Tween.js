/**
 * Lớp TweenManager quản lý các hiệu ứng chuyển động mượt mà (interpolation)
 */
class TweenManager {
    constructor() {
        this.tweens = [];
    }

    /**
     * Tạo một tween mới
     * @param {Object} target Đối tượng cần thay đổi thuộc tính
     * @param {Object} props Thuộc tính đích {x: 100, y: 200, ...}
     * @param {Number} duration Thời gian thực hiện (giây)
     * @param {Function} easing Hàm nội suy (mặc định là linear)
     */
    to(target, props, duration, easing = TweenManager.linear) {
        const tween = {
            target,
            startProps: {},
            endProps: props,
            duration,
            elapsed: 0,
            easing,
            onComplete: null,
            isFinished: false
        };

        for (let key in props) {
            tween.startProps[key] = target[key];
        }

        this.tweens.push(tween);
        return tween;
    }

    update(dt) {
        for (let i = this.tweens.length - 1; i >= 0; i--) {
            const t = this.tweens[i];
            t.elapsed += dt;
            const progress = Math.min(t.elapsed / t.duration, 1);
            const easedProgress = t.easing(progress);

            for (let key in t.endProps) {
                t.target[key] = lerp(t.startProps[key], t.endProps[key], easedProgress);
            }

            if (progress >= 1) {
                t.isFinished = true;
                if (t.onComplete) t.onComplete();
                this.tweens.splice(i, 1);
            }
        }
    }

    static linear(t) { return t; }
    static easeIn(t) { return t * t; }
    static easeOut(t) { return t * (2 - t); }
    static easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
}

const Tweener = new TweenManager();
