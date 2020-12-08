function inverseLerp(a, b, x) {
  return (x - a) / (b - a);
}

class Noise {
  static GenerateNoiseMap(
    mapWidth,
    mapHeight,
    scale,
    octaves,
    persistance,
    lacunarity
  ) {
    let noiseMap = new Array(mapWidth);

    for (let i = 0; i < mapWidth; i++) {
      noiseMap[i] = new Array(mapHeight);
    }
    //scale scales the x and y down to non int values. this is because noise is the same at all full interger values
    if (scale <= 0) {
      scale = 0.0001;
    }

    let maxNoiseHeight = Number.MIN_VALUE;
    let minNoiseHeight = Number.MAX_VALUE;

    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        let amplitude = 1;
        let frequency = 1;
        let noiseHeight = 0;

        for (let oct = 0; oct < octaves; oct++) {
          let sampleX = (x / scale) * frequency;
          let sampleY = (y / scale) * frequency;

          let perlinValue = noise(sampleX, sampleY) * 2 - 1;
          noiseHeight += perlinValue * amplitude;

          amplitude *= persistance;

          frequency *= lacunarity;

          if (noiseHeight > maxNoiseHeight) {
            maxNoiseHeight = noiseHeight;
          } else if (noiseHeight < minNoiseHeight) {
            minNoiseHeight = noiseHeight;
          }
        }

        noiseMap[x][y] = noiseHeight;
      }
    }

    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        noiseMap[x][y] = inverseLerp(
          minNoiseHeight,
          maxNoiseHeight,
          noiseMap[x][y]
        ); // need inverse lerp formula
      }
    }

    return noiseMap;
  }
}
