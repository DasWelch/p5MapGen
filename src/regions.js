const regions = [
    { name: "water", height: 0.4, color: "#0394fc" },
    { name: "land", height: 0.8, color: "#0cc952" },
    { name: "mtn", height: 1.0, color: "#808080" },
  ];

//   const regions = [
//     new region("water", 0.4, "#0394fc"),
//     new region("land", 0.8, "#0cc952"),
//     new region("mtn", 1.0, "#808080"),
//   ];

class region{
    constructor(name, height, color){
        this.name = name
        this.height = height
        this.color = color
    }
}