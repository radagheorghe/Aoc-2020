
import { InputFile } from '../Common/InputFile'
import { setBitByPos, hasBitSet, changeBitByPos } from '../Common/Util'

class DockingData {

  private mMem: Map<bigint, bigint>;
  private mMask: string;

  constructor(aInput: Array<string>) {
    this.mMem = new Map<bigint, bigint>();

    let pos = 0;

    aInput.forEach(line => {
      let maskMem = line.split(/ = /);
      if(maskMem[0] == 'mask') {
        this.mMask = maskMem[1];
      }
      else {
        pos = Number(maskMem[0].match(/\d+/g).pop());
        //this.mMem.set(BigInt(pos), this.applyMask(Number(maskMem[1])));
        let addresses = this.applyMask2(pos);
        addresses.forEach(addr => this.mMem.set(addr, BigInt(maskMem[1])));
      }
    })
  }

  private applyMask(aSet: number): bigint {
    let mem = BigInt(0);

    let bit = 0;
    this.mMask.split('').reverse().forEach(it => {
      if(it == 'X' && hasBitSet(BigInt(aSet), bit))
        mem = setBitByPos(mem, bit);
      else if(it == '1' || it == '0')
        mem = changeBitByPos(mem, bit, it == '1' ? 1 : 0);
      bit ++;
    })
    return mem;
  }

  private applyMask2(aSet: number): Array<bigint> {
    let mem = BigInt(0);

    let floating = new Array<number>();
    let addresses = new Array<bigint>();

    let bit = 0;
    this.mMask.split('').reverse().forEach(it => {
      if(it == 'X') 
        floating.push(bit);
      else if(it == '1' || (it == '0' && hasBitSet(BigInt(aSet), bit)))
        mem = setBitByPos(mem, bit);
      bit ++;
    })

    const generateFloating = (aBitArr: Array<number>, aDigits: number, aIndex: number) => {
      if (aIndex == aDigits) {
        let memTmp = mem;
        for(let bit = 0; bit < floating.length; bit++) {
          if(aBitArr[bit])
            memTmp = setBitByPos(memTmp, floating[bit]);
        }
        addresses.push(memTmp);
        return;
      }
  
      for (let bit = 0; bit < 2; bit++) {
        aBitArr[aIndex] = bit;
        generateFloating(aBitArr, aDigits, aIndex + 1);
      }
    }

    var bitArr = new Array(floating.length);
    generateFloating(bitArr, floating.length, 0);

    return addresses;
  }

  public getMemSum() {
    return Array.from(this.mMem.values()).reduce((sum: bigint, a: bigint) => sum + a);
  }
}

var input = new InputFile("./day14/input.txt");
var input2 = new InputFile("./day14/input2.txt");

var dock = new DockingData(input.getAsLines());
console.log(dock.getMemSum());