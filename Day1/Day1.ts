var inputFile = require("../Common/InputFile.ts");

var input = new inputFile("./day1/input.txt");

let array = input.getAsArray();

function iterator(aArray: Array<number>, aFound: boolean, callback: (param: number) => void) {
  for(let i = 0; i < aArray.length; i++) {
    if(aArray[i] != 0)
      callback(aArray[i]);
    if(aFound)
      return;
  }
};

console.log("Part 1:");
let found = false;
iterator(array, found, (elem1)=> {
  iterator(array, found, (elem2) => {
    if(elem1 + elem2 === 2020) {
      console.log(elem1 * elem2);
      found = true;
    }
  })
});

console.log("Part 2:");
found = false;
iterator(array, found, (elem1)=> {
  iterator(array, found, (elem2) => {
    iterator(array, found, (elem3) => {
      if(elem1 + elem2 + elem3 === 2020) {
        console.log(elem1 * elem2 * elem3);
        found = true;
      }
    })
  })
});