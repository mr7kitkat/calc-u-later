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

    // Get the last item of the exp array
    get lastItem() {
        if (this.length) {
            return this.exp.slice(-1);
        }
    },

    // get the length of the array
    get length() {
        return this.exp.length;
    },

    // add items to the array
    add: function (item) {
        const validationCheck = /\b(?:[0-9.+\-×\/^√π%()]|e|sin|cos|tan|log)\b/;
        if (validationCheck.test(item)) {
            const validations = {
                // its for number 0 to 9
                number: {
                    prevChecks: /\b(?:[0-9.+\-×\/√^(])\b/,
                    afterChecks: /\b(?:[0-9.+\-×\/%^)])\b/,
                    withDefaultPrefix: /\b(?:[√π(]|e|sin|cos|tan|log)\b/,
                    defaultPrefix: "×"
                },
                // it is for the basic math basicOperator
                // +-×/
                basicOperator: {
                    prevChecks: /\b(?:[0-9.π%)]|e|sin|cos|tan|log)\b/,
                    afterChecks: /\b(?:[0-9√π(]|e|sin|cos|tan|log)\b/,
                    withDefaultPrefix,
                    defaultPrefix
                },
                //validations for percentage %
                percentage: {
                    prevChecks: /\b(?:[0-9π]|e)\b/,
                    afterChecks: /[+\-×\/^]/,
                    withDefaultPrefix: /\b(?:[0-9√π(]|e|sin|cos|tan|log)\b/,
                    defaultPrefix: "×"
                },
                // sqrt
                sqrt: {
                    prevChecks: /[+\-×\/√^(]/,
                    afterChecks: /\b(?:[0-9√π(]|e|sin|cos|tan|log)\b/,
                    withDefaultPrefix,
                    defaultPrefix
                },
                // square
                square: {
                    prevChecks: /\b(?:[0-9.π%)]|e)\b/,
                    afterChecks: /\b(?:[0-9\-√π(]|e|sin|cos|tan|log)\b/,
                    withDefaultPrefix,
                    defaultPrefix
                },
                // scientific function
                scientificFunctions: {
                    prevChecks: /[+\-×\/√^(]/,
                    afterChecks: /[(]/,
                    withDefaultPrefix: /\b(?:[0-9√π(]|e|sin|cos|tan|log)\b/,
                    defaultPrefix: "("
                },
                dot: {
                    prevChecks: /[0-9]/,
                    afterChecks: /[0-9+\-×\/^)]/,
                    withDefaultPrefix: /\b(?:[√π(]|e|sin|cos|tan|log)\b/,
                    defaultPrefix: "×"
                }
            };

            if (this.length == 0) {
                if (/\b(?:[0-9√π(]|e|sin|cos|tan|log)\b/.test(item)) {
                    this.exp.push(item);
                    this.renderCalc();
                }
            } else {
                function validationFunc(objectOfLastItem, input) {
                    const {
                        prevChecks,
                        afterChecks,
                        withDefaultPrefix,
                        defaultPrefix
                    } = objectOfLastItem;
                    
                    if (afterChecks.test(input)) {
                      this.exp.push(input)
                    }
                    else if (withDefaultPrefix.test(input)) {
                      const item = defaultPrefix + input;
                      this.exp.push(input)
                    }
                    
                    
                }
            }
        }
    },

    // remove items from the array
    get remove() {
        this.exp.pop();
    },

    // render expression to the screen
    renderCalc: function (nodename) {
        nodename.innerText = this.exp.join("");
        console.log(this.exp);
    }
};
