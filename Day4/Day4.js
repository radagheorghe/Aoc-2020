var inputFile = require("../Common/InputFile.ts");

class Passport {

    mByr;// (Birth Year)
    mIyr;// (Issue Year)
    mEyr;// (Expiration Year)
    mHgt;// (Height)
    mHcl;// (Hair Color)
    mEcl;// (Eye Color)
    mPid;// (Passport ID)
    mCid;// (Country ID)

    constructor(aInput){
        aInput.split(/ /).forEach(passField => {
            let fields = passField.split(/:/);
            switch(fields[0]){
                case "byr":
                    this.mByr = fields[1];
                    break;
                case "iyr":
                    this.mIyr = fields[1];
                    break;
                case "eyr":
                    this.mEyr = fields[1];
                    break;
                case "hgt":
                    this.mHgt = fields[1];
                    break;
                case "hcl":
                    this.mHcl = fields[1];
                    break;
                case "ecl":
                    this.mEcl = fields[1];
                    break;
                case "pid":
                    this.mPid = fields[1];
                    break;
                case "cid":
                    this.mCid = fields[1];
                    break;
            }
        });
    }

    isByrValid() {
        let byr = Number(this.mByr);
        return 1920 <= byr && byr <= 2002;
    }

    isIYrValid() {
        let iyr = Number(this.mIyr);
        return 2010 <= iyr && iyr <= 2020;
    }

    isEyrValid() {
        let eyr = Number(this.mEyr);
        return 2020 <= eyr && eyr <= 2030;
    }

    isHgtValid() {
        let isCm = true;
        let unit = this.mHgt.indexOf("cm");
        if(unit < 0) {
            unit = this.mHgt.indexOf("in");
            isCm = false;
        }
        if(unit > 0) {
            let hgt = Number(this.mHgt.substr(0, unit));
            if(isCm)
                return 150 <= hgt && hgt <= 193;
            else
                return 59 <= hgt && hgt <= 76;
        }
        return false;
    }

    isHclValid() {
        if(this.mHcl[0] === '#') {
            let valid = 0;
            let hcl = this.mHcl.substr(1, this.mHcl.length);
            for (let letter of hcl) {
                valid += (0 <= Number(letter) && Number(letter) <= 9) || "abcdef".indexOf(letter) >= 0;
            };
            return valid === hcl.length;
        }
        return false;
    }

    isEclValid() {
        return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].findIndex(elem => elem === this.mEcl) >= 0;
    }

    isPidValid() {
        let valid = 0;
        for (let letter of this.mPid) {
          valid += 0 <= Number(letter) && Number(letter) <= 9;
        }
        return valid === this.mPid.length && valid === 9;
    }

    isValid() {
        return this.mByr && this.isByrValid() &&
               this.mIyr && this.isIYrValid() &&
               this.mEyr && this.isEyrValid() &&
               this.mHgt && this.isHgtValid() &&
               this.mHcl && this.isHclValid() &&
               this.mEcl && this.isEclValid() &&
               this.mPid && this.isPidValid(); 
    }
}

class PassportManager {

    mPassports = [];

    constructor(aLines) {

        let passportInput = "";
        aLines.forEach(line => {
            
            if(line.length > 0) {
                if(passportInput.length > 0)
                    passportInput += " ";
                passportInput += line;
            }
            else if(passportInput.length > 0) {
                this.mPassports.push(new Passport(passportInput));
                passportInput = "";
            }
        });
    }

    countValid() {
        let count = 0;
        this.mPassports.forEach(passort => {
            count += passort.isValid() ? 1 : 0;
        });
        return count;
    }
}

var input = new inputFile("./day4/input.txt");
var input2 = new inputFile("./day4/input2.txt");
var input3 = new inputFile("./day4/input3.txt"); // valid
var input4 = new inputFile("./day4/input4.txt"); // invalid

var passports = new PassportManager(input.getAsLines());
console.log(passports.countValid());