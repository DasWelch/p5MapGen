class MapGenerator {
  constructor(
    _MapWidth,
    _mapHeight,
    _seed,
    _scale,
    _octaves,
    _persistance,
    _lacunarity,
    _offset
  ) {
    this.mapWidth = _MapWidth;
    this.mapHeight = _mapHeight;
    this.seed = _seed;
    this.scale = _scale;
    this.octaves = _octaves;
    this.persistance = _persistance;
    this.lacunarity = _lacunarity;
    this.offset = _offset;
  }

  GenerateMap() {
    let mapD = new MapDisplay();

    this.noiseMap = Noise.GenerateNoiseMap(
      this.mapWidth,
      this.mapHeight,
      this.seed,
      this.scale,
      this.octaves,
      this.persistance,
      this.lacunarity,
      this.offset
    );

    this.colorMap = new Array(this.mapWidth*this.mapHeight);

    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        let currentHeight = this.noiseMap[y][x];
        for (let r = 0; r < regions.length; r++) {
          if (currentHeight <= [r].height) {
            colorMap[y * this.mapWidth + x] = regions[i].color; // need to create region
            break;
          }
        }
      }
    }

    mapD.DrawTexture(this.noiseMap);

    return this.noiseMap
  }

}
