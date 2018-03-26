import {Point} from '../lib/point';

/**
 * Two points form a line, and methods to describe the line
 */
export class Line {
  p1:Point; // left and bottom most point
  p2:Point; // right and top most point
  constructor(a:Point, b:Point) {
    if (a.x < b.x) {
      this.p1 = a;
      this.p2 = b;
    } else if (a.x === b.x) {
      if (a.y < b.y) {
        this.p1 = a;
        this.p2 = b;
      } else {
        this.p1 = b;
        this.p2 = a;
      }
    } else {
      this.p1 = b;
      this.p2 = a;
    }
  }
  public isHorizontal():boolean {
    return this.p1.y === this.p2.y;
  }
  public isVertical():boolean {
    return this.p1.x === this.p2.x;
  }
  public length():number {
    return Math.sqrt(Math.pow(this.p2.x - this.p1.x,2) + Math.pow(this.p2.y - this.p1.y,2));
  }
  /**
   * toString convenience method for printing a Point class
   */
  public toString = () : string => {
    return `Line (${this.p1.x},${this.p1.y}:${this.p2.x},${this.p2.y})`;
  }
}
