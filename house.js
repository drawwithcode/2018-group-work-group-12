let house;
let skin;
let typeTxt;
let txtHouse;
let i;
let angle = 0;
var myBground;

function preload() {
  house = loadModel('assets/houseMaterial/house.obj');
  skin = loadImage('assets/houseMaterial/yellow.jpg');
  typeTxt = loadImage('assets/houseMaterial/type.png');
  myBground = loadImage('./assets/back.png');
}

// function centerCanvas() {
//   var x = (windowWidth - width) / 2;
//   var y = (windowHeight - height) / 2;
//   cnv.position(x, y);
// }

function setup() {
  createCanvas(600, 600, WEBGL);

  //centerCanvas();

  // txtHouse = createGraphics(200,200);
  // txtHouse.background(0);
  // txtHouse.fill(255);
  // txtHouse.textAlign(CENTER);
  // txtHouse.textSize(32);
  // txtHouse.text('houasdee s sd a',150,50);
}

function draw() {
  // put drawing code here
  background(184,187,175,20);
  //image(myBackground, 0, 0, 600, 600);
  // image(myBground, 0, 0, 600, 600);

  // translate(-300, -300, 0);

  ambientLight(255);
  i = map(mouseX, width, 0, 0, 85);
  camera(0, 0, height / 2 / tan(PI / 6), i, 0, 0, 0, 1, 0);

  translate(200, 150);
  //pointlLight(120,255,255,mouseX - height / 2, mouseY - width / 2,1);
  rotateX(PI / 2);
  rotateY(0);
  rotateZ(PI / 3);
  //normalMaterial();
  //specularMaterial(250);
  texture(skin);
  //ambientMaterial(160,220,0);
  model(house);

  push();
  translate(-300, -50);
  rotateX(PI / 2);
  rotateY(PI * -1.5);
  rotateZ(PI);
  texture(typeTxt);
  plane(300, 300);
  pop();
  //normalMaterial();


}
