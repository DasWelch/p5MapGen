class Cell {
    constructor(startx, starty, w, h, c) {
      this.xpos = startx;
      this.ypos = starty;
      this.w = w;
      this.h = h;
      this.color = c;

      // console.log(c)
    }
  
    updateColor(c) {
      this.color = c;
    }
  
    display() {
      fill(this.color);
      noStroke();
      rect(this.xpos, this.ypos, this.w, this.h);
    }
  }