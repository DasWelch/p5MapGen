class Noise {
    static GenerateNoiseMap(mapWidth, mapHeight, scale) {
      let noiseMap = new Array(mapWidth);
  
      for (let i = 0; i < mapWidth; i++) {
        noiseMap[i] = new Array(mapHeight);
      }
      //scale scales the x and y down to non int values. this is because noise is the same at all full interger values
      if (scale <= 4) {
        scale = 5;
      }
  
      for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
          let sampleX = x / scale;
          let sampleY = y / scale;
  
          noiseMap[x][y] = noise(sampleX, sampleY);
        }
      }
  
      return noiseMap;
    }
  }