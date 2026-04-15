let sceneManager

async function setup() {
    createCanvas(1200, 800);

    // Loading assets
    await assets.loadAll("./assets/assets.json")

    // Loading scenes
    sceneManager = new SceneManager();

    sceneManager.addScene("Main", new MainScene());
    sceneManager.addScene("BodyMap", new BodyMapScene());
    sceneManager.addScene("Nervous", new NervousScene());
    sceneManager.addScene("Endocrine", new EndocrineScene());
    sceneManager.addScene("Skin", new SkinScene());
    sceneManager.addScene("Reproductive", new ReproductiveScene());

    sceneManager.switchScene("Main"); 
}

function draw() {
  sceneManager.draw()
}

function mousePressed() {
  sceneManager.checkClick();
}