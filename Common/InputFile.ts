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

  getAsLines() {
    let lines = [];
    let content = this.getContent();
    content.split(/\r?\n/).forEach(line => {
      lines.push(line);
    });
    return lines;
  }
}

module.exports = InputFile;
