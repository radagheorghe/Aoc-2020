var inputFile = require("../Common/InputFile.ts");

type Policy = {min: number, max: number, letter: string};

class Password {

    private mPolicy: Policy;
    private mPassword: string;

    constructor(aInput: string) {
        this.parse(aInput);
    }

    private parse(aInput: string) {
        
        let policyPass = aInput.split(/:/);
        this.mPassword = policyPass[1].trim();
        let policy = policyPass[0].split(/ /);
        let minMax = policy[0].split(/-/);
        this.mPolicy = {min: Number(minMax[0]), max: Number(minMax[1]), letter: policy[1]};
    }

    public getPassord():string {
        return this.mPassword;
    }

    public getPolicy():Policy {
        return this.mPolicy;
    }
}

class PasswordManager {

    private mPasswords: Array<Password>;

    constructor() {
        this.mPasswords = new Array<Password>();
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
            for (let letter of password.getPassord()) {
                if(letter === password.getPolicy().letter)
                    count++;
            }
            valid += (count >= password.getPolicy().min && count <= password.getPolicy().max) ? 1 : 0;
        });
        return valid;
    }

    getValidPassowrds2() {
        let valid = 0;
        this.mPasswords.forEach(password => {
            
            let passwordText = password.getPassord();
            let passwordPolicy = password.getPolicy();

            let first = passwordText[passwordPolicy.min - 1];
            let second = passwordText[passwordPolicy.max - 1];
            
            let isFirst = first === passwordPolicy.letter;
            let isSecond = second === passwordPolicy.letter;

            let count = 0;
            count += isFirst ? 1 : 0;
            count += isSecond ? 1 : 0;

            valid += (isFirst || isSecond) && (count === 1) ? 1 : 0;
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