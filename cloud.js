var xstart, xnoise, ystart, ynoise;

function setup() {
  createCanvas(600, 600);
  xstart = random(1);
  ystart = random(1);
	frameRate(60);
}


function draw() {
  background(color("#39A0ED"));
  xstart += 0.1;
  ystart += 0.1;
  xnoise = xstart;
  ynoise = ystart;

  for (var y = 0; y <= height; y += 7) {
  	ynoise += 0.1;
  	xnoise = xstart;
  		for (var x = 0; x <= width; x += 7) {
  		xnoise += 0.1;
  		drawPoint(x, y, noise(xnoise, ynoise));
 			}
 		}
	}
function drawPoint(x, y, noiseFactor) {
  push();
  translate(x, y);
  rotate(noiseFactor * radians(560));
  var edgeSize = noiseFactor*45;
  var grey = 170 + (noiseFactor*150);
  var alph = 150 + (noiseFactor*120);
  noStroke();
  fill(grey, alph);
  ellipse(0, 0, edgeSize,edgeSize/2);
  pop();
}
