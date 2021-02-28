class RegonalCell {
    constructor(p5,startx, starty, w, h, region) {
      this.p5 = p5
      this.xpos = startx;
      this.ypos = starty;
      this.w = w;
      this.h = h;
      this.region = region;
    }
  
    display() {
      this.p5.fill(this.region.color);
      this.p5.noStroke();
      this.p5.rect(this.xpos, this.ypos, this.w, this.h);
    }
  }

  class NoiseCell {
    constructor(p5, startx, starty, w, h, color) {
      this.p5 = p5
      this.xpos = startx;
      this.ypos = starty;
      this.w = w;
      this.h = h;
      this.color = color;
    }
  
    display() {
      this.p5.fill(this.color);
      this.p5.noStroke();
      this.p5.rect(this.xpos, this.ypos, this.w, this.h);
    }
  }