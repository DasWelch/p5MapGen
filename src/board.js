class Board { // similar to texture but will create a an array of cells
    // might add this class after i figure out the mapper here
    constructor(x, y, w, h) {
      this.y= y; 
      this.x = x;
      this.boardwidth = w;
      this.boardheight = h;
  
      this.cells = new Array(w * h);
    }
  
    CreateCells(Map, scale) {
      let cellsx, cellsy
      cellsx, cellsy= map.length/scale;


      for (let y = 0; y < this.theight; y++) {
        for (let x = 0; x < this.twidth; x++) {
          this.cells[y * this.twidth + x] = colorMap[y * this.twidth + x]; // using this could scale the 
        }
      }
    }
  }