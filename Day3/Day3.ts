import { InputFile } from '../Common/InputFile'

class Surface {

    private mSurface: Array<Array<string>>;
    private mLineSize: number;

    constructor() {
        this.mSurface = new Array<Array<string>>();
    }

    loadMap(aLines: Array<string>) {
        aLines.forEach(line => {
            if(line.length > 0)
              this.mSurface.push(line.split(''));
        });
        this.mLineSize = this.mSurface[0].length;
    }

    countTrees(aX: number, aY: number) {
        let x = aX;
        let y = aY;

        let count = 0;
        while(y < this.mSurface.length)
        {
            count += (this.mSurface[y][x] === '#') ? 1 : 0;
                        
            y += aY;
            x += aX;

            x = x % this.mLineSize;
        }
        return count;
    }
}

var input = new InputFile("./day3/input.txt");
var input2 = new InputFile("./day3/input2.txt");

var surface = new Surface();
surface.loadMap(input.getAsLines());

console.log(surface.countTrees(3, 1));

var slopes = [ 
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
];

let result = 1;
slopes.forEach(slope => {
    result *= surface.countTrees(slope[0], slope[1]);
});

console.log(result);