class Board {
  // similar to texture but will create a an array of cells
  // might add this class after i figure out the mapper here
  constructor(x, y, w, h, map) {
    this.y = y;
    this.x = x;
    this.boardWidth = w;
    this.boardHeight = h;

    this.cells = new Array(w * h);

    if (map) {
      this.CreateCells(map);
    }
  }

  CreateCells(map, mapType, scale = 1) {
    if (mapType === 1) {
      this.createNoiseMap(map, scale);
    }
    else{
      this.createRegionMap(map,scale);
    }

  }
  createNoiseMap(map, scale) {
    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        let mapHeight = map[y * this.boardWidth + x];
        console.log(mapHeight);

        this.cells[y * this.boardWidth + x] = new NoiseCell(
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

regions = [
  { name: "water", height: 0.4, color: "#0394fc" },
  { name: "land", height: 0.8, color: "#0cc952" },
  { name: "mtn", height: 1.0, color: "#808080" },
];
