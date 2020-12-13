import { InputFile } from '../Common/InputFile'

class Passport {

    private mByr: String;// (Birth Year)
    private mIyr: String;// (Issue Year)
    private mEyr: String;// (Expiration Year)
    private mHgt: String;// (Height)
    private mHcl: String;// (Hair Color)
    private mEcl: String;// (Eye Color)
    private mPid: String;// (Passport ID)
    private mCid: String;// (Country ID)

    constructor(aInput: String){
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

    private isByrValid() {
        let byr = Number(this.mByr);
        return 1920 <= byr && byr <= 2002;
    }

    private isIYrValid() {
        let iyr = Number(this.mIyr);
        return 2010 <= iyr && iyr <= 2020;
    }

    private isEyrValid() {
        let eyr = Number(this.mEyr);
        return 2020 <= eyr && eyr <= 2030;
    }

    private isHgtValid() {
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

    private isHclValid() {
        return this.mHcl.match(/#([a-f0-9]{6})/);
    }

    private isEclValid() {
        return this.mEcl.match(/amb|blu|brn|gry|grn|hzl|oth/);
    }

    private isPidValid() {
        return this.mPid.match(/^[0-9]{9}$/);
    }

    public hasAllFields() {
        return this.mByr && this.mIyr && this.mEyr && this.mHgt && 
               this.mHcl && this.mEcl && this.mPid; 
    }

    public isValid() {
        return this.isByrValid() &&
               this.isIYrValid() &&
               this.isEyrValid() &&
               this.isHgtValid() &&
               this.isHclValid() &&
               this.isEclValid() &&
               this.isPidValid(); 
    }
}

class PassportManager {

    private mPassports: Array<Passport>;

    constructor(aLines) {
        this.mPassports = new Array<Passport>();

        aLines.forEach(line => {
            this.mPassports.push(new Passport(line));
        });
    }

    public countHasAllFields() {
        let count = 0;
        this.mPassports.forEach(passport => {
            count += passport.hasAllFields() ? 1 : 0;
        });
        return count;
    }

    public countValid() {
        let count = 0;
        this.mPassports.forEach(passport => {
            count += passport.hasAllFields() && passport.isValid() ? 1 : 0;
        });
        return count;
    }
}

var input = new InputFile("./day4/input.txt");
var input2 = new InputFile("./day4/input2.txt");
var input3 = new InputFile("./day4/input3.txt"); // valid
var input4 = new InputFile("./day4/input4.txt"); // invalid

var passports = new PassportManager(input.getAsGroups());
console.log(passports.countHasAllFields());
console.log(passports.countValid());