/**
 * TODO: this whole algorithm needs some refactor, and unit tests
 */

// the program executor
export class CodingameApp {
  public run() {
    var MESSAGE = readline();

    var result = '';
    var base2blocks = [];
    for (var i = 0; i < MESSAGE.length; i++) {
        var char = MESSAGE[i];
        var codeAt = getAsciiCode(char);
        var base2 = getBase2String(codeAt);
        var codes = [];
        var altChar = base2[0] === '0' ? '1' : '0';
        var othChar = altChar === '0' ? '1' : '0';
        var more2go = true;
        var fromIndex = 0;
        var lastIndex = 0;
        printErr('char='+char+' codeAt='+codeAt+' base2='+base2+' length='+base2.length);
        while (more2go) {
            var index = base2.indexOf(altChar,fromIndex);
            if (lastIndex === fromIndex) {
                codes.push({'key':othChar,'count':index});
                printErr('begin '+JSON.stringify(codes[codes.length-1]));
            } else if (index === -1) {
                more2go = false;
                if (fromIndex < base2.length) {
                    codes.push({'key':othChar,'count':base2.length - fromIndex});
                    printErr('end2 '+ JSON.stringify(codes[codes.length-1]));
                }
            } else {
                printErr('middle...');
                // TODO
            }
            printErr('...loop altChar='+altChar+' othChar='+othChar+' last='+lastIndex+' from='+fromIndex+' index='+index);
            lastIndex = fromIndex;
            fromIndex = fromIndex + index + 1;
        }

        var block = {'char':char,'ascii':codeAt,'base2':base2,'codes':codes};
        base2blocks.push(block);
    }
    print(result);

    function getAsciiCode(c:string) {
        return c.charCodeAt(0);
    }

    function getBase2String(num:number) {
        return num.toString(2);
    }
  }
}

// START PROGRAM
if(typeof isRunAtCodingame === 'boolean') {
  new CodingameApp().run() // start the program if the code is run at codingame
}
