const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const trigonomatory = ["sin(", "cos(", "tan(", "log(", "1/(", "√(", "("];
const mathOperators = ["/", "+", "-", "×"];
const restSymbols = ["π", "e", ")", "^", "%", "."];
const validSymbols = [...numbers, ...trigonomatory, ...mathOperators, ...restSymbols,];


const numberValidation = {
    allowedAfterThis: [...numbers, ...mathOperators, "^", "%", "."],
    validWithPrefix: [...trigonomatory, "π", "e"],
    prefix: "×",
}

const scientificFunctionValidation = {
    allowedAfterThis: [...numbers, ...trigonomatory, "+", "-", "π", "e"],
    validWithPrefix: null,
    prefix: null,
};

const operatorValidation = {
    allowedAfterThis: [...numbers, ...trigonomatory, "π", "e"],
    validWithPrefix: null,
    prefix: null,
}

const PIandEValidation = {
    allowedAfterThis: [...mathOperators, "%", "^", ")"],
    validWithPrefix: [...numbers, ...trigonomatory, "π", "e"],
    prefix: "×",
}


const validation = {
    "0": numberValidation,
    "1": numberValidation,
    "2": numberValidation,
    "3": numberValidation,
    "4": numberValidation,
    "5": numberValidation,
    "6": numberValidation,
    "7": numberValidation,
    "8": numberValidation,
    "9": numberValidation,
    "sin(": scientificFunctionValidation,
    "cos(": scientificFunctionValidation,
    "tan(": scientificFunctionValidation,
    "log(": scientificFunctionValidation,
    "1/(": scientificFunctionValidation,
    "(": scientificFunctionValidation,
    "√(": scientificFunctionValidation,
    "+": operatorValidation,
    "-": operatorValidation,
    "/": operatorValidation,
    "×": operatorValidation,
    "π": PIandEValidation,
    "e": PIandEValidation,
    "^": {
        allowedAfterThis: [...numbers, "(", "π", "e", "1/"],
        validWithPrefix: null,
        prefix: null,
    },
    "%": {
        allowedAfterThis: [...mathOperators, "^"],
        validWithPrefix: [...numbers, ...trigonomatory, "π", "e", "("],
        prefix: "×",
    },
    ".": {
        allowedAfterThis: [...numbers, ...mathOperators, "%", "^"],
        validWithPrefix: [...trigonomatory, "π", "e"],
        prefix: "×",
    },
    ")": {
        allowedAfterThis: [...mathOperators, "%", "^"],
        validWithPrefix: [...numbers, ...trigonomatory, "π", "e"],
        prefix: "×",
    },
}




const expression = []

function theValidatorFunction(lastInput, currentInput, expression) {
    const { allowedAfterThis, validWithPrefix, prefix } = validation[lastInput]


    if (allowedAfterThis.includes(currentInput)) {
        expression.push(currentInput)
    }
    else if (validWithPrefix) {

        if (validWithPrefix.includes(currentInput) && prefix) {
            expression.push(prefix)
            expression.push(currentInput)
        }
    }
    else {
        return false
    }

}

while (true) {
    const userInput = prompt("Input: ")

    if (userInput == "~") {
        break
    }

    if (!expression.length) {
        if ([...numbers, ...trigonomatory, "+", "-", "π", "e"].includes(userInput)) {
            expression.push(userInput)
        }
    }
    else {
        const lastInput = expression.slice(-1)[0];

        theValidatorFunction(lastInput, userInput, expression);
    }

    console.log(`After ${userInput} expression is :`);
    console.log(expression)


}