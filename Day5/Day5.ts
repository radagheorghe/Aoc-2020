var inputFile = require("../Common/InputFile.ts");

class Airplane {

    private mBoardingSeats: Array<number>;

    constructor(aLines: Array<string>){
        this.mBoardingSeats = new Array<number>();

        aLines.forEach(line => {
            this.decodeSeatId(line);
        });
    }

    private decodeSeatId(aInput: string) {
        let rowMin = 0;
        let rowMax = 127;
        let colMin = 0;
        let colMax = 7;
        for(let letter of aInput) {
            switch(letter) {
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

    public getFreeSeatFirstVerion() {
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
    
    public getFreeSeat() {
        let seats = this.mBoardingSeats.sort((a: number, b: number) => a - b);
        for(let i = 0; i < seats.length; i++)
            if(seats[i + 1] - seats[i] > 1)
                return seats[i] + 1;
    }
}

var input = new inputFile("./day5/input.txt");
var input2 = new inputFile("./day5/input2.txt");

var airPlane = new Airplane(input.getAsLines());
console.log(airPlane.getMaxSeat());
console.log(airPlane.getFreeSeat());