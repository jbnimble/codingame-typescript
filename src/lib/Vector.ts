
export class Vector {
  constructor(public x:number = 0, public y:number = 0) {}
  public add(v:Vector): Vector {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
    return this;
  }
  public static add(v1:Vector, v2:Vector): Vector {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }
  public sub(v:Vector): Vector {
    this.x = this.x - v.x;
    this.y = this.y - v.y;
    return this;
  }
  public static sub(v1:Vector, v2:Vector): Vector {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }
  public scale(scalar:number): Vector {
    this.x = this.x * scalar;
    this.y = this.y * scalar;
    return this;
  }
  public static scale(v:Vector, scalar:number): Vector {
    return new Vector(v.x, v.y).scale(scalar);
  }
  public magnitude(): number {
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
  }
  public normalize(): Vector {
    let m = this.magnitude();
    if (m !== 0) {
      this.scale(1/m);
    }
    return this;
  }
  public static normalize(v:Vector): Vector {
    return new Vector(v.x, v.y).normalize();
  }
  public limit(max:number): Vector {
    let m = this.magnitude();
    if (m > max) {
      this.normalize().scale(max);
    }
    return this;
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
