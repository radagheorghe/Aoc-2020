var inputFile = require("../Common/InputFile.ts");

class Instruction {

  private mCode: string;
  private mOffset: number;

  constructor(aCode:string, aOffset:number) {
    this.mCode = aCode;
    this.mOffset = aOffset;
  }

  setCode(aCode:string) {
    this.mCode = aCode;
  }

  getCode():string {
    return this.mCode;
  }

  getOffset():number {
    return this.mOffset;
  }
}

class Computer {

  private mInstructions: Array<Instruction>;
  
  constructor(aInput: Array<string>) {
    this.mInstructions = new Array<Instruction>();

    aInput.forEach(line => {
      let code = line.split(/ /);
      this.mInstructions.push(new Instruction(code[0], Number(code[1])));
    });
  }

  private execute():{exitCode: number, acc: number} {
    
    let acc = 0;
    let pointer = 0;
    let breakPoint = new Set<number>();

    let exitCode = 0;

    while(true) {
      let inst = this.mInstructions[pointer];
      
      if(pointer >= this.mInstructions.length)
        break;

      if(breakPoint.has(pointer)) {
        exitCode = -1;
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
    return {exitCode: exitCode, acc: acc};
  }

  executeProg():number {
    return this.execute().acc;
  }

  changeJmpOrNop(aInstruction: Instruction) {
    switch(aInstruction.getCode()) {
      case 'jmp':
        aInstruction.setCode('nop');
        return;
      case 'nop':
        aInstruction.setCode('jmp');
        return;
    }
  }

  findInstToTerminate():number {
    for(let inst of this.mInstructions) {

      this.changeJmpOrNop(inst);
      
      let ret = this.execute();
      if(ret.exitCode != -1) {
        return ret.acc;
      }

      // revert changes in program
      this.changeJmpOrNop(inst);
    };
  }
}

var input = new inputFile("./day8/input.txt");
var input2 = new inputFile("./day8/input2.txt");

var comp = new Computer(input.getAsLines());
console.log(comp.executeProg());
console.log(comp.findInstToTerminate());
