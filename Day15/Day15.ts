import { last, preLast } from '../Common/Util'

class MemoryGame {

  private mFirstSpoken: Array<number>;
  
  constructor(aInput: string) {
    this.mFirstSpoken = new Array<number>();
    
    this.mFirstSpoken = aInput.split(',').map(it => Number(it));
  }

  public start(aEnd: number): number {

    let map = new Map<number, Array<number>>();

    let turn = 1;
    this.mFirstSpoken.forEach(it => {
      map.set(it, [turn++]);
    });
    
    let lastSpoken = last(this.mFirstSpoken);

    while(turn <= aEnd) {
      
      let previews: Array<number> = [];

      if(turn > this.mFirstSpoken.length + 1) {
        previews = map.get(lastSpoken);
      }

      let spoken = 0;
      if(previews.length > 1)
        spoken = last(previews) - preLast(previews);

      let found = map.get(spoken);
      if(found)
        found.push(turn);
      else
        map.set(spoken, [turn]);

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