let rect1, rect2;

function setup(){
  rect1 = new Rectangle(25, 25, 50, 50);
  rect2 = new Rectangle(50, 50, 50, 50);

  console.log(Geometry.rectDoesOverlap(rect1, rect2));
}

function draw(){
  rect1.draw(255, 0, 0);
  rect2.draw(0, 0, 255);
}
