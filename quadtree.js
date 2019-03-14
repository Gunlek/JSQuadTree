class QuadTree {

  constructor(size, boundary){
  	this.size = size;
    this.boundary = boundary;
    this.points = [];
    this.hasChildren = false;
    this.children = [];
  }

  push(object){
    if(!this.hasChildren){
      if(this.points.length < this.size){
        if(this.boundary.pos.x - this.boundary.w / 2 <= object.pos.x
          && object.pos.x <= this.boundary.pos.x + this.boundary.w / 2
          && this.boundary.pos.y - this.boundary.h / 2 <= object.pos.y
          && object.pos.y <= this.boundary.pos.y + this.boundary.h / 2)
        this.points.push(object);
      }
      else{
        let northEast = new QuadTree(this.size, new Rectangle(this.boundary.pos.x + this.boundary.w / 4, this.boundary.pos.y - this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2));
        let southEast = new QuadTree(this.size, new Rectangle(this.boundary.pos.x + this.boundary.w / 4, this.boundary.pos.y + this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2));
        let southWest = new QuadTree(this.size, new Rectangle(this.boundary.pos.x - this.boundary.w / 4, this.boundary.pos.y + this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2));
        let northWest = new QuadTree(this.size, new Rectangle(this.boundary.pos.x - this.boundary.w / 4, this.boundary.pos.y - this.boundary.h / 4, this.boundary.w / 2, this.boundary.h / 2));

        for(let k = 0; k < this.points.length; k++){
          northEast.push(this.points[k]);
          southEast.push(this.points[k]);
          southWest.push(this.points[k]);
          northWest.push(this.points[k]);
        }

        this.points = [];

        northEast.push(object);
        southEast.push(object);
        southWest.push(object);
        northWest.push(object);

        this.children.push(northEast);
        this.children.push(southEast);
        this.children.push(southWest);
        this.children.push(northWest);
        this.hasChildren = true;
      }
    }
    else {
      for(let k = 0; k < this.children.length; k++){
        this.children[k].push(object);
      }
    }
  }

  draw(){
    this.boundary.draw(255, 255, 255);
    if(this.hasChildren){
      for(let k = 0; k < this.children.length; k++){
        this.children[k].draw();
      }
    }
  }

  query(boundary){
    let pointInZone = [];
    if(Geometry.rectDoesOverlap(this.boundary, boundary)){
      if(this.points.length > 0){
        for(let k = 0; k < this.points.length; k++){
          if(this.points[k].pos.x < boundary.pos.x + boundary.w / 2
            && boundary.pos.x - boundary.w / 2 < this.points[k].pos.x
            && this.points[k].pos.y > boundary.pos.y - boundary.h / 2
            && boundary.pos.y + boundary.h / 2 > this.points[k].pos.y){
              pointInZone.push(this.points[k]);
          }
        }
      }
      else {
        for(let k = 0; k < this.children.length; k++){
          pointInZone = pointInZone.concat(this.children[k].query(boundary));
        }
      }
    }

    return pointInZone;
  }

}
