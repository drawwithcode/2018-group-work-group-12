// var imgs = [];
// var imgIndex = -1;
// var img;
// var paint;
// var subStep = 800;
// var z = 0;
// var isStop = false;
//
// function preload() {
//   imgs[0] = loadImage("pic1.png");
//   //imgs[1] = loadImage("test2.png");
//   //imgs[2] = loadImage("test3.png");
// }
//
// function setup() {
//   //if(windowWidth < 600)
//     //createCanvas(windowWidth, windowWidth);
//   //else
//     createCanvas(600, 600);
//   img = createImage(width, height);
//   nextImage();
//   paint = new Paint(createVector(width/2, height/2));
//   background(255, 255, 255);
//   colorMode(RGB, 255, 255, 255, 255);
// }
//
// function draw() {
//   //console.log(frameRate());
//   if (!isStop) {
//     for (var i = 0 ; i < subStep ; i++) {
//       paint.update();
//       paint.show();
//       z+= 0.01;
//     }
//   }
//   //background(255);
//   //image(img, 0, 0, width, height);
// }
//
// function fget(i, j) {
//   var index = j * img.width + i;
//   index *= 4;
//   return color(img.pixels[index], img.pixels[index+1], img.pixels[index+2], img.pixels[index+3]);
// }
//
// function fset(i, j, c) {
//   var index = j * img.width + i;
//   index *= 4;
//   img.pixels[index] = red(c);
//   img.pixels[index+1] = green(c);
//   img.pixels[index+2] = blue(c);
//   img.pixels[index+3] = alpha(c);
// }
//
// function keyPressed() {
//   console.log(key);
//   if (key === 's' || key === 'S') {
//     isStop = !isStop;
//   }
// }
// function mouseClicked() {
//   nextImage();
// }
// function touchStarted() {
//   nextImage();
// }
//
// function nextImage() {
//   if (!img) return;
//   imgIndex = (++imgIndex) % imgs.length;
//   var targetImg = imgs[imgIndex];
//   img.copy(targetImg, 0, 0, targetImg.width, targetImg.height, 0, 0, img.width, img.height);
//   //img.resize(width, height);
//   img.loadPixels();
//   clear();
// }

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
  translate(x, height / 1.2 - d); //set the y coordinate of the circle
  rotate(angle);
  triangle(-50, -50, -50, -50, 30, 30); //outer white
  triangle(-50, -50, -50, -50, 60, d); //inner white
  triangle(-50, -0, -20, -20, 90, 20); //black

  x = x + speed;
  if (x > width + radius) {
    x = -radius;
  }
}

// this function fires after the mouse has been
// clicked anywhere
function mouseClicked() {
  d = d + 10;
}

// this function fires after the mouse has been
// clicked on canvas
function changeGray() {
  g = random(150, 155);
}
