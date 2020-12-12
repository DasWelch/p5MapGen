class TextureGenerator {
  static TextureFromColorMap(colorMap, mapWidth, mapHeight) {
    let texture = new Texture(mapWidth, mapHeight);
    texture.setpixels(colorMap);
    return texture;
  }

  static TexturefromHeightMap(heightmap, mapWidth, mapHeight) {
    let texture = new Texture(mapWidth, mapHeight);
    let colorMap = new Array(mapWidth * mapHeight);
    colorMap.fill(color(255))

    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        colorMap[y * mapWidth + x] = lerpColor(
          color(0, 0, 0),
          color(0, 0, 255),
          heightmap[x][y]
        );
      }
    }

    texture.setPixels(colorMap);
    return colorMap;
  }
}

