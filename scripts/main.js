// DOM SELECTORS
const outputPanel = document.querySelector(".output");
const expressionScreen = document.querySelector(".expression");
const resultScreen = document.querySelector(".result");
const btns = document.querySelectorAll(".getvalue");
const clearbtn = document.querySelector("#clearbtn");
const allclearbtn = document.querySelector("#allclearbtn");
const openingBracket = document.querySelector("#openingBracket");
const closingBracket = document.querySelector("#closingBracket");

// the calculator Object
const calc = {
    exp: [],
    get lastItem() {
        if (this.length) {
            return this.exp.slice(-1);
        }
    },
    get length() {
        return this.exp.length;
    },
    add: function (item) {
        const validationCheck = /\b(?:[0-9+\-×\/√π%^]|e|sin|cos|tan|log)\b/;
        if (validationCheck.test(item)) {
            const validations = {
                // its for number 0 to 9
                number: {
                    prevChecks,
                    afterChecks
                },
                // it is for the basic math basicOperator
                // +-×/
                basicOperator: {
                    prevChecks,
                    afterChecks
                },
                //validations for percentage %
                percentage: {
                    prevChecks,
                    afterChecks
                },
                // sqrt
                sqrt: {
                    prevChecks,
                    afterChecks
                },
                // square
                square: {
                    prevChecks,
                    afterChecks
                },
                // scientific function
                scientificFunctions: {
                    prevChecks,
                    afterChecks
                }
            };
            this.exp.push(item);
        }
    },
    get remove() {
        this.exp.pop();
    },
    renderCalc: function (nodename) {
        nodename.innerText = this.exp.join("");
    }
};
