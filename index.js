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
  let wsize = 400;
  let hsize = 400;

  createCanvas(wsize, hsize);

  background(255);
  let mapGen = new MapGenerator(wsize, hsize, 100); // higher the scale the greateer the zoom in?
  let mapD = new MapDisplay();

  mapGen.GenerateMap();


  mapD.DrawNoiseMap(mapGen.noiseMap);
}