
import { last } from '../Common/Util';
import { InputFile } from '../Common/InputFile'

type BussTime = {
  mBuss: number;
  mOffset: number;
  mTimestamp: number;
}

class ShuttleSearch {

  private mTimestamp: number;
  private mBusses: Array<BussTime>;
  
  constructor(aInput: Array<string>){
    this.mTimestamp = Number(aInput[0]);
    this.mBusses = new Array<BussTime>();

    let offset = 0;
    aInput[1].split(',').forEach(buss => {
      if(buss != 'x') {
        let bussNr = Number(buss);

        this.mBusses.push({
          mBuss: bussNr, 
          mOffset: offset, 
          mTimestamp: Math.floor(this.mTimestamp / bussNr) * bussNr
        });
      }
      offset ++;
    });
  }

  public simulateBusses() {

    this.mBusses.forEach(buss => {
      buss.mTimestamp += buss.mBuss;
    })

    let min = Math.min(...this.mBusses.map(it => it.mTimestamp));
    let firstBuss = this.mBusses.find(it => it.mTimestamp == min);

    return (firstBuss.mTimestamp - this.mTimestamp) * firstBuss.mBuss;
  }

  public simulateBusses2() {
    let rep = new Map<number, number>();

    let t = this.mBusses[0].mTimestamp;
    let step = this.mBusses[0].mBuss;

    let start = 1;
    while(true) {

      let count = start; // how many busses are sincronized
      
      for(let i = start; i < this.mBusses.length; i++) {
        let timeStamp = t + this.mBusses[i].mOffset;
        
        if(timeStamp % this.mBusses[i].mBuss == 0) { // sicronizes at this timestamp
          count ++; // one more buss that is sincronized
          
          if(count - i == 1) { // is consecutive with previews ones
            if(rep.has(this.mBusses[i].mBuss)) { 
              step = t - rep.get(this.mBusses[i].mBuss);
              start = count;
              break;
            }
            else
              rep.set(this.mBusses[i].mBuss, t);
          }
        }
        else break;
      }
      
      //this.printTimeStamp(t);

      if(count == this.mBusses.length)
        return t;

      t += step;
    }
  }

  private printTimeStamp(aTime: number) {
    for(let i = aTime; i < aTime + last(this.mBusses).mOffset + 1; i++) {
      let log = i.toString();
      for(let buss of this.mBusses) {
        if(i % buss.mBuss == 0)
          log += ' D '
        else
          log += ' . '
      }
      console.log(log);
    }
  }
}
var input = new InputFile("./day13/input.txt");
var input2 = new InputFile("./day13/input2.txt");
var input3 = new InputFile("./day13/input3.txt");

let shuttle = new ShuttleSearch(input.getAsLines());
let time = new Date().getTime();
console.log(shuttle.simulateBusses2());
let time1 = new Date().getTime();
let finishTime = (time1 - time) / 1000;
console.log('time: ' + finishTime + 'sec');