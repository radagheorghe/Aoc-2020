
import { readFileSync } from 'fs'

export class InputFile {
    
  private mFilePath: string;
  
  constructor(aFilePath: string) {
    this.mFilePath = aFilePath;
  }
  
  getContent() {
    return readFileSync(this.mFilePath, 'utf8');
  }

  getAsLines():Array<string> {
    return this.getContent().split(/\r\n|\r|\n/).filter(line => line.length > 0);
  }

  getAsArray():Array<number> {
    return this.getAsLines().map(line => Number(line));
  }

  getAsGroups():Array<string> {
    let lineGroups = new Array<string>();

    let groupInput = "";
    this.getAsLines().forEach(line => {
 
      if(line.length > 0) {
          if(groupInput.length > 0)
              groupInput += " ";
          groupInput += line;
      }
      else if(groupInput.length > 0) {
          lineGroups.push(groupInput);
          groupInput = "";
      }
    });
    return lineGroups;
  }
}

