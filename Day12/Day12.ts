
import { InputFile } from '../Common/InputFile'

type Coordinate = {
  mDirection: string;
  mPosX: number;
  mPosY: number;
}

class Ship {

  private mShipPos: Coordinate;
  private mWaypoint: Coordinate;

  constructor(aInput: Array<string>){

    this.mShipPos = {mDirection: 'E', mPosX: 0, mPosY: 0};
    this.mWaypoint = {mDirection: '', mPosX: 10, mPosY: 1};

    aInput.forEach(line => {
      let dir = line[0];
      let units = Number(line.slice(1, line.length));
      switch(dir) {
        case 'N':
        case 'S':
        case 'E':
        case 'W':
          this.move(this.mWaypoint, {mDirection: '', mPosX: 1, mPosY: 1}, dir, units);
          break;
        case 'L':
        case 'R':
          this.rotateWaypoint(dir, units);
          break;
        case 'F':
          this.move(this.mShipPos, this.mWaypoint, '', units);
          break;
      }
    })
  }

  private rotateWaypoint(aDir: string, aDegrees: number) {
    let turn = aDegrees / 90;

    const rotate90 = (x: number, y: number):{x: number, y: number} => {
      return {x: y, y: -x};
    }
    const rotate_90 = (x: number, y: number):{x: number, y: number} => {
      return {x: -y, y: x};
    }

    let ret = {x: this.mWaypoint.mPosX, y: this.mWaypoint.mPosY};
    for(let i = 0; i < turn; i++)
      aDir == 'R' ? ret = rotate90(ret.x, ret.y) :
                    ret = rotate_90(ret.x, ret.y);
    this.mWaypoint.mPosX = ret.x;
    this.mWaypoint.mPosY = ret.y;
  }

  private changeDirection(aDir: string, aDegrees: number) {
    let dirs = ['W', 'N', 'E', 'S'];
    let turn = aDegrees / 90;

    let dir = dirs.findIndex(it => it == this.mShipPos.mDirection);

    const keepInBounds = (aNr, aBounds) => {
      return (aNr % aBounds + aBounds) % aBounds;
    }

    let newDir = keepInBounds(aDir == 'L' ? dir - turn : dir + turn, 4);
    this.mShipPos.mDirection = dirs[newDir];
  }

  private move(aToMove: Coordinate, aRelativeTo: Coordinate, aDir: string, aUnits: number) {
    switch(aDir) {
      case 'N':
        aToMove.mPosY += aRelativeTo.mPosY * aUnits;
        break;
      case 'S':
        aToMove.mPosY -= aRelativeTo.mPosY * aUnits;
        break;
      case 'E':
        aToMove.mPosX += aRelativeTo.mPosX * aUnits;
        break;
      case 'W':
        aToMove.mPosX -= aRelativeTo.mPosX * aUnits;
        break;
      default: // move both
        aToMove.mPosX += aRelativeTo.mPosX * aUnits;
        aToMove.mPosY += aRelativeTo.mPosY * aUnits;
    }
  }

  public getDistance() {
    return Math.abs(this.mShipPos.mPosX) + Math.abs(this.mShipPos.mPosY);
  }
}

var input = new InputFile("./day12/input.txt");
var input2 = new InputFile("./day12/input2.txt");

let ship = new Ship(input.getAsLines());
console.log(ship.getDistance());