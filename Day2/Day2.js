var inputFile = require("../Common/InputFile.ts");

class Password {

    mPolicy = {};
    mPassword;

    constructor(aInput) {
        this.parse(aInput);
    }

    parse(aInput) {
        
        let policyPass = aInput.split(/:/);
        this.mPassword = policyPass[1].trim();
        let policy = policyPass[0].split(/ /);
        let minMax = policy[0].split(/-/);
        this.mPolicy = {min: minMax[0], max: minMax[1], letter: policy[1]};
    }
}

class PasswordManager {

    mPasswords = [];

    constructor() {

    }

    parse(aLines) {
    
        aLines.forEach(line => {
            if(line.length > 0)
              this.mPasswords.push(new Password(line));
        });
    }

    getValidPassowrds() {
        let valid = 0;
        this.mPasswords.forEach(password => {
            let count = 0;
            for (let letter of password.mPassword) {
                if(letter === password.mPolicy.letter)
                    count++;
            }
            valid += count >= password.mPolicy.min && count <= password.mPolicy.max;
        });
        return valid;
    }

    getValidPassowrds2() {
        let valid = 0;
        this.mPasswords.forEach(password => {
            
            let first = password.mPassword[password.mPolicy.min - 1];
            let second = password.mPassword[password.mPolicy.max - 1];
            
            let isFirst = first === password.mPolicy.letter;
            let isSecond = second === password.mPolicy.letter;

            let count = 0;
            count += isFirst;
            count += isSecond;

            valid += (isFirst || isSecond) && (count === 1);
        });
        return valid;
    }
}

var input = new inputFile("./day2/input.txt");
var input2 = new inputFile("./day2/input2.txt");

var passwords = new PasswordManager();
passwords.parse(input.getAsLines());

console.log(passwords.getValidPassowrds());
console.log(passwords.getValidPassowrds2());