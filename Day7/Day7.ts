var inputFile = require("../Common/InputFile.ts");

type BagQunat = {mBag: Bag, mCount: number};

class Bag {
  
  private mColor: string;
  private mBags: Array<BagQunat>;
  
  constructor(aColor: string){
    this.mColor = aColor;   
    this.mBags = new Array<BagQunat>();
  }

  newBag(aColor: string, aCount: number): Bag {
    let bag = new Bag(aColor);
    this.mBags.push({mBag: bag, mCount: aCount});

    return bag;
  }

  addBag(aBag: Bag, aCount: number) {
    this.mBags.push({mBag: aBag, mCount: aCount});
  }

  hasOneOf(aColors: Array<string>):BagQunat {
    return this.mBags.find(bag => aColors.includes(bag.mBag.mColor));
  }

  getColor():string {
    return this.mColor;
  }

  getCost():number {
    let cost = 1;
    
    for(let bag of this.mBags)
      cost += bag.mCount * bag.mBag.getCost();
    
    return cost;
  }
}

class BagManager {

  private mBags: Array<Bag>;
  private mDictionary: Map<string, Bag>;

  constructor(aInput: Array<string>){
    this.mBags = new Array<Bag>();
    this.mDictionary = new Map<string, Bag>();

    aInput.forEach(line => {
      let bagContain = line.split(/bags contain/);
      let color = bagContain[0].trim();
      let bag = this.mDictionary.get(color);

      if(!bag) {
        bag = new Bag(color);
        this.mDictionary.set(color, bag);
      }
      this.mBags.push(bag);

      bagContain[1].trim().split(/,/).forEach(bagStr => {
      
        let bagProps = bagStr.replace(/bags.|bags|bag.|bag/, '').trim().split(/ /);

        if(bagProps[0] != 'no') {
          let count = Number(bagProps[0]);
          let color1 = bagProps.slice(1).join(' ');
          let found = this.mDictionary.get(color1);

          if(found)
            bag.addBag(found, count);
          else
            this.mDictionary.set(color1, bag.newBag(color1, count));
        }
      })
    })
  }

  countShinyGold():number {
    let count = 0;
    let bags = this.mBags;
    let toFind = ['shiny gold'];

    while(true) {
      let found = bags.filter(bag => bag.hasOneOf(toFind));

      if(found.length === 0)
        break;

      count += found.length;
      bags = bags.filter(bag => !found.includes(bag));
      toFind = found.map(bag => {return bag.getColor()});
    }

    return count;
  }

  getShinyGoldCost():number {
      
    let shinyGold = this.mDictionary.get('shiny gold');
    return shinyGold.getCost() - 1;
  }
}

var input = new inputFile("./day7/input.txt");
var input2 = new inputFile("./day7/input2.txt");
var input3 = new inputFile("./day7/input3.txt");

var bags = new BagManager(input.getAsLines());
console.log(bags.countShinyGold());
console.log(bags.getShinyGoldCost());