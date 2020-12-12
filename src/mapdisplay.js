class MapDisplay {
    DrawTexture(map) { //2d noise map 
      const mapHeight = map.length;
      const mapWidth = map[0].length;
      
      this.texture = new Texture(mapWidth, mapHeight);
      let colorMap = TextureGenerator.TexturefromHeightMap(map, mapWidth, mapHeight);
  
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