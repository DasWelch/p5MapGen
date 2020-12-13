class MapDisplay {
  CreateTexture(map, mapWidth, mapHeight) { //2d noise map 
    //console.log (map)
      
      this.texture = new Texture(mapWidth, mapHeight);
      let colorMap = TextureGenerator.TexturefromHeightMap(map, mapWidth, mapHeight);

      //console.log(colorMap)

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