// individual wave is the same as octave
// each wave is summed with the others to create noise value
// frequency = lacunarity^n, where n is the number of octive your on minus 1
// Lacunarity controls increase in frequency of octaves, length of each octive x axis

// amplitude = persistance^n, where n is the number of octive your on minus 1
// persistance controls decrease in amplitude of cotaves, the height up and down y axis

// lacunarity directly controls the number of small features
// persistance is like coherance, how much do these small features affect the cohesion of the whole map

const canvasParentRef = document.getElementById("sketch-holder");
w = 500;
h = 500;
let myp5;

let water = new Region("water", 0.4, "#0394fc")
let land = new Region("land", 0.8, "#0cc952")
let mtn = new Region("mtn", 1.0, "#808080")

let regions = [water, land, mtn]

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

function generateNewMap(){
  generateMap(100, 100, myp5, canvasParentRef)
}

