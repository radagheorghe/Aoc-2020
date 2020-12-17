
import { InputFile } from '../Common/InputFile'

type Fields = {
  mField: string;
  mIntervals: Array< { mMin: number; mMax: number } >;
}

type Tiket = Array<number>;

class TicketTranslation {

  private mTiketFields: Array<Fields>;
  private mYourTiket: Tiket;
  private mNearbyTikets: Array<Tiket>;
  private mValidTikets: Array<Tiket>;

  constructor(aInput: Array<string>) {

    this.mTiketFields = new Array<Fields>();
    this.mNearbyTikets = new Array<Tiket>();

    aInput.forEach(line => {
      let fields = line.split('|');
      switch(fields[0]) {
        case 'your ticket:':
          this.mYourTiket = fields[1].split(/,/).map(it => Number(it));
          break;
        case 'nearby tickets:':
          fields.splice(0,1);
          fields.forEach(it => {
            this.mNearbyTikets.push(it.split(/,/).map(it => Number(it)));
          })
          break;
        default:
          fields.forEach(field => {
            let tokens = field.split(':');
            let intervals = tokens[1].trim().split(' or ').join('-').split('-').map(it => Number(it));
            this.mTiketFields.push({ 
              mField: tokens[0], 
              mIntervals: [ {mMin: intervals[0], mMax: intervals[1]}, {mMin: intervals[2], mMax: intervals[3]} ] 
            })
          });
          break;
      }
    })
  }

  private isValidField(aField: Fields, aId: number): boolean {
    for(let interval of aField.mIntervals)
      if(interval.mMin <= aId && aId <= interval.mMax)
        return true;
    return false;
  }

  private isValidTiket(aId: number): boolean {
    for(let field of this.mTiketFields) {
      if(this.isValidField(field, aId))
        return true;
    }
    return false;
  }

  public validate(): number {

    this.mValidTikets = new Array<Tiket>();
    let invalidIds = new Array<number>();

    this.mNearbyTikets.forEach(tiket => {
      
      let invalid = new Array<number>();
      tiket.forEach(id => { !this.isValidTiket(id) ? invalid.push(id) : 0 });

      if(invalid.length == 0)
        this.mValidTikets.push(tiket);

      invalidIds.push(...invalid);
    })

    if(invalidIds.length == 0)
      return 0;
    return invalidIds.reduce((sum, a) => sum + a);
  }

  public scan() {

    let tiketMap = new Map<string, Array<number>>();
    let tiketSize = this.mTiketFields.length;

    for(let idx = 0; idx < tiketSize; idx++) {
      
      this.mTiketFields.forEach(field => {

        let check = 0;
        this.mValidTikets.forEach(tiket => {
          check += this.isValidField(field, tiket[idx]) ? 1 : 0;
        })
        
        if(check == this.mValidTikets.length) {
          let found = tiketMap.get(field.mField);
          tiketMap.set(field.mField, found ? [...found, idx] : [idx]);
        }
      })
    }

    let tiketOrder = new Array<{ mField: string, mId: number }>();
    // reduce one by one fields that have only one position
    while(tiketMap.size > 0) {
      let found = Array.from(tiketMap.entries()).find(it => it[1].length == 1);
      tiketOrder.push({mField: found[0], mId: found[1][0]});
      tiketMap.forEach((it, key, map) => map.set(key, it.filter(it1 => it1 != found[1][0])));
      tiketMap.delete(found[0]);
    }

    tiketOrder.sort((a, b) => a.mId - b.mId);
    console.log(tiketOrder);

    let mul = 1;
    tiketOrder.forEach(field => {
      if(field.mField.startsWith('departure')) 
        mul *= this.mYourTiket[field.mId];
    });
    return mul;
  }
}

var input = new InputFile("./day16/input.txt");
var input2 = new InputFile("./day16/input2.txt");

var ticket = new TicketTranslation(input.getAsGroups('|'));
console.log(ticket.validate());
console.log(ticket.scan());