import {Point} from '../lib/point';

export class CodeRoyaleSite {
  public static STRUCTURE_AVAIL: number = -1;
  public static STRUCTURE_TOWER: number = 1;
  public static STRUCTURE_BARAC: number = 2;

  public static BARACK_KNIGHT: number = 0;
  public static BARACK_ARCHER: number = 1;
  public static BARACK_GIANT: number = 2;

  public distance: number = 0;
  private knightCost:number = 80;
  private archerCost:number = 100;
  public ignore1:number = -1;          // used in future leagues
  public ignore2:number = -1;          // used in future leagues
  public structureType:number = -1;    // -1 = No structure, 1 = Tower, 2 = Barracks
  public owner:number = -1;            // -1 = No structure, 0 = Friendly, 1 = Enemy
  public trainCountdown:number = -1;   // turns until can train barracks
  public trainType:number = -1;        // 0 = KNIGHT, 1 = ARCHER, 2 = GIANT
  public towerHealth:number = 0;
  public towerRadius:number = 0;

  constructor(
    public siteId:number = -1,           // numeric identifier of the site
    public location:Point = new Point(), // coordinate of site center
    public radius:number = 0) {}         // radius of the site
    public isNoStructure(): boolean {
      return this.structureType === -1;
    }
    public isBarracks(): boolean {
      return this.structureType === 2;
    }
    public isTower(): boolean {
      return this.structureType === 1;
    }
    public getOwner(): number {
      return this.owner;
    }
    public isOwner(): boolean {
      return this.owner === 0;
    }
    public isEnemy(): boolean {
      return this.owner === 1;
    }
    public isKnight(): boolean {
      return this.trainType === 0;
    }
    public isArcher(): boolean {
      return this.trainType === 1;
    }
    public isGiant(): boolean {
      return this.trainType === 2;
    }
    public canTrain(): boolean {
      return this.trainCountdown === 0 && this.isBarracks();
    }
    public cost(): number {
      let result:number = 0;
      if (this.isArcher()) {
        result = this.archerCost;
      } else if (this.isKnight()) {
        result = this.knightCost;
      }
      return result;
    }
    public toString = () : string => {
      return `Site [${this.location.x},${this.location.y}] id:${this.siteId} owner:${this.owner} barracks:${this.isBarracks()} type:${this.isBarracks() ? this.isArcher() ? 'ARCHER' : this.isKnight ? 'KNIGHT' : 'other' : 'none'}`;
    }
}
