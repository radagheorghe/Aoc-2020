const FileSystem = require('fs');

class InputFile {
    
  mFilePath;
  
  constructor(aFilePath) {
    this.mFilePath = aFilePath;
  }
  
  getContent() {
    return FileSystem.readFileSync(this.mFilePath, 'utf8');
  }

  getAsArray() {
    let array = [];
    let content = this.getContent();
    content.split(/\r?\n/).forEach(line => {
      array.push(Number(line));
    });
    return array;
  }
}

module.exports = InputFile;
