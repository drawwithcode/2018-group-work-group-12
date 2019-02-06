var myTree;
var startPoint;
var direction;
var count;
var myBground;

function setup()
{
  createCanvas(600, 600);
  background(134, 142, 136);
  ellipseMode(CENTER);
  stroke(80, 89, 90);
  fill(134, 142, 136);
  ellipseMode(CENTER);
  smooth();
  myBground = loadImage('./assets/back.png');

  startPoint = createVector(width/2, height);
  direction = createVector(0, -height);
  myTree = new Tree(startPoint, direction);
  count = myTree.treeSize;
}

function draw()
{
  background(134, 142, 136);
  image(myBground, 0, 0, 600, 600);
  myTree.swing();

  stroke(80, 89, 90);
  var tempIndex;
  var i;
  for(i = 1; i < count; i++)
  {
    strokeWeight(myTree.twig[parseInt(myTree.map[i].x)].thickness[parseInt(myTree.map[i].y)]);
    line(myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y) - 1].x, myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y) - 1].y,
         myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y)].x, myTree.twig[parseInt(myTree.map[i].x)].location[parseInt(myTree.map[i].y)].y);
  }

  noStroke();
  for(i = 0; i < myTree.twig.length; i++)
  {
    var num = myTree.twig[i].location.length - 1;
    ellipse(myTree.twig[i].location[num].x, myTree.twig[i].location[num].y,0,0);
  }
}

function mousePressed() {
  background(230, 250, 220, 250);
  stroke(80, 89, 90);
  myTree = new Tree(startPoint, direction);
  count = myTree.treeSize;
}

function Branch(loc, thic, id, branchIndex)
{
  this.location = [createVector(loc.x, loc.y)];
  this.thickness = [thic];

  this.baseIndex = []
  this.baseIndex.push([id]);
  this.baseIndex.push([branchIndex]);

  this.dTheta = [];
  this.isCandidate = false;
}

Branch.prototype.branchRotate = function(index, theta, reference)
{
  this.location[index].sub(reference);
  this.rotate2D(this.location[index], theta);
  this.location[index].add(reference);
}

Branch.prototype.rotate2D = function(v, theta)
{
  var xTemp = v.x;
  v.x = v.x * cos(theta) - v.y * sin(theta);
  v.y = xTemp * sin(theta) + v.y * cos(theta);
}


function Frontier(a,b)
{
  if(Object.prototype.toString.call(a) === '[object Object]'
     && typeof b === 'undefined')
  {
    this.constructorWithParent(a);
  }
  else
  {
    this.constructorWithStarPoint(a,b);
  }
}


Frontier.prototype.constructorWithStarPoint = function(startPoint, direction) {
  this.location = createVector(startPoint.x, startPoint.y);
  this.velocity = createVector(direction.x, direction.y);
  this.thickness = random(20,30);
  this.finished = false;
}

Frontier.prototype.constructorWithParent = function(parent)
{
  this.location = parent.location.copy();
  this.velocity = parent.velocity.copy();
  this.thickness = parent.thickness;
  parent.thickness = this.thickness;
  this.finished = parent.finished;
}

Frontier.prototype.update = function(factor)
{
  if(  this.location.x > -5
     & this.location.y > -5
     & this.location.x < width + 5
     & this.location.y < height + 5
     & this.thickness > factor)
  {
    this.velocity.normalize();
    var uncertain = createVector(random(-1, 1), random(-1, 1));
    uncertain.normalize();
    uncertain.mult(0.2);
    this.velocity.mult(0.8);
    this.velocity.add(uncertain);
    this.velocity.mult(random(8, 15));
    this.location.add(this.velocity);
  }

  else
  {
    this.finished = true;
  }

}

function Tree(startPoint, direction)
{
  this.treeSize;
  var BranchLengthFactor = 0.3;
  var BranchLocationFactor = 0.3;
  this.dt = 0.025;
  this.time = 0;
  this.dtheta;

  this.candNum = 3;
  this.candidateIndex = Array(this.candNum);
  this.amplitude = Array(this.candNum);
  this.phaseFactor = Array(this.candNum);
  this.freq;
  this.period;

  var id = 0;
  var growth = false;

  this.fr = [new Frontier(startPoint, direction)];
  this.twig = [new Branch(this.fr[id].location, this.fr[id].thickness, id, 0)];
  this.map = [createVector(this.id, this.twig[id].location.length - 1)];

  while(!growth)
  {
    var growthSum = 0;
    for(id = 0; id < this.fr.length; id++)
    {
      this.fr[id].update(BranchLocationFactor);
      if(!this.fr[id].finished)
      {
        this.twig[id].location.push(createVector(this.fr[id].location.x, this.fr[id].location.y));
        this.twig[id].thickness.push(this.fr[id].thickness);
        this.map.push(createVector(id, this.twig[id].location.length - 1));

        if (random(0, 1) < BranchLengthFactor)  // control length of one branch
        {
          this.fr[id].thickness *= 0.65;
          this.twig[id].thickness[this.twig[id].thickness.length - 1] = this.fr[id].thickness;
          if(this.fr[id].thickness > BranchLocationFactor)  // control the number of the locations on all branches, i.e., treeSize.
          {

            this.fr.push(new Frontier(this.fr[id]));
            this.twig.push(new Branch(this.fr[id].location, this.fr[id].thickness, id, this.twig[id].location.length - 1));

            var _id = id;
            if(_id !== 0)
            {
              for(var _i = 0; _i < 2; _i++)
              {
                this.twig[this.twig.length - 1].baseIndex[_i] = concat(this.twig[this.twig.length - 1].baseIndex[_i], this.twig[_id].baseIndex[_i]);
              }
            }
          }

        } // if (random(0, 1) < 0.2)

      }
      else
      {
        growthSum++;
      }
    }
    if(growthSum == this.fr.length)
    {
      this.dtheta = Array(this.twig.length);
      this.treeSize = this.map.length;
      growth = true;
    }
  } // while(!growth)

  var _candList = [];
  var _candfloat = Array(this.twig.length);
  var i;
  for(i = 0; i < this.twig.length; i++)
  {
    _candfloat[i] = parseFloat(this.twig[i].location.length);
    _candList.push(_candfloat[i]);
  }
  this.candidateIndex[0] = 0;
  this.twig[0].isCandidate = true;
  this.twig[0].dTheta = Array(this.twig[0].location.length);
  _candfloat[0] = -1.0;
  _candList[0] = -1.0;
  for(i = 1; i < this.candNum; i++)
  {
    var _temp = max(_candfloat);
    this.candidateIndex[i] = _candList.indexOf(_temp);
    this.twig[this.candidateIndex[i]].isCandidate = true;
    this.twig[this.candidateIndex[i]].dTheta = Array(this.twig[this.candidateIndex[i]].location.length);
    _candfloat[this.candidateIndex[i]] = -1.0;
    _candList[this.candidateIndex[i]] = -1.0;
  }
  //    println(this.candidateIndex);

  this.amplitude[0] = random(0.006, 0.012);
  this.phaseFactor[0] = random(0.6, 1.2);
  this.freq = random(0.5, 0.8);
  this.period = 1 / this.freq;
  for(i = 1; i < this.candNum; i++)
  {
    this.amplitude[i] = this.amplitude[i-1] * random(0.9, 1.4);
    this.phaseFactor[i] = this.phaseFactor[i-1] * random(0.9, 1.4);
  }
}

Tree.prototype.swing = function()
{
  var j;
  for(var i = 0; i < this.candNum; i++)
  {
    var _num = this.twig[this.candidateIndex[i]].location.length;
    for(j = 0; j < _num; j++)  this.twig[this.candidateIndex[i]].dTheta[j] = this.amplitude[i] * this.dt * TWO_PI * this.freq * cos(TWO_PI * this.freq * this.time - this.phaseFactor[i] * PI * parseFloat(j) / parseFloat(_num));
  }

  for(var id = 0; id < this.twig.length; id++)
  {
    if(this.twig[id].isCandidate)
    {
      for(var _id = 1; _id < this.twig[id].location.length; _id++)
      {
        this.twig[id].branchRotate(_id, this.twig[id].dTheta[_id], this.twig[id].location[0]);
      }
    }

    for(j = 0; j < this.twig[id].baseIndex[0].length; j++)
    {
      if(!this.twig[this.twig[id].baseIndex[0][j]].isCandidate | id === 0)
      {
        continue;
      }
      else
      {
        for(var k = (id === 0) ? 1 : 0; k < this.twig[id].location.length; k++)
        {
          this.twig[id].branchRotate(k, this.twig[this.twig[id].baseIndex[0][j]].dTheta[this.twig[id].baseIndex[1][j]], this.twig[this.twig[id].baseIndex[0][j]].location[0]);
        }
      }
    }

  }

  this.time += this.dt;
  if(this.time >= this.period) this.time -= this.period;
}
