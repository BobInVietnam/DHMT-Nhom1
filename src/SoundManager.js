class SoundManager {
    constructor() {
        this._sounds = {};
        this._loops  = {};
    }

    // Called once after sceneManager is ready. Loads sounds in background.
    _preload(manifest) {
        for (const item of manifest) {
            const name = item.name;
            loadSound(`./assets/${item.path}`)
                .then(sound => { this._sounds[name] = sound; })
                .catch(() => { console.warn(`Audio not loaded: ${name}`); });
        }
    }

    play(name) {
        const s = this._sounds[name];
        if (s) s.play();
    }

    loop(name) {
        if (this._loops[name]) return;
        const s = this._sounds[name];
        if (!s) return;
        s.loop();   // set loop flag
        s.play();   // actually start playback
        this._loops[name] = s;
    }

    stop(name) {
        const s = this._sounds[name];
        if (s) s.stop();
        delete this._loops[name];
    }

    stopAll() {
        for (const name of Object.keys(this._loops)) {
            this._loops[name].stop();
        }
        this._loops = {};
    }

    setVolume(v) {
        masterVolume(v);
    }

    wireEvents(audioManifest) {
        this._preload(audioManifest);

        bus.on("SHOW_NARRATION",     ()      => this.play("narration_open"));
        bus.on("RUN_NARRATION",      ()      => this.play("narration_next"));

        bus.on("SCENE_ENTER",         ()      => this.loop("skin_ambient"));
        bus.on("SCENE_EXIT",          ()      => this.stopAll());
        bus.on("SKIN_NEXT",          ()      => this.play("scene_transition"));
        bus.on("SKIN_3D_LOADED",     ()      => this.play("model_load"));
        bus.on("SKIN_THERMO_CHANGE", (isHot) => {
            this.stop("heat_ambient");
            this.stop("cold_ambient");
            if (isHot !== null) this.loop(isHot ? "heat_ambient" : "cold_ambient");
        });
    }
}

const soundManager = new SoundManager();
