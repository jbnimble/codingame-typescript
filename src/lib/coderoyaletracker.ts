import {Point,KeyPoint} from '../lib/point';
import {CodeRoyaleSite} from '../lib/coderoyalesite';
import {CodeRoyaleUnit} from '../lib/coderoyaleunit';

export class CodeRoyaleTracker {
  //field:Point = new Point(1920,1000);
  //queenRadius:number = 30;
  //queenMaxMove:number = 60;
  public static BARRACKS_KNIGHT:string = 'BARRACKS-KNIGHT';
  public static BARRACKS_ARCHER:string = 'BARRACKS-ARCHER';
  public static BARRACKS_GIANT:string = 'BARRACKS-GIANT';
  public static BARRACKS_TOWER:string = 'TOWER';

  public numSites: number = 0;
  public gold: number = 0;
  public touchedSite: number = -1;

  private sites: Map<number,CodeRoyaleSite> = new Map();
  // Map<structureType,Map<siteId,site>>
  private gamerSites: Map<number,Map<number,CodeRoyaleSite>> = new Map();
  private enemySites: Map<number,Map<number,CodeRoyaleSite>> = new Map();
  private availSites: Map<number,Map<number,CodeRoyaleSite>> = new Map();
  // Map<trainType,Map<siteId,site>>
  private gamerBarak: Map<number,Map<number,CodeRoyaleSite>> = new Map();
  private enemyBarak: Map<number,Map<number,CodeRoyaleSite>> = new Map();
  // Map<unitType,unit[]>
  private gamerUnits: Map<number,CodeRoyaleUnit[]> = new Map();
  private enemyUnits: Map<number,CodeRoyaleUnit[]> = new Map();

  public getSite(siteId: number): CodeRoyaleSite {
    let site: CodeRoyaleSite | undefined = this.sites.get(siteId);
    if (site === undefined) {
      site = new CodeRoyaleSite(siteId);
    }
    return site;
  }
  public updateSite(site: CodeRoyaleSite) {
    // track mine
    this.sites.set(site.siteId, site);
    if (site.isOwner()) {
      // gamer sites
      let structureType: number = site.structureType;
      this.gamerSites.set(structureType, this.add2Site(site, this.gamerSites.get(structureType)));
      if (structureType === CodeRoyaleSite.STRUCTURE_BARAC) {
        let trainType: number = site.trainType;
        this.gamerBarak.set(trainType, this.add2Site(site, this.gamerBarak.get(trainType)));
      }
    } else if (site.isEnemy()) {
      // enemy sites
      let structureType: number = site.structureType;
      this.enemySites.set(structureType, this.add2Site(site, this.enemySites.get(structureType)));
      if (structureType === CodeRoyaleSite.STRUCTURE_BARAC) {
        let trainType: number = site.trainType;
        this.enemyBarak.set(trainType, this.add2Site(site, this.enemyBarak.get(trainType)));
      }
    } else {
      // available sites
      let structureType: number = site.structureType;
      this.availSites.set(structureType, this.add2Site(site, this.availSites.get(structureType)));
    }
  }
  public updateUnit(unit: CodeRoyaleUnit) {
    // sort units by type and ownership
    if (unit.isOwner()) {
      // gamer units
      let unitType: number = unit.unitType;
      this.gamerUnits.set(unitType, this.add2Unit(unit, this.gamerUnits.get(unitType)));
    } else {
      // enemy units
      let unitType: number = unit.unitType;
      this.enemyUnits.set(unitType, this.add2Unit(unit, this.enemyUnits.get(unitType)));
    }
  }
  public clear() {
    this.gamerSites = new Map();
    this.enemySites = new Map();
    this.availSites = new Map();
    this.gamerBarak = new Map();
    this.enemyBarak = new Map();
    this.gamerUnits = new Map();
    this.enemyUnits = new Map();
  }

  /**
   * buildable sites ordered by distance from queen
   */
  public getClosestBuildSites(): KeyPoint[] {
    let buildableSites:KeyPoint[] = [];
    for (let site of this.sites.values()) {
      if (site.isNoStructure() || (site.isOwner() && site.isTower())) {
        buildableSites.push(new KeyPoint(site.siteId,site.location));
      }
    }
    let queen: CodeRoyaleUnit | null = this.getGamerQueen();
    if (queen !== null) {
      return KeyPoint.sortByClosest(buildableSites, queen.location);
    } else {
      return buildableSites;
    }
  }

  /**
   * Choices of thing to build
   */
   /**
    * determine build choice
    * Options:
    *   BUILD {siteId} BARRACKS-KNIGHT
    *   BUILD {siteId} BARRACKS-ARCHER
    *   BUILD {siteId} BARRACKS-GIANT
    *   BUILD {siteId} TOWER
    *   Calling TOWER build again will repair or increase range of the tower
    */
  public getBuildChoice(): string {
    let result:string = '';
    if (this.touchedSite !== -1) {
      let availSiteMap: Map<number,CodeRoyaleSite> | undefined = this.availSites.get(CodeRoyaleSite.STRUCTURE_AVAIL);
      let towerSiteMap: Map<number,CodeRoyaleSite> | undefined = this.gamerSites.get(CodeRoyaleSite.STRUCTURE_TOWER);
      let knightMap: Map<number,CodeRoyaleSite> | undefined = this.gamerBarak.get(CodeRoyaleSite.BARACK_KNIGHT);
      let archerMap: Map<number,CodeRoyaleSite> | undefined = this.gamerBarak.get(CodeRoyaleSite.BARACK_ARCHER);
      let giantMap: Map<number,CodeRoyaleSite> | undefined = this.gamerBarak.get(CodeRoyaleSite.BARACK_GIANT);
      if (availSiteMap && availSiteMap.has(this.touchedSite)) {
        //let site: CodeRoyaleSite | undefined = availSiteMap.get(this.touchedSite);
        // TODO decide to build
        // does a knight or archer or giant barracks exist, if not then build?
        if (knightMap === undefined || knightMap.size == 0) {
          result = CodeRoyaleTracker.BARRACKS_KNIGHT;
        } else if (archerMap === undefined || archerMap.size == 0) {
          result = CodeRoyaleTracker.BARRACKS_ARCHER;
        } else if (giantMap === undefined || giantMap.size == 0) {
          result = CodeRoyaleTracker.BARRACKS_GIANT;
        }
        // TODO build TOWER
        // TODO decide when to create or convert barracks
      } else if (towerSiteMap && towerSiteMap.has(this.touchedSite)) {
        //let site: CodeRoyaleSite | undefined = towerSiteMap.get(this.touchedSite);
        // TODO decide to update tower
      }
    }
    return result;
  }

  private getGamerQueen(): CodeRoyaleUnit | null {
    let result: CodeRoyaleUnit | null = null;
    let arr:CodeRoyaleUnit[] | undefined = this.gamerUnits.get(CodeRoyaleUnit.TYPE_QUEEN);
    if (arr !== undefined && arr.length > 0) {
      result = arr[0];
    }
    return result;
  }
  private add2Site(site: CodeRoyaleSite, siteMap: Map<number,CodeRoyaleSite> | undefined): Map<number,CodeRoyaleSite> {
    siteMap = (siteMap === undefined) ? new Map() : siteMap;
    siteMap.set(site.siteId, site);
    return siteMap;
  }
  private add2Unit(unit: CodeRoyaleUnit, unitArr: CodeRoyaleUnit[] | undefined): CodeRoyaleUnit[] {
    unitArr = (unitArr === undefined) ? [] : unitArr;
    unitArr.push(unit);
    return unitArr;
  }
}
