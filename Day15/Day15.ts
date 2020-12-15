
class TwoPair {

  private mFirst: number;
  private mSecond: number;

  constructor(aFirst: number = undefined, aSecond: number= undefined) {
    this.mFirst = aFirst;
    this.mSecond = aSecond;
  }

  public hasTwo(): boolean {
    return this.mFirst && this.mSecond ? true : false;
  }

  public push(aNumber: number) {
    if(this.mSecond) {
      this.mFirst = this.mSecond;
      this.mSecond = aNumber;
    }
    else if(this.mFirst)
      this.mSecond = aNumber;
    else
      this.mFirst = aNumber;
  }

  public first(): number {
    return this.mFirst;
  }

  public second(): number {
    return this.mSecond;
  }
}

class MemoryGame {

  private mFirstSpoken: Array<number>;
  
  constructor(aInput: string) {
    this.mFirstSpoken = aInput.split(',').map(it => Number(it));
  }

  public start(aEnd: number): number {

    let alreadySpoken = new Map<number, TwoPair>();

    let turn = 1;
    this.mFirstSpoken.forEach(it => { alreadySpoken.set(it, new TwoPair(turn++)) });
    
    const updateSpoken = (aSpoken: number) => {
      let found = alreadySpoken.get(aSpoken);

      if(found) 
        found.push(turn);
      else
        alreadySpoken.set(aSpoken, new TwoPair(turn));
    }

    updateSpoken(0);
    let lastSpoken = 0;
    turn ++;
    
    while(turn <= aEnd) {
      
      let previews: TwoPair = alreadySpoken.get(lastSpoken);

      let spoken = 0;
      if(previews && previews.hasTwo())
        spoken = previews.second() - previews.first();

      updateSpoken(spoken);

      lastSpoken = spoken;

      turn ++;
    }

    return lastSpoken;
  }
}

var game = new MemoryGame("18,11,9,0,5,1");
var game1 = new MemoryGame("0,3,6");

let time = new Date().getTime();
console.log(game.start(30000000));
let time1 = new Date().getTime();
let finishTime = (time1 - time) / 1000;
console.log('Pt2 time: ' + finishTime + 'sec');