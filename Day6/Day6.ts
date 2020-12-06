var inputFile = require("../Common/InputFile.ts");

class Person {

    private mQuestions: Array<string>;

    constructor(aInput: string){
        this.mQuestions = new Array<string>();
        this.mQuestions = aInput.split('');
    }

    getQuestions() {
        return this.mQuestions;
    }
}

class Group {
    private mGroup: Array<Person>;

    constructor(aInput: string) {
        this.mGroup = new Array<Person>();

        aInput.split(/ /).forEach(questions => {
            this.mGroup.push(new Person(questions));
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

        aLines.forEach(line => {
             this.mGroups.push(new Group(line));
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

var people = new GroupManager(input.getAsGroups());
console.log(people.countYesQuestions());
console.log(people.countCommonYesQuestions());