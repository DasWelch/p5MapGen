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
    let mapDisplay = new MapDisplay();

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

    this.colorMap = new Array(this.mapWidth * this.mapHeight);

    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        let currentHeight = this.noiseMap[y * this.mapWidth + x];
        for (let r = 0; r < regions.length; r++) {

          if (currentHeight <= regions[r].height) {
            this.colorMap[y * this.mapWidth + x] = color(regions[r].color); // need to create region
            break;
          }
        }
      }
    }

    // mapDisplay.CreateTexture(this.noiseMap, this.mapWidth, this.mapHeight);
    mapDisplay.CreateTexture(this.colorMap, this.mapWidth, this.mapHeight);
  }
}

regions = [
  {
    string: "land",
    height: 1,
    color: "#0cc952",
  },
  { string: "water", height: 0.4, color: "#0394fc" },
];
