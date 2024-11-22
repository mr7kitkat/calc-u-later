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

const piande = {
    allowedAfterThis: [...mathOperators, "%", "^"],
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
    "π": piande,
    "e": piande,
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
