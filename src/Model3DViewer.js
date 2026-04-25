class Model3DViewer {
    constructor() {
        this._ready = false;
        this._visible = false;
        this._animId = null;
        this._currentModel = null;
    }

    init(container) {
        this._canvas = document.createElement('canvas');
        this._canvas.style.position = 'absolute';
        this._canvas.style.display  = 'none';
        this._canvas.style.zIndex   = '10';
        this._canvas.style.borderRadius = '6px';
        container.appendChild(this._canvas);

        this._renderer = new THREE.WebGLRenderer({ canvas: this._canvas, alpha: true, antialias: true });
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this._renderer.outputEncoding = THREE.sRGBEncoding;

        this._scene = new THREE.Scene();
        this._scene.add(new THREE.AmbientLight(0xffffff, 0.8));
        const dir = new THREE.DirectionalLight(0xffffff, 1.0);
        dir.position.set(5, 10, 7);
        this._scene.add(dir);
        this._scene.add(new THREE.HemisphereLight(0x87ceeb, 0x554433, 0.4));

        this._camera = new THREE.PerspectiveCamera(45, 1, 0.001, 1000);
        this._camera.position.set(0, 0, 3);

        this._controls = new THREE.OrbitControls(this._camera, this._canvas);
        this._controls.enableDamping  = true;
        this._controls.dampingFactor  = 0.07;
        this._controls.minDistance    = 0.3;
        this._controls.maxDistance    = 20;

        this._ready = true;
    }

    load(path) {
        if (!this._ready) return;
        if (this._currentModel) {
            this._scene.remove(this._currentModel);
            this._currentModel = null;
        }
        const loader = new THREE.GLTFLoader();
        loader.load(path, (gltf) => {
            const model = gltf.scene;
            const box   = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size   = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z) || 1;
            const scale  = 2.0 / maxDim;
            model.scale.setScalar(scale);
            model.position.copy(center.multiplyScalar(-scale));
            this._scene.add(model);
            this._currentModel = model;
        }, undefined, (err) => {
            console.warn('GLB load error:', path, err);
        });
    }

    show(x, y, w, h) {
        if (!this._ready) return;
        this._canvas.style.left   = x + 'px';
        this._canvas.style.top    = y + 'px';
        this._canvas.style.width  = w + 'px';
        this._canvas.style.height = h + 'px';
        this._canvas.style.display = 'block';
        this._renderer.setSize(w, h);
        this._camera.aspect = w / h;
        this._camera.updateProjectionMatrix();
        this._visible = true;
        this._startLoop();
    }

    hide() {
        if (!this._ready) return;
        this._canvas.style.display = 'none';
        this._visible = false;
        this._stopLoop();
    }

    zoomIn() {
        if (!this._ready) return;
        const t = this._controls.target.clone();
        this._camera.position.sub(t).multiplyScalar(0.8).add(t);
    }

    zoomOut() {
        if (!this._ready) return;
        const t = this._controls.target.clone();
        this._camera.position.sub(t).multiplyScalar(1.25).add(t);
    }

    resetCamera() {
        if (!this._ready) return;
        this._camera.position.set(0, 0, 3);
        this._controls.target.set(0, 0, 0);
        this._controls.update();
    }

    _startLoop() {
        if (this._animId) return;
        const tick = () => {
            if (!this._visible) { this._animId = null; return; }
            this._animId = requestAnimationFrame(tick);
            this._controls.update();
            this._renderer.render(this._scene, this._camera);
        };
        this._animId = requestAnimationFrame(tick);
    }

    _stopLoop() {
        if (this._animId) { cancelAnimationFrame(this._animId); this._animId = null; }
    }
}

const model3DViewer = new Model3DViewer();
