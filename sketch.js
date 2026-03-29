let myButton;
let showCircle = false; // State variable to track if the circle should be drawn

function setup() {
  createCanvas(1200, 800);

  // Place button exactly in the middle of the canvas
  let btnX = width / 2;
  let btnY = height / 2;
  
  // Create the button and define what happens when clicked
  myButton = new Button(btnX, btnY, 150, 50, "CLICK ME", () => {
    console.log("The button was successfully clicked!");
    showCircle = !showCircle; // Change the state to trigger drawing the circle
  });
}

function draw() {
  background(220);

  if (showCircle) {
    push();
    fill('orange');
    noStroke();
    circle(width / 2, height / 2 - 100, 80); 
    pop();
  }

  myButton.display();
}

function mousePressed() {
  myButton.checkClick();
}