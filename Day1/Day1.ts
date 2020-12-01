var inputFile = require("../Common/InputFile.ts");

var input = new inputFile("./day1/input.txt");

let array = input.getAsArray();

console.log("Part 1:");
array.forEach(element1 => {
  array.forEach(element2 => {
    if(element1 + element2 === 2020) 
      console.log(element1 * element2);
  });
});

console.log("Part 2:");
array.forEach(element1 => {
  array.forEach(element2 => {
    array.forEach(element3 => {
      if(element1 + element2 + element3 === 2020) 
        console.log(element1 * element2 * element3);
    });
  });
});