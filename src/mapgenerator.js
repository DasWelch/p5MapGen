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

    this.colorMap = (new Array(this.mapWidth * this.mapHeight)).fill(color(255));

    //console.log(this.noiseMap)

    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        let currentHeight = this.noiseMap[y * this.mapWidth + x];

        for (let r = 0; r < regions.length; r++) {

          if (currentHeight <= regions[r].height) {
            //console.log(r);
            this.colorMap[y * this.mapWidth + x] = color(regions[r].color); // need to create region

            break;
          }
        }
      }
    }

    //console.log(this.colorMap)

    // mapDisplay.CreateTexture(this.noiseMap, this.mapWidth, this.mapHeight);
    mapDisplay.CreateTexture(this.colorMap, this.mapWidth, this.mapHeight);
  }
}

// for now ensure these are ordered from least to greatest
regions = [
  
  { name: "water", height: 0.5, color: "#0394fc" },
  {
    name: "land",
    height: 1,
    color: "#0cc952",
  }
];
