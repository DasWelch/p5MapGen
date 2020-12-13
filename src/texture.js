class Texture {
  // will directly manipulate pixels
  // might add this class after i figure out the mapper here
  constructor(w, h) {
    this.textureWidth = w;
    this.textureHeight = h;

    this.textureMap = new Array(w * h);
    // console.log("created texture");
  }

  setPixels(colorMap, mapWidth, mapHeight) {
    console.log(colorMap)
    for (let y = 0; y < this.textureHeight; y++) {
      for (let x = 0; x < this.textureWidth; x++) {
        //console.log("mw:" + (y * mapWidth + x));

        this.textureMap[y * this.textureWidth + x] =
          colorMap[y * mapWidth + x]; // using this could scale the
        // console.log(this.textureMap[y * this.textureWidth + x]);
      }
    }
  }
}
