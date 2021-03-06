var d = [];
var myBground;

function preload() {
  myBground = loadImage('./assets/back.png');
}
function setup() {
  createCanvas(600, 600);
  myBground = loadImage('./assets/back.png');

  for (var i = 0; i < 400; i = i + 1) {
    d.push(
      new Drop(random(0, windowWidth), random(0, windowHeight), random(2, 4))
    );
  }
}

function draw() {
  image(myBground, 0, 0, 600, 600);
  noStroke();
  for (var i = 0; i < d.length; i++) {
    d[i].displ();
  }
}

function Drop(x, y, sp) {
  var x1 = x;
  var y1 = y;
  var x2;
  var y2;
  var s = sp;
  var vel;

  this.displ = function() {
    var mx = 15;
    if (mx <= 0) {
      mx = 0.05;
    }
    y1 = y1 + s * mx;
    x2 = x1;
    y2 = y1 + 50;

    stroke(200);
    line(x1, y1, x2, y2);

    if (y1 >= windowHeight - 10) {
      noFill();
      //stroke(200);
      noStroke();
      fill(0, 25, 255);
      ellipse(x1, windowHeight - random(5, 45), random(20, 30), random(1, 4));
      x1 = random(0, windowWidth);
      y1 = -120;
    }
  };
}
