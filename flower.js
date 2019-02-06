var t;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  t = abs(sin(frameCount*0.005));
  let a;
  a = map(mouseX,0,width,1,5);
  flower(150*t + 50, 4, a, 100, 68, 0.45*t + 0.1, 0.6, PI*(1-t));
}

function flower(r, c, petalCount, circleCount, maxRad, minRad, frac, rot) {
  var rad = 0;
  noStroke();

  push();
  translate(width/2, height/2);
  for (var j = 0; j< petalCount; j++)
    for (var i = c; i <= circleCount; i = i + 1) {
      var tt = i/circleCount;
      var x  = r*tt*cos( tt*rot + (2*PI*j)/petalCount-PI/2);
      var y  = r*tt*sin( tt*rot + (2*PI*j)/petalCount-PI/2);

      if (i < frac*circleCount)
        rad = map(i, 0, frac*circleCount, minRad, maxRad);
      else
      rad = map(i, frac*circleCount, circleCount, maxRad, minRad);
      fill(lerpColor(color(255*t, 255, 0, 10), color(50*t + 205, 127*(1-t), 0, 100), i/circleCount));
      ellipse(x, y, 2*rad, 2*rad);
    }
  pop();
}
