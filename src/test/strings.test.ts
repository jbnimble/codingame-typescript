import {Strings} from '../lib/strings';

describe('Test Strings class', function () {
  it('group should be a function', function () {
    new Strings('00001100011111').group.should.be.a('function')
  })
  it('test group()', function () {
    // TODO this negating regex is not working
    /*
    var regex = new RegExp('(.)\1*','g');//('(0+)|(1+)','g');
        var groups = [];
        '000011000111110'.replace(regex,function(match,m1,m2,offset,str) {
          if (m1) groups.push(m1);
          if (m2) groups.push(m2);
          return str;
        });

    */
    let regex = new RegExp('(0+)(1+)','g');
    let groups = [];
    '000011000111110'.replace(regex,function(match,zstr,ostr,offset,str):string {
      if (zstr) groups.push(zstr);
      if (ostr) groups.push(ostr);
      return str;
    });
    //let index = '00001100011111'.search(new RegExp('[^'+'0'+']'));
    //index.should.equal(4,'verify search');
    //let groups = new Strings('00001100011111').group();
    groups.length.should.equal(4,'length check data='+groups);
    groups[0].should.equal('00001','4 zeros data='+groups);
    groups[1].should.equal('11', '2 ones');
    groups[2].should.equal('000');
    groups[3].should.equal('11111');
  })
})
