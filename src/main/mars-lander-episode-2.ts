import {Point} from '../lib/point';
import {Line} from '../lib/shapes2d';
import {Motion2D} from '../lib/motion2d';
import {LanderState} from '../lib/landerstate';

//const surfaceXMax:number = 7000; // board is 0 to 6999 in X dimension
//const surfaceYMax:number = 3000; // board is 0 to 2999 in Y dimension
const landingXMin:number = 1000;
const gravity:number = -3.711; // m/s^2
//const velocityYMax:number = 40; // m/s
//const velocityXMax:number = 20; // m/s

/**
 * Mars Lander Episode 2
 * References:
 * https://www.khanacademy.org/science/physics/two-dimensional-motion/two-dimensional-projectile-mot/a/what-are-velocity-components
 *
 */
export class CodingameApp {
  surface:Point[] = [];
  state:LanderState;
  states:LanderState[] = [];
//  landingPoints:Point[] = [];
  landingZone:Line;
  // tilt angle -90 to 90 degrees
  // thrust 0 to 4, creates force of X m/s^2 and uses X liters of fuel
  // surface points connect to make lines, flat spot should be at least 1000 wide
  public run() {
//    printErr('A elapsed='+elapsed() + ' dateNow='+dateNow());
//    timeout(0.1,function() {printErr('###### test ##### '+dateNow())});
//    sleep(1);
//    printErr('B elapsed='+elapsed() + ' dateNow='+dateNow());

    let surfaceN:number = parseInt(readline());
    for (let i:number = 0; i < surfaceN; i++) {
      let inputs:string[] = readline().split(' ');
      let next:Point = new Point(parseInt(inputs[0]),parseInt(inputs[1]));
      if (this.surface.length !== 0) {
        let line:Line = new Line(this.surface[this.surface.length - 1], next)
        // currently assuming there will only be a single landing zone
        if (line.isHorizontal() && line.length() >= landingXMin) {
          this.landingZone = new Line(line.p1, line.p2);
          printErr('landingZone='+this.landingZone);
        }
      }
      this.surface.push(next);
      printErr(i+' elapsed='+elapsed() + ' dateNow='+dateNow());
    }
    /*
      IDEA: path finding via flight corridors using cardinal directions
      with surface data work backwards creating flight corridors from landing site to ceiling
      once the position of the lander is known, find corridors that meet

      finding corridors requires finding line intersections and deciding which direction to head next

      find corridor from landing zone to ceiling
        headings => N, NE, NW
        loop until done
          if heading N and reach ceiling
            then done, record corridor
          if not heading N and reach obstacle
    */
//    printErr('C elapsed='+elapsed() + ' dateNow='+dateNow());
    //sleep(1000);
//    printErr('after sleep');
    // TODO build astar Graph from surface points
    // see https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
    // make graph points X units squared (100? 50?)
    // TODO search Graph to find best path

    // TODO calculate middle of landing area
    // TODO calculate horizontal and vertical to middle of landing area
    // TODO calculate h/v between highest obstacle to middle of landing area
    // TODO calculate best fit curve, and projectile equations
    // TODO change angle and thrust to reach goal

    // TODO create Line class for
    // TODO create Lines class

//    printErr('surface loop complete');
//    printErr('surface='+this.surface);
//    printErr('landing='+this.landingPoints);
    // game loop, represents 1 second per loop
    let loops:number = 0;
    while (true) {
      loops++;
      printErr('loop='+loops+' elapsed='+elapsed());
      let inputs = readline().split(' ');
      this.state = new LanderState(parseInt(inputs[0]),parseInt(inputs[1]), //position X,Y
        parseInt(inputs[2]),parseInt(inputs[3]), // velocity X,Y
        parseInt(inputs[4]), // fuel
        parseInt(inputs[5]),parseInt(inputs[6])); // rotation,power
      this.states.push(this.state);

      printErr('landingZone='+this.landingZone);
      let magnitude = this.state.velocity.magnitude();
      let angle = this.state.velocity.angleDegrees();
//      let trajectory = Maths.trajectory(this.state.position.x, angle, gravity, this.state.velocity.x);
      let v0x = Motion2D.velocityInitialX(angle, magnitude);
      let v0y = Motion2D.velocityInitialY(angle, magnitude);
      let vy = Motion2D.velocity(this.state.position.y, this.landingZone.p1.y, gravity, v0y);
      let ty = Motion2D.time(v0y, vy, gravity);
      let dx = Motion2D.distance(v0x, ty, 0);
      printErr('magnitude='+magnitude+' angle='+angle.toFixed(0));
      printErr('v0x='+v0x.toFixed(2)+' v0y='+v0y.toFixed(2)+' vy='+vy.toFixed(2)+' ty='+ty.toFixed(2)+' dx='+dx.toFixed(2));

//      printErr('trajectory='+trajectory);
/*
vertical position = (horizontal position)(tangent of launch angle)
  - (acceleration due to gravity)(horizontal position)^2
  / 2*(initial velocity)^2 * (cosine of launch angle)^2

  y = x tan theta - gx^2 / 2v0^2 cos2 theta
  y = vertical position in meters
  x = horizontal position in meters
  v0 = initial velocity in m/s
  g = acceleration due to gravity
  theta = angle of the intial velocity from the horizontal plane
*/
      // rotate power. rotate is the desired rotation angle. power is the desired thrust power.
      print('0 0');
    }
  }
    //     //    90
    //     // 180   0
    //     //    270
    //     // acceleration angle in Degrees offset by 90 degrees
    //     var accAngle = (Math.atan2(hSpeed, vSpeed) * 180 / Math.PI) + 90;
    //     rotate = Math.abs(accAngle) > 90 ? Math.sign(accAngle)* 90 * -1 : accAngle * -1;
    // //    var radCorr = radAngle - (Math.sign(radAngle)*Math.PI/4);
    // //    var degAngle = radAngle * 180 / Math.PI;
    //     printErr('flats='+flats+' accAngle='+accAngle+' accOppos='+rotate);
    //     // rotate power. rotate is the desired rotation angle. power is the desired thrust power.
    //     print(rotate.toFixed(0)+' '+power);
    // }
    //
    // function calcMovingPower(power, hSpeed, distance) {
    //     if (Math.abs(hSpeed) > 50) {
    //         power--;
    //     } else if (distance < 50) {
    //         power++;
    //     } else if (power === 0) {
    //         power++;
    //     }
    //     return power;
    // }
    //
    // function pythagoras(x1, y1, x2, y2) {
    //     return Math.sqrt(Math.pow(Math.abs(x2-x1))+Math.pow(Math.abs(y2-y1)));
    // }
    //   }
}

// START PROGRAM
if(typeof isRunAtCodingame === 'boolean') {
  new CodingameApp().run() // start the program if the code is run at codingame
}
