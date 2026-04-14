let sceneManager

async function setup() {
    createCanvas(1200, 800);
    sceneManager = new SceneManager();
    let img = await loadImage("assets/g403.png")
    console.log(img)
    assetLoader.assets["Body::Liver"] = img

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