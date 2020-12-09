var inputFile = require("../Common/InputFile.ts");

class XMAS {

  private mInput: Array<number>;
  private mPreambleSize: number;

  constructor(aInput: Array<number>, aPreambleSize: number) {
    this.mInput = aInput;
    this.mPreambleSize = aPreambleSize;
  }

  getFirstNotSum():number {
    for(let i = this.mPreambleSize; i < this.mInput.length; i++) {
      if(!this.isPreviousSum(i)) {
        return this.mInput[i];
      }
    }
  }

  isPreviousSum(aIdx: number):boolean {
    for(let i = aIdx - this.mPreambleSize; i < aIdx; i++)
      for(let j = i + 1; j < aIdx; j++)
        if(this.mInput[i] + this.mInput[j] === this.mInput[aIdx])
          return true;

    return false;
  }

  getContiguousSum(aStart: number, aSize: number):{sum: number, set: Array<number>} {
    let ret = {sum: 0, set: new Array<number>()};

    for(let j = aStart; j < aStart + aSize && j < this.mInput.length; j++) {
      ret.sum += this.mInput[j];
      ret.set.push(this.mInput[j]);
    }
  
    return ret;
  }

  getContiguousSet(aSumToFind: number):number {
    let setSize = 2;
    while(true) {
      for(let i = 0; i < this.mInput.length; i++) {
        let ret = this.getContiguousSum(i, setSize); 
        if(ret.sum === aSumToFind) {
          return Math.min(...ret.set) + Math.max(...ret.set);
        }
      }
      setSize ++;
    }
  }
}

var input = new inputFile("./day9/input.txt");
var input2 = new inputFile("./day9/input2.txt");

var xmas = new XMAS(input.getAsArray(), 25);
var xmas2 = new XMAS(input2.getAsArray(), 5);

var sumToFind = xmas.getFirstNotSum();
console.log(sumToFind);
console.log(xmas.getContiguousSet(sumToFind));