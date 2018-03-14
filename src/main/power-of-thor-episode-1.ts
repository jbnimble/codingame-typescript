import {Point} from '../lib/point';

// the program executor
export class CodingameApp {
  public run() {
    // read pre-loop inputs
    var inputs = readline().split(' ');
    var lightX = parseInt(inputs[0]); // the X position of the light of power
    var lightY = parseInt(inputs[1]); // the Y position of the light of power
    var initialTX = parseInt(inputs[2]); // Thor's starting X position
    var initialTY = parseInt(inputs[3]); // Thor's starting Y position
    // the Y axis is inversed and pointing down, multiply Y by -1
    let thor:Point = new Point(initialTX,-1*initialTY);
    let light:Point = new Point(lightX,-1*lightY);
    // game loop
    while (true) {
      // The remaining amount of turns Thor can move. Do not remove this line.
      var remainingTurns = parseInt(readline());
      var move = thor.cardinalDirection(light);
      printErr('thor='+thor.toString()+' light='+light.toString()+' rem='+remainingTurns+' move='+move);
      // A single line providing the move to be made: N NE E SE S SW W or NW
      print(move);
      let nextThor = thor.cardinalIncrement(move,1);
      thor.x = nextThor.x;
      thor.y = nextThor.y
      printErr('thor='+thor.toString()+' after move');
    }
  }
}

// START PROGRAM
if(typeof isRunAtCodingame === 'boolean') {
  new CodingameApp().run() // start the program if the code is run at codingame
}
