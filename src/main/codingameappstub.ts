/**
 * Use this stub to create new codingame apps
 * Be sure to add an entry in the webpack.config.js
 */
// put any imports here

// the program executor
export class CodingameApp {
  public run() {
    // read pre-loop inputs
    // TODO read pre-loop inputs
    // game loop
    while (true) {
      // read loop inputs
      // printErr('debug message');
      // print('game command');
    }
  }
}

// START PROGRAM
if(typeof isRunAtCodingame === 'boolean') {
  new CodingameApp().run() // start the program if the code is run at codingame
}
