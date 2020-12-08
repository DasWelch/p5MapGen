class MapDisplay {
    DrawNoiseMap(noiseMap) {
      const mapWidth = noiseMap[0].length;
      const mapHeight = noiseMap[1].length;
      this.texture = new Texture(mapWidth, mapHeight);
      let colorMap = new Array(mapWidth * mapHeight);
  
      for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
          colorMap[y * mapWidth + x] = lerpColor(
            color(0, 0, 0),
            color(255, 0, 0),
            noiseMap[x][y]
          );
          //console.log()
        }
      }
  
      this.texture.setPixels(colorMap);
  
      this.display();
    }
  
    display() {
      let board = new Array(height * width);
  
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          board[y * width + x] = new Cell(
            x,
            y,
            1,
            1,
            this.texture.textureMap[y * width + x]
          );
          board[y * width + x].display();
        }
      }
    }
  }