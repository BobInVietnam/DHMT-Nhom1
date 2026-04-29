let sceneManager;

async function setup() {
    createCanvas(1200, 800);

    await assets.loadAll("./assets/assets.json");

    sceneManager = new SceneManager();
    sceneManager.addScene("Main", new MainScene());
    sceneManager.addScene("BodyMap", new BodyMapScene());
    sceneManager.addScene("Nervous", new NervousScene());
    sceneManager.addScene("Endocrine", new EndocrineScene());
    sceneManager.addScene("Skin", new SkinScene());
    sceneManager.addScene("Reproductive", new ReproductiveScene());
    sceneManager.addScene("Game", new GameScene());

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