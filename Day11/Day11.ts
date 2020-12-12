var inputFile = require("../Common/InputFile.ts");

class SeatingSystem { 

  private mSurface: Array<Array<string>>;
  
  constructor(aInput: Array<string>) {
    this.mSurface = new Array<Array<string>>();
    
    aInput.forEach(line => {
      this.mSurface.push(line.split(''));
    })
  }

  public run(): number {

    while(this.round());

    let count = 0;
    this.mSurface.forEach(row => {
      count += row.filter(it => it == '#').length;
    });
    return count;
  }

  private round(): boolean {
    let changeSeats = false;
    let surface = JSON.parse(JSON.stringify(this.mSurface));

    for(let x = 0; x < this.mSurface.length; x++) {
      for(let y = 0; y < this.mSurface[x].length; y++) {
        if(this.changeSeatState(surface, x, y))
          changeSeats = true;
      }
    }
    this.mSurface = JSON.parse(JSON.stringify(surface));
    return changeSeats;
  }

  private getAdjacents(x, y) {
    let result = new Array<string>();
    for (let dx = (x > 0 ? -1 : 0); dx <= (x < this.mSurface.length-1 ? 1 : 0); dx++) {
      for (let dy = (y > 0 ? -1 : 0); dy <= (y < this.mSurface[0].length-1 ? 1 : 0); dy++) {
        if (dx != 0 || dy != 0) {
          result.push(this.mSurface[x + dx][y + dy]);
        }
      }
    }
    return result;
  }
  
  private getVisibleAdjacents(x, y) {
    let result = new Array<string>();

    const isSeat = (y, x): boolean => {
      return this.mSurface[y][x] == 'L' || this.mSurface[y][x] == '#';
    }

    for (let i = x - 1; i >= 0; i--) {
      if(isSeat(y, i)) {
        result.push(this.mSurface[y][i]);
        break;
      }
    }
    for (let i = x + 1; i < this.mSurface[y].length; i++) {
      if(isSeat(y, i)) {
        result.push(this.mSurface[y][i]);
        break;
      }
    }
      
    for (let j = y - 1; j >= 0; j--) {
      if(isSeat(j, x)) {
        result.push(this.mSurface[j][x]);
        break;
      }
    }
    for (let j = y + 1; j < this.mSurface.length; j++) {
      if(isSeat(j, x)) {
        result.push(this.mSurface[j][x]);
        break;
      }
    }

    let i = x + 1;
    let j = y - 1;
    while(i < this.mSurface[y].length && j >= 0) {
      if(isSeat(j, i)) {
        result.push(this.mSurface[j][i]);
        break;
      }
      i ++;
      j --;
    }
    i = x - 1;
    j = y + 1;
    while(i >= 0 && j < this.mSurface.length) {
      if(isSeat(j, i)) {
        result.push(this.mSurface[j][i]);
        break;
      }
      i --;
      j ++;
    }

    i = x - 1;
    j = y - 1;
    while(i >= 0 && j >= 0) {
      if(isSeat(j, i)) {
        result.push(this.mSurface[j][i]);
        break;
      }
      i --;
      j --;
    }
    i = x + 1;
    j = y + 1;
    while(i < this.mSurface[y].length && j < this.mSurface.length) {
      if(isSeat(j, i)) {
        result.push(this.mSurface[j][i]);
        break;
      }
      i ++;
      j ++;
    }

    return result;
  }

  private changeSeatState(surface, x, y) {
    let seat = this.mSurface[x][y];

    if(seat == '.')
      return false;

    let adjacents = this.getVisibleAdjacents(y, x);
    if(seat == 'L' && !adjacents.find(it => it == '#')) {
      surface[x][y] = '#';
      return true;
    }
    else if(seat == '#' && adjacents.filter(it => it == '#').length >= 5) {
      surface[x][y] = 'L';
      return true;
    }
    return false;
  }
}

var input = new inputFile("./day11/input.txt");
var input2 = new inputFile("./day11/input2.txt");

let seats = new SeatingSystem(input.getAsLines());
console.log(seats.run());