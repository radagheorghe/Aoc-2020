import { InputFile } from '../Common/InputFile'

class Cube {

  mX: number;
  mY: number;
  mZ: number;
  mW: number;

  constructor(aX: number, aY: number, aZ: number, aW: number) {
    this.mX = aX, this.mY = aY, this.mZ = aZ, this.mW = aW;
  }

  public test(aX: number, aY: number, aZ: number, aW: number):boolean {
    return this.mX == aX && this.mY == aY && this.mZ == aZ && this.mW == aW;
  }
}

class ConwayCubes {

  private mCubes: Array<Cube>;

  constructor(aInput: Array<string>) {

    this.mCubes = new Array<Cube>();

    let y = 0;
    aInput.forEach(line => {
      let x = 0;
      line.split('').forEach(a => {
        a == '#' ? this.mCubes.push(new Cube(x, y, 0, 0)) : 0;
        x ++;
      });
      y ++;
    })
  }

  private getCubeByPos(aX: number, aY: number, aZ: number, aW: number) {
    for(let cube of this.mCubes)
      if(cube.test(aX, aY, aZ, aW))
        return cube;
    return undefined;
  }

  private getCubeNeighbors(aCube: Cube): Array<Cube> {
    let neighbors = new Array<Cube>();

    for(let w = -1; w <= 1; w ++)
      for(let z = -1; z <= 1; z ++) 
        for(let y = -1; y <= 1; y ++) 
          for(let x = -1; x <= 1; x ++) {
            if(x == 0 && y == 0 && z == 0 && w == 0) 
              continue;

            neighbors.push(new Cube(aCube.mX + x, aCube.mY + y, aCube.mZ + z, aCube.mW + w));
          }

    return neighbors;
  }

  private hasCube(aCubes: Array<Cube>, aCube: Cube): boolean {
    for(let cube of aCubes)
      if(cube.test(aCube.mX, aCube.mY, aCube.mZ, aCube.mW))
        return true;
    return false;
  }

  private isActive(aCube: Cube): boolean {
    return this.hasCube(this.mCubes, aCube);
  }

  private cycle() {
    let toInactive = new Array<Cube>();
    let toActive = new Array<Cube>();

    this.mCubes.forEach(cube => {
      let neighbors = this.getCubeNeighbors(cube);

      let active = neighbors.filter(it => this.isActive(it));
      let inactive = neighbors.filter(it => !this.isActive(it));

      if(!(active.length == 2 || active.length == 3))
        toInactive.push(cube);

      inactive.forEach(it => {
        let neighborsAlt = this.getCubeNeighbors(it);

        let active = neighborsAlt.filter(it => this.isActive(it));
        if(active.length === 3 && !this.hasCube(toActive, it))
          toActive.push(it);
      })
    })

    this.mCubes = this.mCubes.filter(it => !this.hasCube(toInactive, it));
    this.mCubes = this.mCubes.concat(toActive);
  }

  public run(aCycles: number): number {
    for(let i = 0; i < aCycles; i++)
      this.cycle();
    return this.mCubes.length;
  }

  public printCubes() {
    let minX = Math.min(...this.mCubes.map(cube => cube.mX));
    let maxX = Math.max(...this.mCubes.map(cube => cube.mX));
    let minY = Math.min(...this.mCubes.map(cube => cube.mY));
    let maxY = Math.max(...this.mCubes.map(cube => cube.mY));
    let minZ = Math.min(...this.mCubes.map(cube => cube.mZ));
    let maxZ = Math.max(...this.mCubes.map(cube => cube.mZ));
    let minW = Math.min(...this.mCubes.map(cube => cube.mW));
    let maxW = Math.max(...this.mCubes.map(cube => cube.mW));

    for(let w = minW; w <= maxW; w ++) {
      console.log('\nW: ' + w);
      for(let z = minZ; z <= maxZ; z ++) {
        console.log('\nZ: ' + z);
        for(let y = minY; y <= maxY; y ++) {
          let str = "";
          for(let x = minX; x <= maxX; x ++) {
            let cube = this.getCubeByPos(x, y, z, w);
            if(cube)
              str += '#';
            else
              str += '.';
          }
          console.log(str);
        }
      }
    }
  }
}

var input = new InputFile("./day17/input.txt");
var input2 = new InputFile("./day17/input2.txt");

var cubs = new ConwayCubes(input2.getAsLines());
console.log(cubs.run(6));
//cubs.printCubes();