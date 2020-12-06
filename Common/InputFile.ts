const FileSystem = require('fs');

class InputFile {
    
  private mFilePath: String;
  
  constructor(aFilePath: String) {
    this.mFilePath = aFilePath;
  }
  
  getContent() {
    return FileSystem.readFileSync(this.mFilePath, 'utf8');
  }

  getAsArray():Array<number> {
    let array = new Array<number>();
    let content = this.getContent();
    content.split(/\r?\n/).forEach(line => {
      array.push(Number(line));
    });
    return array;
  }

  getAsLines():Array<string> {
    let lines = new Array<string>();
    let content = this.getContent();
    content.split(/\r?\n/).forEach(line => {
      lines.push(line);
    });
    return lines;
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

module.exports = InputFile;
