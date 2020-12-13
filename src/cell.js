class Cell {
    constructor(startx, starty, w, h, c, region) {
      this.xpos = startx;
      this.ypos = starty;
      this.w = w;
      this.h = h;
      
      this.color = c;
      this.region = region;
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