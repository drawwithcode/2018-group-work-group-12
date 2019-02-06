var d;
var g;
var x = 90.0;
var speed = 1.0;
var radius = 3.0;
var angle = 0.0;

function setup() {
  cnv = createCanvas(600, 600);
  cnv.mouseClicked(changeGray);
  smooth();
  noStroke();
  d = 10;
  g = 124;
  background(216, 217, 206, 95);
}

function draw() {
  // textSize(12);
  // fill(73, 75, 65);
  // noStroke();
  // text('Click your mouse to draw mountains', 20, 40);

  fill(102, 117, g, 10);
  stroke(173, 193, 155, 10);
  angle = angle - 0.01;
  translate(x, height / 1.2 - d);
  rotate(angle);
  triangle(-50, -50, -50, -50, 30, 30);
  triangle(-50, -50, -50, -50, 60, d);
  triangle(-50, -0, -20, -20, 90, 20);

  x = x + speed;
  if (x > width + radius) {
    x = -radius;
  }
}

function mouseClicked() {
  d = d + 10;
}

function changeGray() {
  g = random(150, 155);
}
