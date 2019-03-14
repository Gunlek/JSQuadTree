let WIDTH = 525;
let HEIGHT = 525;

let qt;
let point_nb = 1000;
let points = []

let queryResult = [];

let queryRectangle;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  qt = new QuadTree(4, new Rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT));
  for(let k = 0; k < point_nb; k++){
    let point = new Point(createVector(random(WIDTH), random(HEIGHT)), null);
  	points.push(point);
    qt.push(point);
  }

  queryRectangle = new Rectangle(WIDTH / 2, HEIGHT / 2, 225, 225);
}

function draw() {
  background(33);
  qt.draw();
  drawPoints();

  queryRectangle.draw(0, 255, 0);
  queryResult = qt.query(queryRectangle);
  if(queryResult.length > 0){
    for(let k = 0; k < queryResult.length; k++){
      stroke(0, 255, 0);
      strokeWeight(5);
      point(queryResult[k].pos.x, queryResult[k].pos.y);
    }
  }

  console.log(frameRate());
}

function mouseDragged(){
  let point = new Point(createVector(mouseX, mouseY), null);
  points.push(point);
  qt.push(point)
}

function mousePressed(){
  let point = new Point(createVector(mouseX, mouseY), null);
  points.push(point);
  qt.push(point)
}

function mouseMoved(){
  queryRectangle.setPos(mouseX, mouseY);
}

function drawPoints(){
  stroke(255);
  strokeWeight(5);
	for(let k = 0; k < points.length; k++){
    if(queryResult.indexOf(points[k]) < 0){
  	 point(points[k].pos.x, points[k].pos.y);
   }
  }
}
