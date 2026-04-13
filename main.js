let sceneManager;

function setup() {
    createCanvas(800, 600);
    sceneManager = new SceneManager();

    sceneManager.addScene("Main", new MainScene());
    sceneManager.addScene("BodyMap", new BodyMapScene());
    sceneManager.addScene("Nervous", new NervousScene());
    sceneManager.addScene("Endocrine", new EndocrineScene());
    sceneManager.addScene("Skin", new SkinScene());
    sceneManager.addScene("Reproductive", new ReproductiveScene());

    sceneManager.switchScene("Main"); // Khớp với tên hàm trong SceneManager
}

function draw() {
    sceneManager.draw();
}

function mousePressed() {
    sceneManager.checkClick();
}