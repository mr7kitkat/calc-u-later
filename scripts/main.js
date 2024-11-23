// DOM SELECTORS
const outputPanel = document.querySelector(".output");
const expressionScreen = document.querySelector(".expression");
const resultScreen = document.querySelector(".result");
const btns = document.querySelectorAll(".getvalue");
const deleteBtn = document.querySelector("#clearbtn");
const allclearbtn = document.querySelector("#allclearbtn");
const openingBracket = document.querySelector("#openingBracket");
const closingBracket = document.querySelector("#closingBracket");

// the calculator Object
const calc = {
  exp: [],

  // Get the last item of the exp array
  get lastItem() {
    if (this.length) {
      return this.exp.slice(-1)[0];
    }
  },

  // get the length of the array
  get length() {
    return this.exp.length;
  },

  // remove items from the array
  remove() {
    this.exp.pop();
  },

  add(currentInput) {

    // valid inputs category wise
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

    // single object to track down all the validation
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

    // if current input is valid then processed further
    const { lastItem, length } = this;

    if (validSymbols.includes(currentInput)) {

      if (!length) {
        if ([...numbers, ...trigonomatory, "+", "-", "π", "e"].includes(currentInput)) {
          this.exp.push(currentInput);
        }
      }
      else {
        const { allowedAfterThis, validWithPrefix, prefix } = validation[lastItem];

        if (allowedAfterThis.includes(currentInput)) {
          this.exp.push(currentInput)
        }
        else if (validWithPrefix && prefix) {
          if (validWithPrefix.includes(currentInput)) {
            this.exp.push(prefix)
            this.exp.push(currentInput)
          }
        }
      }

    }


  }
};

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const targetBtnValue = e.target.dataset.value;
    calc.add(targetBtnValue);
    renderExpression();
  });
});

deleteBtn.addEventListener("click", function () {
  calc.remove(expressionScreen);
  renderExpression();
});

allclearbtn.addEventListener("click", function () {
  calc.exp = [];
  renderExpression();
});

// application specific function
function renderExpression() {
  expressionScreen.innerText = calc.exp.join("");
}
