var inputFile = require("../Common/InputFile.ts");

class Person {

    private mQuestions: Array<string>;

    constructor(aInput: string){
        this.mQuestions = new Array<string>();
        
        for(let i = 0; i < aInput.length; i++)
            this.mQuestions.push(aInput[i]);
    }

    getQuestions() {
        return this.mQuestions;
    }
}

class Group {
    private mGroup: Array<Person>;

    constructor(aInput: string) {
        this.mGroup = new Array<Person>();

        aInput.split(/ /).forEach(group => {
            this.mGroup.push(new Person(group));
        });
    }

    getYesQuestions() {
        let set = new Set<string>();
        this.mGroup.forEach(person => {
            person.getQuestions().forEach(question => {
                set.add(question);
            });
        });
        return set.size;
    }

    getCommonYesQuestions() {
        let map = new Map<string, number>();
        this.mGroup.forEach(person => {
            person.getQuestions().forEach(question => {
                let found = map.get(question);
                if(found)
                    map.set(question, found + 1);
                else
                    map.set(question, 1);
            });
        });
        let count = 0;
        map.forEach(elem => {
            count += elem === this.mGroup.length ? 1 : 0;
        });
        return count;
    }
}

class GroupManager {

    private mGroups: Array<Group>;

    constructor(aLines: Array<string>) {
        this.mGroups = new Array<Group>();

        let groupInput = "";
        aLines.forEach(line => {
            
            if(line.length > 0) {
                if(groupInput.length > 0)
                    groupInput += " ";
                groupInput += line;
            }
            else if(groupInput.length > 0) {
                this.mGroups.push(new Group(groupInput));
                groupInput = "";
            }
        });
    }

    countYesQuestions() {
        let count = 0;
        this.mGroups.forEach(group => {count += group.getYesQuestions()});
        return count;
    }

    countCommonYesQuestions() {
        let count = 0;
        this.mGroups.forEach(group => {count += group.getCommonYesQuestions()});
        return count;
    }
}

var input = new inputFile("./day6/input.txt");
var input2 = new inputFile("./day6/input2.txt");

var peaple = new GroupManager(input.getAsLines());
console.log(peaple.countYesQuestions());
console.log(peaple.countCommonYesQuestions());