import {Strings} from '../lib/strings'

// the program executor
export class CodingameApp {
  public run() {
    let MESSAGE = readline();
    let base2s = '';
    for (var i = 0; i < MESSAGE.length; i++) {
        var char = MESSAGE[i];
        // get ascii code, then convert to base2
        var base2 = char.charCodeAt(0).toString(2);
        // pad front if less than 7 bits
        base2 = base2.length < 7 ? '0'.repeat(7-base2.length) + base2 : base2;
        printErr('loop ' + char + ' ' + base2);
        base2s += base2;
    }
    // group by same characters
    var codes = Strings.group(base2s);
    printErr('codes ' + codes)
    // encode with chuck norris algorithm
    print(Strings.chuckNorrisEncode(codes));
  }
}

// START PROGRAM
if(typeof isRunAtCodingame === 'boolean') {
  new CodingameApp().run() // start the program if the code is run at codingame
}
