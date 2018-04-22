/**
 * Vector class for representing objects with magnitude and direction in a 2 dimensional space
 */
export class Vector {
  constructor(public x:number = 0, public y:number = 0) {}
  /**
   * sum between 2 vectors
   */
  public add(v:Vector): Vector {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
    return this;
  }
  /**
   * sum between 2 vectors
   */
  public static add(v1:Vector, v2:Vector): Vector {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }
  /**
   * difference between 2 vectors
   */
  public sub(v:Vector): Vector {
    this.x = this.x - v.x;
    this.y = this.y - v.y;
    return this;
  }
  /**
   * difference between 2 vectors
   */
  public static sub(v1:Vector, v2:Vector): Vector {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }
  /**
   * apply a scalar to the vector
   */
  public scale(scalar:number): Vector {
    this.x = this.x * scalar;
    this.y = this.y * scalar;
    return this;
  }
  public static scale(v:Vector, scalar:number): Vector {
    return new Vector(v.x, v.y).scale(scalar);
  }
  /**
   * magnitude as a scalar
   */
  public magnitude(): number {
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
  }
  /**
   * make a unit vector with magnitude 1
   */
  public normalize(): Vector {
    let m = this.magnitude();
    if (m !== 0) {
      this.scale(1/m);
    }
    return this;
  }
  /**
   * make a unit vector with magnitude 1
   */
  public static normalize(v:Vector): Vector {
    return new Vector(v.x, v.y).normalize();
  }
  /**
   * keep direction of vector, but limit to max magnitude
   */
  public limit(max:number): Vector {
    let m = this.magnitude();
    if (m > max) {
      this.normalize().scale(max);
    }
    return this;
  }
  /**
   * Create Vector from magnitude and angle
   */
  public static polar2vector(magnitude:number, angle:number): Vector {
    let vx = magnitude * Math.cos(angle);
    let vy = magnitude * Math.sin(angle);
    return new Vector(vx,vy);
  }
  public radians(): number {
    return Math.atan2(this.x, this.y);
  }
  public degrees(): number {
    let radians = this.radians();
    let degrees = 180 * radians / Math.PI;
    let rounded = (360 + Math.round(degrees)) % 360;
    return rounded;
  }
  public static degree2radian(degrees:number): number {
    return 2 * Math.PI * (degrees / 360);
  }
}

export class Mover {
  constructor(
    public location:Vector = new Vector(0,0),
    public velocity:Vector = new Vector(0,0),
    public acceleration:Vector = new Vector(0,0),
    public mass:number = 0) {}
  /**
   * A force vector could represent gravity, wind, etc
   */
  public applyForce(force:Vector): Vector {
    let f = new Vector(force.x, force.y);
    if (this.mass !== 0) {
      f = Vector.scale(force, 1 / this.mass);
    }
    return this.acceleration.add(f);
  }
  /**
   * Drag could represent friction from air, water, a surface
   */
  public drag(coefficient:number) {
    let speed = this.velocity.magnitude();
    let dragMagnitude = coefficient * Math.pow(speed,2);
    let dragForce = new Vector(this.velocity.x, this.velocity.y).scale(-1).normalize().scale(dragMagnitude);
    this.applyForce(dragForce);
  }
}
