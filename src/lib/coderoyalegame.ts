import {Point,KeyPoint} from '../lib/point';
import {CodeRoyaleSite} from '../lib/coderoyalesite';
import {CodeRoyaleUnit} from '../lib/coderoyaleunit';
import {CodeRoyaleTracker} from '../lib/coderoyaletracker';

export class CodeRoyaleGame {
  private tracker: CodeRoyaleTracker = new CodeRoyaleTracker();

  /**
   * Game initialization before main loop
   */
  public setupSites() {
    this.tracker.numSites = parseInt(readline());
    for (let i = 0; i < this.tracker.numSites; i++) {
      let inputs = readline().split(' ');
      let siteId:number = parseInt(inputs[0]);
      // siteId, location, radius
      let site:CodeRoyaleSite = new CodeRoyaleSite(siteId, new Point(parseInt(inputs[1]),parseInt(inputs[2])), parseInt(inputs[3]));
      this.tracker.updateSite(site);
    }
  }
  /**
   * Main game loop
   */
  public setupTurn() {
    this.tracker.clear();

    let inputs = readline().split(' ');
    this.tracker.gold = parseInt(inputs[0]);
    this.tracker.touchedSite = parseInt(inputs[1]);
    // site updates
    for (let i = 0; i < this.tracker.numSites; i++) {
      let inputs = readline().split(' ');
      let siteId:number = parseInt(inputs[0]);
      let site:CodeRoyaleSite = this.tracker.getSite(siteId);
      site.ignore1 = parseInt(inputs[1]);
      site.ignore2 = parseInt(inputs[2]);
      site.structureType = parseInt(inputs[3]);
      site.owner = parseInt(inputs[4]);
      let param1:number = parseInt(inputs[5]);
      let param2:number = parseInt(inputs[6]);
      if (site.isBarracks()) {
        site.trainCountdown = param1;
        site.trainType = param2;
      } else if (site.isTower()) {
        site.towerHealth = param1;
        site.towerRadius = param2;
      }
      this.tracker.updateSite(site);
    }
    // unit updates
    let numUnits = parseInt(readline());
    for (let i = 0; i < numUnits; i++) {
      let inputs = readline().split(' ');
      let unit:CodeRoyaleUnit = new CodeRoyaleUnit(new Point(parseInt(inputs[0]),parseInt(inputs[1])), parseInt(inputs[2]), parseInt(inputs[3]), parseInt(inputs[4]));
      this.tracker.updateUnit(unit);
    }
  }
  public performAction() {
    // TODO determine if building then what to build
    // TODO determine if moving then where to move
    // TODO determine if training that what to train
//    let buildSites: KeyPoint[] = this.tracker.getClosestBuildSites();

    // must perform 'WAIT' or 'MOVE x y', or 'BUILD siteId BARRACKS-{type}'
    // can perform 'TRAIN siteId1 siteIdn'
    if (this.build() || this.move()) {
      this.train();
    } else {
      this.wait();
      this.train();
    }
  }
  private move() {
    let result:boolean = false;
    // TODO fix movement to decide based on health, gamer and enemy units
    // TODO nearest site? update tower? run away? go to gamer tower?
    if (location !== null) {
      print('MOVE ' + location.x + ' ' + location.y);
      result = true;
    }
    // build mode: move to nearest site that is not built
    // TODO may need better better strategy for deciding to move
    // if (this.enemyArchersBarracks.length + 2 > this.queenArchersBarracks.length ||
    //   this.enemyKnightsBarracks.length + 2 > this.queenKnightsBarracks.length) {
    //   let sortedSiteIds:number[] = this.getClosestBuildSites();
    //   if (sortedSiteIds.length > 0) {
    //     let site = this.getSite(sortedSiteIds[0]);
    //     let closetSite:Point = site.location;
    //     print('MOVE ' + closetSite.x + ' ' + closetSite.y);
    //     printErr('Moving towards site ' + site.toString());
    //     result = true;
    //   }
    // } else {
    //   print('MOVE ' + this.homeLocation.x + ' ' + this.homeLocation.y);
    //   printErr('Moving towards home ' + this.homeLocation.toString());
    //   result = true;
    // }
    return result;
  }
  /**
   * build the given choice, if possible
   * Options:
   *   BUILD {siteId} BARRACKS-KNIGHT
   *   BUILD {siteId} BARRACKS-ARCHER
   *   BUILD {siteId} BARRACKS-GIANT
   *   BUILD {siteId} TOWER
   *   Calling TOWER build again will repair or increase range of the tower
   */
  private build():boolean {
    let result:boolean = false;
    let choice: string = this.tracker.getBuildChoice();
    if (choice !== '') {
      print('BUILD ' + this.tracker.touchedSite + ' ' + choice);
      result = true;
    }
    return result;
  }
  private train() {
    // TODO fix training to decide based on cost, health, gamer and enemy units
    let trainableArcherSites:KeyPoint[] = [];
    let trainableKnightSites:KeyPoint[] = [];
    let trainingCost:number = 0;
    for (let site of this.sites.values()) {
      // site is able to be trained
      if (site && site.canTrain()) {
        if (site.isArcher()) {
          trainableArcherSites.push(new KeyPoint(site.siteId,site.location));
        } else if (site.isKnight()) {
          trainableKnightSites.push(new KeyPoint(site.siteId,site.location));
        }
      }
    }
    // sorted by closest archer barracks to my queen, closest knight barracks to enemy queen
    // trainableArcherSites = KeyPoint.sortByClosest(trainableArcherSites,this.queenUnit.location);
    // trainableKnightSites = KeyPoint.sortByClosest(trainableKnightSites,this.enemyQueen.location);
    // TODO need to prioritize whether we need archers vs knights
    // TODO prioritize by location
    // this.enemyArchers = [];
    // this.enemyKnights = [];
    // this.queenArchers = [];
    // this.queenKnights = [];
    // let enoughGold = trainingCost + site.cost() < this.gold;
    // trainableSiteIds.push(siteId);
    // trainingCost += site.cost();
    // if (trainableSiteIds.length > 0) {
    //   let archers:number = 0;
    //   let knights:number = 0;
    //   for (let siteId of trainableSiteIds) {
    //     if (this.getSite(siteId).isArcher()) {
    //       archers++;
    //     } else if (this.getSite(siteId).isKnight()) {
    //       knights++;
    //     }
    //   }
    //   printErr('Training gold: ' + this.gold + ' cost:' + trainingCost + ' archers:' + archers + ' knights:' + knights);
    //   print('TRAIN ' + trainableSiteIds.join(' '));
    // } else {
    //   print('TRAIN');
    // }
  }
  private wait() {
    print('WAIT');
  }
}
