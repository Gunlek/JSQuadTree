class Geometry {

  static rectDoesOverlap(rect1, rect2){
    let overlap = false;

    if(rect1.pos.x + rect1.w / 2 > rect2.pos.x - rect2.w / 2
      && rect2.pos.x + rect2.w / 2 > rect1.pos.x - rect1.w / 2
      && rect1.pos.y + rect1.h / 2 > rect2.pos.y - rect2.h / 2
      && rect2.pos.y + rect2.h / 2 > rect1.pos.y - rect1.h / 2){
        overlap = true;
      }

    return overlap;
  }

}
