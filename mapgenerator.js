class MapGenerator {
  constructor(
    _MapWidth,
    _mapHeight,
    _scale,
    _octaves,
    _persistance,
    _lacunarity
  ) {
    this.mapWidth = _MapWidth;
    this.mapHeight = _mapHeight;
    this.scale = _scale;
    this.octaves = _octaves;
    this.persistance = _persistance;
    this.lacunarity = _lacunarity;
  }

  GenerateMap() {
    this.noiseMap = Noise.GenerateNoiseMap(
      this.mapWidth,
      this.mapHeight,
      this.scale,
      this.octaves,
      this.persistance,
      this.lacunarity
    );
  }
}
