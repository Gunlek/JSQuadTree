class Rectangle {

	constructor(x, y, w, h){
  	this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
  }

  draw(r, g, b){
		stroke(r, g, b);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }

	setPos(x, y){
		this.pos.x = x;
		this.pos.y = y;
	}

}
