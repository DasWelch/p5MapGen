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


    this.noiseMap = Noise.GenerateNoiseMap(
      this.mapWidth,
      this.mapHeight,
      this.seed,
      this.scale,
      this.octaves,
      this.persistance,
      this.lacunarity,
      this.offset,
    );


    this.board = new Board(0,0,this.mapWidth, this.mapHeight, this.noiseMap);
    this.board.display();

 
  }
}

// for now ensure these are ordered from least to greatest
// must have a value at 1

