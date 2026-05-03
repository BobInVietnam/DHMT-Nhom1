let sceneManager;
let thuyetMinh;
let nhanVat;

async function setup() {
    createCanvas(1200, 800);

    await assets.loadAll("./assets/assets.json");

    if (typeof Narration !== "undefined") {
        thuyetMinh = new Narration(width - 400, 200); 
    }
    if (typeof Narrator !== "undefined") {
        nhanVat = new Narrator(width - 150, height - 280, null); 
    } else if (typeof Character !== "undefined") {
        nhanVat = new Character(width - 150, height - 280);
    }

    if (nhanVat) {
        nhanVat.isVisible = false;
        
        nhanVat.display = function() {
            if (!this.isVisible || !this.image) return;
            push();
            imageMode(CENTER);
            let pulse = this.isHovered ? 10 : 0;
            let targetH = 350; 
            let targetW = targetH * (this.image.width / this.image.height); 
            image(this.image, this.x, this.y, targetW + pulse, targetH + pulse);
            pop();
        };
    }

    sceneManager = new SceneManager();
    sceneManager.addScene("Main", new MainScene());
    sceneManager.addScene("BodyMap", new BodyMapScene());
    sceneManager.addScene("Nervous", new NervousScene());
    sceneManager.addScene("Endocrine", new EndocrineScene());
    sceneManager.addScene("Skin", new SkinScene());
    sceneManager.addScene("Reproductive", new ReproductiveScene());

    sceneManager.switchScene("Main");

    bus.on("SWITCH_SCENE", (name) => { sceneManager.switchScene(name); });

    bus.on("UPDATE_UI_POSITION", (data) => {
        if (thuyetMinh) {
            thuyetMinh.x = data.boxX;
            thuyetMinh.y = data.boxY;
        }
        if (nhanVat) {
            nhanVat.x = data.charX;
            nhanVat.y = data.charY;
        }
    });

    bus.on("HIDE_INFO", () => {
        if (thuyetMinh && typeof thuyetMinh.hide === 'function') thuyetMinh.hide();
        if (nhanVat) nhanVat.isVisible = false;
    });

    bus.on("SHOW_NARRATION", () => {
        if (nhanVat) nhanVat.isVisible = true;
    });
}

function draw() {
    background(255);
    sceneManager.draw();

    if (nhanVat && nhanVat.isVisible !== false) {
        if (typeof nhanVat.draw === 'function') nhanVat.draw();
        else if (typeof nhanVat.display === 'function') nhanVat.display();
    }
    
    if (thuyetMinh) {
        if (typeof thuyetMinh.draw === 'function') thuyetMinh.draw();
        else if (typeof thuyetMinh.display === 'function') thuyetMinh.display();
    }
}

function mousePressed() {
    if (thuyetMinh && typeof thuyetMinh.checkClick === 'function') {
        if (thuyetMinh.checkClick(mouseX, mouseY)) return;
    }
    sceneManager.checkClick();
}

function mouseWheel(event) {
    sceneManager.checkMouseWheel(event);
}

function mouseDragged(event) {
    sceneManager.checkMouseDragged();
}