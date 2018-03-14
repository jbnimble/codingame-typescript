import {Point} from '../lib/point';

describe('Test Point class', function () {
  it('cardinalDirection should be a function', function () {
    new Point(0,0).cardinalDirection.should.be.a('function')
  })
  it('cardinal direction test N', function () {
    new Point(0,0).cardinalDirection(new Point(0,1)).should.equal('N');
  })
  it('cardinal direction test NE', function () {
    new Point(0,0).cardinalDirection(new Point(1,1)).should.equal('NE');
  })
  it('cardinal direction test E', function () {
    new Point(0,0).cardinalDirection(new Point(1,0)).should.equal('E');
  })
  it('cardinal direction test SE', function () {
    new Point(0,0).cardinalDirection(new Point(1,-1)).should.equal('SE');
  })
  it('cardinal direction test S', function () {
    new Point(0,0).cardinalDirection(new Point(0,-1)).should.equal('S');
  })
  it('cardinal direction test SW', function () {
    new Point(0,0).cardinalDirection(new Point(-1,-1)).should.equal('SW');
  })
  it('cardinal direction test W', function () {
    new Point(0,0).cardinalDirection(new Point(-1,0)).should.equal('W');
  })
  it('cardinal direction test NW', function () {
    new Point(0,0).cardinalDirection(new Point(-1,1)).should.equal('NW');
  })
  it('cardinalIncrement should be a function', function () {
    new Point(0,0).cardinalIncrement.should.be.a('function')
  })
  it('cardinal increment test N', function () {
    new Point(0,0).cardinalIncrement('N',1).x.should.equal(0);
    new Point(0,0).cardinalIncrement('N',1).y.should.equal(1);
  })
  it('cardinal increment test NE', function () {
    new Point(0,0).cardinalIncrement('NE',1).x.should.equal(1);
    new Point(0,0).cardinalIncrement('NE',1).y.should.equal(1);
  })
  it('cardinal increment test E', function () {
    new Point(0,0).cardinalIncrement('E',1).x.should.equal(1);
    new Point(0,0).cardinalIncrement('E',1).y.should.equal(0);
  })
  it('cardinal increment test SE', function () {
    new Point(0,0).cardinalIncrement('SE',1).x.should.equal(1);
    new Point(0,0).cardinalIncrement('SE',1).y.should.equal(-1);
  })
  it('cardinal increment test S', function () {
    new Point(0,0).cardinalIncrement('S',1).x.should.equal(0);
    new Point(0,0).cardinalIncrement('S',1).y.should.equal(-1);
  })
  it('cardinal increment test SW', function () {
    new Point(0,0).cardinalIncrement('SW',1).x.should.equal(-1);
    new Point(0,0).cardinalIncrement('SW',1).y.should.equal(-1);
  })
  it('cardinal increment test W', function () {
    new Point(0,0).cardinalIncrement('W',1).x.should.equal(-1);
    new Point(0,0).cardinalIncrement('W',1).y.should.equal(0);
  })
  it('cardinal increment test NW', function () {
    new Point(0,0).cardinalIncrement('NW',1).x.should.equal(-1, 'x portion');
    new Point(0,0).cardinalIncrement('NW',1).y.should.equal(1, 'y portion');
  })
})
