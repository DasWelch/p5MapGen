class RegonalCell {
    constructor(startx, starty, w, h, region) {
      this.xpos = startx;
      this.ypos = starty;
      this.w = w;
      this.h = h;
      this.region = region;
    }
  
    display() {
      fill(this.region.color);
      noStroke();
      rect(this.xpos, this.ypos, this.w, this.h);
    }
  }

  class NoiseCell {
    constructor(startx, starty, w, h, color) {
      this.xpos = startx;
      this.ypos = starty;
      this.w = w;
      this.h = h;
      this.color = color;
    }
  
    display() {
      fill(this.color);
      noStroke();
      rect(this.xpos, this.ypos, this.w, this.h);
    }
  }