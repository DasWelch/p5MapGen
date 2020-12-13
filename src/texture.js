class Texture {
  constructor(w, h) {
    this.textureWidth = w;
    this.textureHeight = h;
    this.textureMap = new Array(w * h);
  }

  setPixels(colorMap, mapWidth, mapHeight) {
    for (let y = 0; y < this.textureHeight; y++) {
      for (let x = 0; x < this.textureWidth; x++) {
        this.textureMap[y * this.textureWidth + x] = colorMap[y * mapWidth + x];
      }
    }
  }
}
