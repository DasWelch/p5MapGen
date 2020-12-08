class MapGenerator {
    constructor(_MapWidth, _mapHeight, _scale) {
      this.mapWidth = _MapWidth;
      this.mapHeight = _mapHeight;
      this.scale = _scale;
    }
  
    GenerateMap() {
      this.noiseMap = Noise.GenerateNoiseMap(
        this.mapWidth,
        this.mapHeight,
        this.scale
      );
    }
  }