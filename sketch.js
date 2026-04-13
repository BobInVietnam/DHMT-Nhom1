let sm;
let thuyetMinh; 
let nhanVat;   

function setup() {
  createCanvas(1200, 800);

  thuyetMinh = new Narration();
  nhanVat = new Character();

  sm = new SceneManager();
  sm.addScene("Main", new MainScene());
  sm.addScene("Sub", new SubScene());

  sm.switchTo("Main");

  bus.on("SWITCH_SCENE", (name) => { sm.switchTo(name); });

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
  sm.draw(); 
  nhanVat.draw();
  thuyetMinh.draw();
}

function mousePressed() {
  let isClickOnUI = thuyetMinh.checkClick(mouseX, mouseY);
  
  if (isClickOnUI) {
    return; 
  }

  sm.checkClick();
}