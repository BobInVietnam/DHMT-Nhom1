let sceneManager;
let thuyetMinh; 
let nhanVat;   

async function setup() {
    createCanvas(1200, 800);

    await assets.loadAll("./assets/assets.json");

    thuyetMinh = new Narration();
    nhanVat = new Character();

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

    bus.on("SHOW_INFO", (data) => {
        thuyetMinh.show(data.texts, data.boxX, data.boxY); 
        nhanVat.show(data.charX, data.charY);
    });

    bus.on("HIDE_INFO", () => {
        thuyetMinh.hide();
        nhanVat.hide();
    });
}

function draw() {
    background(255); 
    sceneManager.draw(); 
    nhanVat.display();
    thuyetMinh.display();
}

function mousePressed() {
    let isClickOnUI = thuyetMinh.checkClick(mouseX, mouseY);
    if (isClickOnUI) {
        return; 
    }
    sceneManager.checkClick();
}

function mouseWheel(event) {
    sceneManager.checkMouseWheel(event);
}

function mouseDragged(event) {
    sceneManager.checkMouseDragged();
}