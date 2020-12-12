var inputFile = require("../Common/InputFile.ts");

type Adapter = {
  mJolts: number;
  mRate: number;
}

class AddapterArray {

  private mRated: number;
  private mAllArangements: number;

  constructor(aInput: Array<number>) {
  
    let ratedAdapters = new Array<Adapter>();
    let compatible = new Array<Adapter>();

    compatible.push({mJolts: 0, mRate: 0});
    let maxAdapter = {mJolts: Math.max(...aInput) + 3, mRate: 3};

    this.mAllArangements = 1;
    let combinations = new Array<Array<number>>();
    
    while(compatible.length > 0) {
      let allCompatible = compatible.map(ad => ad.mJolts);
      console.log(allCompatible);

      // for pt1 always get the minimum rated
      let adapter = compatible.sort((a, b) => b.mRate - a.mRate).pop();
      
      if(allCompatible.length > 1) {
        combinations.push(allCompatible);
      }
      else if(combinations.length != 0) {
        combinations.push(allCompatible);
        this.mAllArangements *= this.getCombinations(combinations);
        combinations.length = 0;
      }
      ratedAdapters.push(adapter);
      compatible = this.getCompatibleAdapters(aInput, adapter.mJolts);
    }
    ratedAdapters.push(maxAdapter);
    
    let rateOne = 0; 
    let rateThree = 0;
    
    ratedAdapters.forEach(it => {
      rateOne += it.mRate == 1 ? 1 : 0;
      rateThree += it.mRate == 3 ? 1 : 0;
    });

    this.mRated = rateOne * rateThree;
  }

  private getCompatibleAdapters(aInput: Array<number>, aJolts:number): Array<Adapter> {
    let compatible = new Array<Adapter>();
    aInput.forEach(adapter => {
      let rate = adapter - aJolts;
      if(1 <= rate && rate <= 3) {
        compatible.push({mJolts: adapter, mRate: rate});
      }
    });
    return compatible;
  }

  private getCombinations(aArray: Array<Array<number>>): number {

    let allUniqueCombi = new Set<string>();

    const callCombination = (aWord: string, aRow: number) => {

      if(aRow >= aArray.length){
        
        let unique = new Set<string>(aWord.trim().split(' '));
        let asNumbers = new Array<number>();
        unique.forEach(nr => asNumbers.push(Number(nr)));
        unique.clear();
        allUniqueCombi.add(asNumbers.sort((a, b) => a - b).toString());
        return;
      }

      for(let i = 0; i < aArray[aRow].length; i++)
        callCombination(aWord + ' ' + aArray[aRow][i], aRow + 1);
    }
      
    callCombination('', 0);

    console.log(allUniqueCombi);
    return allUniqueCombi.size;
  }

  public getChainRates(): number {
    return this.mRated;
  }

  public getAllArangements(): number {
    return this.mAllArangements;
  }
}

var input = new inputFile("./day10/input.txt");
var input2 = new inputFile("./day10/input2.txt");
var input3 = new inputFile("./day10/input3.txt");

var adapter = new AddapterArray(input2.getAsArray());
console.log(adapter.getChainRates());
console.log(adapter.getAllArangements());