/**
 * CodingGameApp for Code Royale contest
 */
// put any imports here
import {CodeRoyaleGame} from '../lib/coderoyalegame';

// the program executor
export class CodingameApp {
  public run() {
    let game:CodeRoyaleGame = new CodeRoyaleGame();
    game.setupSites();
    // game loop
    while (true) {
      game.setupTurn();
      game.performAction();
    }
  }
}

// START PROGRAM
if(typeof isRunAtCodingame === 'boolean') {
  new CodingameApp().run() // start the program if the code is run at codingame
}
