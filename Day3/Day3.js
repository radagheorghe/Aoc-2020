var inputFile = require("../Common/InputFile.ts");

class Surface {

    mSurface = [];

    constructor() {

    }

    loadMap(aLines) {
        aLines.forEach(line => {
            if(line.length > 0)
              this.mSurface.push(line.split(''));
        });
    }

    countTrees(aX, aY) {
        let x = aX;
        let y = aY;

        let count = 0;
        while(y < this.mSurface.length)
        {
            count += this.mSurface[y][x] === '#';
                        
            let lineSize = this.mSurface[y].length;

            y += aY;
            x += aX;

            if(x >= lineSize)
                x = x - lineSize;
        }
        return count;
    }
}

var input = new inputFile("./day3/input.txt");
var input2 = new inputFile("./day3/input2.txt");

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