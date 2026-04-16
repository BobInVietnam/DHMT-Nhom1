let sm;

function setup() {
  createCanvas(1200, 800);
  
  sm = new SceneManager();
  sm.addScene("Main", new MainScene());
  sm.addScene("Sub", new SubScene());
  sm.addScene("SkinThermal", new SkinThermalScene());
  sm.addScene("NervousSystem", new NervousSystemScene());
  sm.addScene("EndocrineSystem", new EndocrineSystemScene());
  sm.addScene("ReproductiveSystem", new ReproductiveSystemScene());

  sm.switchTo("Main");

  bus.on("SWITCH_SCENE", (name) => {
    sm.switchTo(name);
  });
}

function draw() {
  sm.draw();
}

function mousePressed() {
  sm.checkClick();
}