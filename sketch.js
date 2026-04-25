let sceneManager;
let thuyetMinh;  

async function setup() {
    const cnv = createCanvas(1200, 800);

    // Wrap p5 canvas in a container so the Three.js overlay canvas can be
    // absolutely positioned relative to it for precise 3D viewport placement.
    const container = document.createElement('div');
    container.id = 'app-container';
    document.body.insertBefore(container, cnv.elt);
    container.appendChild(cnv.elt);
    model3DViewer.init(container);

    await assets.loadAll("./assets/assets.json");

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