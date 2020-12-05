var inputFile = require("../Common/InputFile.ts");

class Airplane {

    private mBoardingSeats: Array<Number>;

    constructor(aLines: Array<String>){
        this.mBoardingSeats = new Array<Number>();

        aLines.forEach(line => {
            if(line.length > 0)
                this.decodeSeatId(line);
        });
    }

    private decodeSeatId(aInput: String) {
        let rowMin = 0;
        let rowMax = 127;
        let colMin = 0;
        let colMax = 7;
        for(let i = 0; i < aInput.length; i++) {
            switch(aInput[i]) {
                case 'F':
                    rowMax = Math.floor((rowMin + rowMax) / 2);
                    break;
                case 'B':
                    rowMin = Math.ceil((rowMin + rowMax) / 2);
                    break;
                case 'L':
                    colMax = Math.floor((colMin + colMax) / 2);
                    break;
                case 'R':
                    colMin = Math.ceil((colMin + colMax) / 2);
                    break;
            }
        }
        this.mBoardingSeats.push(rowMin * 8 + colMin);
    }

    public getMaxSeat() {
        return Math.max.apply(Math, this.mBoardingSeats);
    }

    public getFreeSeat() {
        let rowMin = 0;
        let rowMax = 127;
        let diff = [];
        do{

            let allSeats = [];
            for(let row = rowMin; row < rowMax; row++) {
                for(let col = 0; col < 7; col++)
                    allSeats.push(row * 8 + col);
            }

            diff = allSeats.filter(seat => !this.mBoardingSeats.includes(seat));
        
            rowMin += 1;
            rowMax -= 1;
        
        }while(diff.length > 1);
        
        return diff[0];
    }
}

var input = new inputFile("./day5/input.txt");
var input2 = new inputFile("./day5/input2.txt");

var airPlane = new Airplane(input.getAsLines());
console.log(airPlane.getMaxSeat());
console.log(airPlane.getFreeSeat());