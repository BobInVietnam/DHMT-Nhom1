let sceneManager;
let thuyetMinh;
let vFont;

function applyVietFont() { if (vFont) textFont(vFont); }

async function setup() {
    createCanvas(1200, 800);
    // Load Vietnamese-capable font in background; falls back to browser default if offline
    loadFont(
        'https://fonts.gstatic.com/s/notosans/v36/o-0IIpQlx3QUlC5A4PNr5TRASf6M7Q.woff2',
        (f) => { vFont = f; },
        () => {}
    );
    model3DViewer.init();

    const manifest = await (await fetch("./assets/assets.json")).json();
    await assets.loadAll("./assets/assets.json");
    soundManager.wireEvents(manifest.data_audio || []);

    sceneManager = new SceneManager();
    sceneManager.addScene("Main", new MainScene());
    sceneManager.addScene("BodyMap", new BodyMapScene());
    sceneManager.addScene("Nervous", new NervousScene());
    sceneManager.addScene("Endocrine", new EndocrineScene());
    sceneManager.addScene("Skin", new SkinScene());
    sceneManager.addScene("Reproductive", new ReproductiveScene());
    sceneManager.addScene("Sub", new SubScene());

    sceneManager.switchScene("Main"); 

    bus.on("SWITCH_SCENE", (name) => { sceneManager.switchScene(name); });
}

function draw() {
    background(255); 
    sceneManager.draw(); 
}

function mousePressed() {
    userStartAudio();
    sceneManager.checkClick();
}

function mouseWheel(event) {
    sceneManager.checkMouseWheel(event);
}

function mouseDragged(event) {
    sceneManager.checkMouseDragged();
}

function keyPressed() {
    bus.emit("KEY_PRESSED", keyCode);
}