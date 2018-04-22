/**
 * Point class for X,Y coordinate system calculations and functions
 */
export class Point {
  constructor(public x:number = 0, public y:number = 0) {}
  /**
   * Distance/Magnitude formula between two points
   * @param p
   */
  distance(p:Point):number {
    return Math.sqrt(Math.pow(p.x-this.x,2) + Math.pow(p.y-this.y,2));
  }

  /**
   * Return cardinal direction N,NE,E,SE,S,SW,W,NW from this point to the given point
   */
  public cardinalDirection(p:Point):string {
    let result = '';
    if (this.y < p.y) {
      result = 'N';
    } else if (this.y > p.y) {
      result = 'S';
    }
    //if (W or E or neither)
    if (this.x < p.x) {
      result = result+'E';
    }
    if (this.x > p.x) {
      result = result+'W';
    }
    return result;
  }

  /**
   * Return a new point moved in the cardinal direction by the given increment
   * @param direction N,NE,E,SE,S,SW,W,NW
   * @param increment amount to increment
   */
  public cardinalIncrement(direction:string, increment:number = 1):Point {
    let xIncrement = 0;
    let yIncrement = 0;
    if (direction.indexOf('N') !== -1) {
      yIncrement = increment;
    }
    if (direction.indexOf('S') !== -1) {
      yIncrement = -increment;
    }
    if (direction.indexOf('E') !== -1) {
      xIncrement = increment;
    }
    if (direction.indexOf('W') !== -1) {
      xIncrement = -increment;
    }
    return new Point(this.x + xIncrement, this.y + yIncrement);
  }

  public magnitude():number {
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
  }

  public angleDegrees():number {
    return Math.atan2(this.y, this.x) * 180 / Math.PI;
  }

  /**
   * toString convenience method for printing a Point class
   */
  public toString = () : string => {
    return `Point (${this.x},${this.y})`;
  }
}

export class KeyPoint {
  constructor(
    public key:any,
    public point:Point) {}

  /**
   * sort KeyPoint array by closest to toPoint
   */
  public static sortByClosest(keyPoints:KeyPoint[], toPoint:Point): KeyPoint[] {
    let sortedKeyPoints:KeyPoint[] = keyPoints.sort((a,b) => {
      return a.point.distance(toPoint) - b.point.distance(toPoint);
    });
    return sortedKeyPoints;
  }
}
