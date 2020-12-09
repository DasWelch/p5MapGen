class Texture {
    // might add this class after i figure out the mapper here
    constructor(w, h) {
      this.twidth = w;
      this.theight = h;
  
      this.textureMap = new Array(w * h);
    }
  
    setPixels(colorMap) {
      for (let y = 0; y < this.theight; y++) {
        for (let x = 0; x < this.twidth; x++) {
          this.textureMap[y * this.twidth + x] = colorMap[y * this.twidth + x]; // using this could scale the 
        }
      }
    }
  }