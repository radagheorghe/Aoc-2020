var inputFile = require("../Common/InputFile.ts");

class Instruction {

  private mCode: string;
  private mOffset: number;

  constructor(aCode: string, aOffset:number) {
    this.mCode = aCode;
    this.mOffset = aOffset;
  }

  setCode(aCode: string) {
    this.mCode = aCode;
  }

  getCode(): string{
    return this.mCode;
  }

  getOffset(): number{
    return this.mOffset;
  }
}

class Computer {

  private mInstructions: Array<Instruction>;
  private mExitCode: number;

  constructor(aInput: Array<string>){
    this.mInstructions = new Array<Instruction>();

    aInput.forEach(line => {
      let code = line.split(/ /);
      this.mInstructions.push(new Instruction(code[0], Number(code[1])));
    });
  }

  private execute(aInstructions: Array<Instruction>):number {
    
    let acc = 0;
    let pointer = 0;
    let breakPoint = new Set<number>();

    this.mExitCode = 0;

    while(true) {
      let inst = aInstructions[pointer];
      
      if(pointer >= aInstructions.length)
        break;

      if(breakPoint.has(pointer)) {
        this.mExitCode = -1;
        break;
      }
      
      breakPoint.add(pointer);
      
      switch(inst.getCode()) {
        case 'acc':
          acc += inst.getOffset();
          pointer ++;
          break;
        case 'jmp':
          pointer += inst.getOffset();
          break;
        case 'nop':
          pointer ++;
          break;
      }
    }
    return acc;
  }

  private getExitCode():number {
    return this.mExitCode;
  }

  executeProg():number {
    return this.execute(this.mInstructions);
  }

  findInstToTerminate():number {
    for(let i = 0; i < this.mInstructions.length; i++) {

      // copy new array
      let instructions = this.mInstructions.map(inst => 
        new Instruction(inst.getCode(), inst.getOffset()));

      switch(instructions[i].getCode()) {
        case 'jmp':
          instructions[i].setCode('nop');
          break;
        case 'nop':
          instructions[i].setCode('jmp');
          break;
        default:
          continue;
      }
      let acc = this.execute(instructions);
      if(this.getExitCode() != -1) {
        return acc;
      }
    }
  }
}

var input = new inputFile("./day8/input.txt");
var input2 = new inputFile("./day8/input2.txt");

var comp = new Computer(input.getAsLines());
console.log(comp.executeProg());
console.log(comp.findInstToTerminate());
