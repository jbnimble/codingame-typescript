
export class Bresenham {
  plot:number[][] = [];
  constructor(w:number, h:number) {
    for (let i=0; i<h; i++) {
      this.plot[h] = new Array(w).fill(0);
    }
  }
  public bline(x0:number, y0:number, x1:number, y1:number) {
    let dx = Math.abs(x1 - x0);
    let sx = x0 < x1 ? 1 : -1;
    let dy = Math.abs(y1 - y0);
    let sy = y0 < y1 ? 1 : -1;
    let err = (dx>dy ? dx : -dy)/2;
    while (true) {
      this.plot[x0][y0] = 1; //setPixel(x0,y0);
      if (x0 === x1 && y0 === y1) {
        break;
      }
      let e2 = err;
      if (e2 > -dx) {
        err -= dy; x0 += sx;
      }
      if (e2 < dy) {
        err += dx; y0 += sy;
      }
    }
  }
}
