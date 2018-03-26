import {Point} from '../lib/point';

export class LanderState {
  position:Point;
  velocity:Point;
  constructor(public x:number = 0, public y:number = 0,
    velocityX:number = 0, velocityY:number = 0,
    public fuel:number = 0, public rotate:number = 0,
    public power:number = 0
  ) {
    this.position = new Point(x,y);
    this.velocity = new Point(velocityX,velocityY);
  }
  /**
   * toString convenience method for printing a Point class
   */
  public toString = () : string => {
    return `LanderState [${this.x},${this.y}] ${this.velocity}m/s ${this.fuel}liters ${this.rotate}degrees ${this.power}m/s^2`;
  }
}
