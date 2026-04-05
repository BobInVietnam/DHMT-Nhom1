let sm

function setup() {
  createCanvas(1200, 800);

  sm = new SceneManager()
  sm.addScene("Main", new MainScene())
  sm.addScene("Sub", new SubScene())

  sm.switchTo("Main")
  bus.on("SWITCH_SCENE", (name) => {sm.switchTo(name)})
}

function draw() {
  sm.draw()
}

function mousePressed() {
  sm.checkClick();
}