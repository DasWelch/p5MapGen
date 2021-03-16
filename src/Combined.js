class MapGenerator {
  constructor(
    _p5,
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
    (this.p5 = _p5), (this.mapWidth = _MapWidth);
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
      this.p5,
      this.mapWidth,
      this.mapHeight,
      this.seed,
      this.scale,
      this.octaves,
      this.persistance,
      this.lacunarity,
      this.offset
    );

    this.board = new Board(
      this.p5,
      0,
      0,
      this.mapWidth,
      this.mapHeight,
      this.noiseMap
    );
    this.board.CreateCells(this.noiseMap);
    this.board.display();
  }
}

// for now ensure these are ordered from least to greatest
// must have a value at 1

function inverseLerp(a, b, x) {
  return (x - a) / (b - a);
}

class Noise {
  static GenerateNoiseMap(
    p5,
    mapWidth,
    mapHeight,
    seed,
    scale,
    octaves,
    persistance,
    lacunarity,
    offset
  ) {
    // console.log(p5)
    let preventmirror = p5.createVector(10000 * mapWidth, 10000 * mapHeight);

    let noiseMap = new Array(mapWidth * mapHeight);

    //random seed if seed = -1
    if (seed === -1) {
      p5.noiseSeed(Date.now());
    } else {
      p5.noiseSeed(seed);
    }

    //scale scales the x and y down to non int values. this is because noise is the same at all full interger values
    if (scale <= 0) {
      scale = 0.0001;
    }

    let maxNoiseHeight = Number.MIN_VALUE;
    let minNoiseHeight = Number.MAX_VALUE;

    let halfWidth = mapWidth / 2;
    let halfHeight = mapHeight / 2;

    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        let amplitude = 1;
        let frequency = 1;
        let noiseHeight = 0;

        for (let oct = 0; oct < octaves; oct++) {
          let sampleX =
            ((x - halfWidth) / scale) * frequency + offset.x + preventmirror.x;
          let sampleY =
            ((y - halfHeight) / scale) * frequency + offset.y + preventmirror.y;

          let perlinValue = p5.noise(sampleX, sampleY) * 2 - 1;
          // console.log(perlinValue);

          noiseHeight += perlinValue * amplitude;

          amplitude *= persistance;

          frequency *= lacunarity;

          if (noiseHeight > maxNoiseHeight) {
            maxNoiseHeight = noiseHeight;
          } else if (noiseHeight < minNoiseHeight) {
            minNoiseHeight = noiseHeight;
          }
        }

        noiseMap[y * mapWidth + x] = noiseHeight;
      }
    }
    //normilzation loops
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        noiseMap[y * mapWidth + x] = inverseLerp(
          minNoiseHeight,
          maxNoiseHeight,
          noiseMap[y * mapWidth + x]
        );
      }
    }

    return noiseMap;
  }
}

class Region {
  constructor(name, height, color) {
    this.name = name;
    this.height = height;
    this.color = color;
  }
}

class Board {
  // similar to texture but will create a an array of cells
  // might add this class after i figure out the mapper here
  constructor(p5, x, y, w, h, map) {
    this.p5 = p5;
    this.y = y;
    this.x = x;
    this.boardWidth = w;
    this.boardHeight = h;

    this.cells = new Array(w * h);

    // if (map) {
    //   this.CreateCells(map);
    // }
  }

  CreateCells(map, mapType, scale = 1) {
    if (mapType === 1) {
      this.createNoiseMap(map, scale);
    } else {
      this.createRegionMap(map, scale);
    }
  }
  createNoiseMap(map, scale) {
    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        let mapHeight = map[y * this.boardWidth + x];
        // console.log(mapHeight);

        this.cells[y * this.boardWidth + x] = new NoiseCell(
          this.p5,
          x * scale,
          y * scale,
          scale,
          scale,
          lerpColor(color(0, 0, 0), color(0, 0, 255), mapHeight)
        );
      }
    }
  }

  createRegionMap(map, scale) {
    // this code creates the color map
    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        let currentHeight = map[y * this.boardWidth + x];

        for (let r = 0; r < regions.length; r++) {
          if (currentHeight <= regions[r].height) {
            this.cells[y * this.boardWidth + x] = new RegonalCell(
              this.p5,
              x * scale,
              y * scale,
              scale,
              scale,
              regions[r]
            ); // need to create region
            break;
          }
        }
      }
    }
  }

  display() {
    this.cells.forEach((cell) => {
      cell.display();
    });
  }
}

class RegonalCell {
  constructor(p5, startx, starty, w, h, region) {
    this.p5 = p5;
    this.xpos = startx;
    this.ypos = starty;
    this.w = w;
    this.h = h;
    this.region = region;
  }

  display() {
    // console.log(this.region)
    this.p5.fill(this.region.color);
    this.p5.noStroke();
    this.p5.rect(this.xpos, this.ypos, this.w, this.h);
  }
}

class NoiseCell {
  constructor(p5, startx, starty, w, h, color) {
    this.p5 = p5;
    this.xpos = startx;
    this.ypos = starty;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  display() {
    this.p5.fill(this.color);
    this.p5.noStroke();
    this.p5.rect(this.xpos, this.ypos, this.w, this.h);
  }
}



const canvasParentRef = document.getElementById("sketch-holder");
w = 500;
h = 500;
let myp5;

let water = new Region("water", 0.4, "#0394fc");
let land = new Region("land", 0.8, "#0cc952");
let mtn = new Region("mtn", 1.0, "#808080");

let regions = [water, land, mtn];

let sketch = function (p5) {
  console.log(p5);
  p5.setup = function () {
    makeCanvas(w, h, p5, canvasParentRef);
    generateMap(w, h, p5, canvasParentRef);
  };
};

function makeCanvas(w, h, p5, canvasParentRef) {
  p5.createCanvas(w, h).parent(canvasParentRef);
}

function generateMap(w, h, p5, canvasParentRef) {
  let wsize = p5.width;
  let hsize = p5.height;
  let seed = -1;
  let offset = p5.createVector(0.0, 0.0);
  let scale = 64;
  let octaves = 1;
  let lacunarity = 1;
  let persistance = 1;

  p5.background(255);
  let mapGen = new MapGenerator(
    p5,
    wsize,
    hsize,
    seed,
    scale,
    octaves,
    lacunarity,
    persistance,
    offset
  ); // higher the scale the greateer the zoom in?
  mapGen.GenerateMap();
}

console.log(p5);

// myp5 is just the p5 object that we would pass in or use in our sketch to call things like rect or elipse
//if can be passed in just like that
myp5 = new p5(sketch);

function generateNewMap() {
  generateMap(100, 100, myp5, canvasParentRef);
}