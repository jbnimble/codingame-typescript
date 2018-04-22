import {Point} from '../lib/point';

export class CodeRoyaleUnit {
  public static TYPE_QUEEN: number = -1;
  public static TYPE_KNIGHT: number = 0;
  public static TYPE_ARCHER: number = 1;
  public static TYPE_GIANT: number = 2;
  public distance: number = 0;
  constructor(
    public location:Point = new Point(),
    public owner:number = -1,
    public unitType:number = -2, // -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER, 2 = GIANT
    public health:number = 0) {
      this.location = location;
    }
    public isOwner(): boolean {
      return this.owner === 0;
    }
    public isQueen(): boolean {
      return this.unitType === -1;
    }
    public isKnight() {
      return this.unitType === 0;
    }
    public isArcher() {
      return this.unitType === 1;
    }
    public isGiant() {
      return this.unitType === 2;
    }
    public toString = () : string => {
      return `Unit [${this.location.x},${this.location.y}] type:${this.unitType} owner:${this.owner} health:${this.health}`;
    }
}
