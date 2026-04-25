class Model3DViewer {
    constructor() {
        this._ready   = false;
        this._visible = false;
        this._animId  = null;
        this._currentModel = null;
        this._p5Canvas = null;
        this._loading  = false;
    }

    init() {
        try {
            // Capture the p5 canvas reference now (it is in the DOM at this point)
            this._p5Canvas = document.querySelector('canvas');

            // Three.js overlay canvas — fixed position so it doesn't affect page layout
            this._canvas = document.createElement('canvas');
            this._canvas.setAttribute('data-threejs', 'true');
            this._canvas.style.cssText =
                'position:fixed;display:none;z-index:10;border-radius:6px;';
            document.body.appendChild(this._canvas);

            // Opaque renderer: scene background fills the panel, no compositing issues
            this._renderer = new THREE.WebGLRenderer({
                canvas: this._canvas, antialias: true
            });
            this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this._renderer.outputEncoding = THREE.sRGBEncoding;
            this._renderer.physicallyCorrectLights = true;

            this._scene = new THREE.Scene();
            // Dark background matching p5 scene (rgb 22,28,48)
            this._scene.background = new THREE.Color(0x161c30);

            // Lighting
            this._scene.add(new THREE.AmbientLight(0xffffff, 1.2));
            const dir = new THREE.DirectionalLight(0xffffff, 1.5);
            dir.position.set(5, 10, 7);
            this._scene.add(dir);
            const dir2 = new THREE.DirectionalLight(0xffd0a0, 0.6);
            dir2.position.set(-5, -3, -5);
            this._scene.add(dir2);

            this._camera = new THREE.PerspectiveCamera(45, 1, 0.001, 1000);
            this._camera.position.set(0, 0, 3);

            this._controls = new THREE.OrbitControls(this._camera, this._canvas);
            this._controls.enableDamping = true;
            this._controls.dampingFactor = 0.07;
            this._controls.minDistance   = 0.3;
            this._controls.maxDistance   = 20;

            this._ready = true;
        } catch (err) {
            console.warn('Model3DViewer: init failed, 3D disabled.', err);
        }
    }

    load(path) {
        if (!this._ready) return;
        if (this._currentModel) {
            this._scene.remove(this._currentModel);
            this._currentModel = null;
        }
        this._loading = true;
        const loader = new THREE.GLTFLoader();
        loader.load(path, (gltf) => {
            const model = gltf.scene;

            // Auto-center and scale to fit a 2-unit bounding box
            const box    = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size   = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z) || 1;
            const scale  = 2.0 / maxDim;
            model.scale.setScalar(scale);
            model.position.copy(center.multiplyScalar(-scale));

            this._scene.add(model);
            this._currentModel = model;
            this._loading = false;
        }, undefined, (err) => {
            console.warn('GLB load error:', path, err);
            this._loading = false;
        });
    }

    // x, y, w, h in p5 canvas pixel coordinates (1200×800 space)
    show(x, y, w, h) {
        if (!this._ready) return;
        const rect = this._p5CanvasRect();
        const sx = rect.width  / 1200;
        const sy = rect.height / 800;
        const pw = Math.round(w * sx);
        const ph = Math.round(h * sy);
        this._canvas.style.left   = (rect.left + x * sx) + 'px';
        this._canvas.style.top    = (rect.top  + y * sy) + 'px';
        this._canvas.style.display = 'block';
        this._renderer.setSize(pw, ph);        // also sets canvas CSS w/h
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

    get isReady()   { return this._ready; }
    get isLoading() { return this._loading; }

    // Viewport rect of the p5 canvas — saved reference + centered fallback
    _p5CanvasRect() {
        if (this._p5Canvas) {
            const r = this._p5Canvas.getBoundingClientRect();
            if (r.width > 0) return r;
        }
        // Fallback: compute centered position for a 1200×800 canvas
        return {
            left:   Math.max(0, (window.innerWidth  - 1200) / 2),
            top:    Math.max(0, (window.innerHeight - 800)  / 2),
            width:  1200,
            height: 800
        };
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
