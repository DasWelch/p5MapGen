class MapGenerator {
  constructor(
    _MapWidth,
    _mapHeight,
    _seed,
    _scale,
    _octaves,
    _persistance,
    _lacunarity,
    _offset,
    _displayType
  ) {
    this.mapWidth = _MapWidth;
    this.mapHeight = _mapHeight;
    this.seed = _seed;
    this.scale = _scale;
    this.octaves = _octaves;
    this.persistance = _persistance;
    this.lacunarity = _lacunarity;
    this.offset = _offset;
    this.displayType = _displayType;
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

    this.colorMap = new Array(this.mapWidth * this.mapHeight).fill(color(255));

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

// for now ensure these are ordered from least to greatest
// must have a value at 1
regions = [
  { name: "water", height: 0.4, color: "#0394fc" },
  { name: "land", height: 0.8, color: "#0cc952" },
  { name: "mtn", height: 1.0, color: "#808080" },
];
