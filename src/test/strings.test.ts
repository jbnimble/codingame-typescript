import {Strings} from '../lib/strings';

describe('Test Strings class', function () {
  it('test group()', function () {
    let groups = Strings.group('00001100011111');
    groups.length.should.equal(4,'length check data='+groups);
    groups[0].should.equal('0000','4 zeros data='+groups);
    groups[1].should.equal('11', '2 ones');
    groups[2].should.equal('000');
    groups[3].should.equal('11111');
  })
  it('test chuckNorrisEncode()', function () {
    let groups = ['1','0000','11'];
    let result = Strings.chuckNorrisEncode(groups);
    result.should.equal('0 0 00 0000 0 00','groups='+groups+' result='+result);
  })
})
