// individual wave is the same as octave
// each wave is summed with the others to create noise value
// frequency = lacunarity^n, where n is the number of octive your on minus 1
// Lacunarity controls increase in frequency of octaves, length of each octive x axis

// amplitude = persistance^n, where n is the number of octive your on minus 1
// persistance controls decrease in amplitude of cotaves, the height up and down y axis

// lacunarity directly controls the number of small features
// persistance is like coherance, how much do these small features affect the cohesion of the whole map

//import "noise.js"

function setup() {
  let wsize = 100;
  let hsize = 100;

  createCanvas(wsize, hsize);

  background(255);
  let mapGen = new MapGenerator(wsize, hsize, 10); // higher the scale the greateer the zoom in?
  let mapD = new MapDisplay();

  mapGen.GenerateMap();


  mapD.DrawNoiseMap(mapGen.noiseMap);
}

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

class Cell {
  constructor(startx, starty, w, h, c) {
    this.xpos = startx;
    this.ypos = starty;
    this.w = w;
    this.h = h;
    this.color = c;
  }

  updateColor(c) {
    this.color = c;
  }

  display() {
    fill(this.color);
    noStroke();
    rect(this.xpos, this.ypos, this.w, this.h);
  }
}

class Texture {
  // might add this class after i figure out the mapper here
  constructor(w, h) {
    this.twidth = w;
    this.theight = h;

    this.textureMap = new Array(w * h);
  }

  setPixels(colorMap) {
    for (let y = 0; y < this.theight; y++) {
      for (let x = 0; x < this.twidth; x++) {
        this.textureMap[y * this.twidth + x] = colorMap[y * this.twidth + x]; // using this could scale the texture if wanted
        //console.log(texture[y * this.twidth + x])
      }
    }
  }
}

class MapDisplay {
  DrawNoiseMap(noiseMap) {
    const mapWidth = noiseMap[0].length;
    const mapHeight = noiseMap[1].length;
    this.texture = new Texture(mapWidth, mapHeight);
    let colorMap = new Array(mapWidth * mapHeight);

    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        colorMap[y * mapWidth + x] = lerpColor(
          color(0, 0, 0),
          color(255, 0, 0),
          noiseMap[x][y]
        );
        //console.log()
      }
    }

    this.texture.setPixels(colorMap);

    this.display();
  }

  display() {
    let board = new Array(height * width);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        board[y * width + x] = new Cell(
          x,
          y,
          1,
          1,
          this.texture.textureMap[y * width + x]
        );
        board[y * width + x].display();
      }
    }
  }
}

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
