// DOM SELECTORS
const outputPanel = document.querySelector(".output");
const expressionScreen = document.querySelector(".expression");
const resultScreen = document.querySelector(".result");
const btns = document.querySelectorAll(".getvalue");
const deleteBtn = document.querySelector("#clearbtn");
const allclearbtn = document.querySelector("#allclearbtn");
const equalbtn = document.querySelector("#equalbtn");


// the calculator Object
const calc = {
  exp: [],

  // a simplet counter for bracket on and off
  bracketCounter: 0,

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
    const item = this.exp.pop();

    if (item.includes("(")) {
      this.bracketCounter--;
    }
    else if (item.includes(")")) {
      this.bracketCounter++
    }

  },

  // add the current item
  add(currentInput) {

    // valid inputs category wise
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const trigonomatory = ["sin(", "cos(", "tan(", "log(", "1/(", "√(", "("];
    const mathOperators = ["/", "+", "-", "×"];
    const restSymbols = ["π", "e", ")", "^", "%", "."];
    const validSymbols = [...numbers, ...trigonomatory, ...mathOperators, ...restSymbols,];

    // to reduce complexity of validation object
    // it is a kind of object cache
    const numberValidation = {
      allowedAfterThis: [...numbers, ...mathOperators, "^", "%", ".", ")"],
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
        allowedAfterThis: [...mathOperators, "%", "^", ")"],
        validWithPrefix: [...numbers, ...trigonomatory, "π", "e"],
        prefix: "×",
      },
    }

    // current length and lastItem
    const { lastItem, length } = this;

    // if current input is valid then processed further
    if (validSymbols.includes(currentInput)) {

      // if there is nothing in expression then check for valid input and add it.
      if (!length) {
        if ([...numbers, ...trigonomatory, "+", "-", "π", "e"].includes(currentInput)) {
          this.exp.push(currentInput);
        }
      }

      // if there is something then based on last item lets add the currentInput
      else {
        const { allowedAfterThis, validWithPrefix, prefix } = validation[lastItem];

        // if last item and current item both are + - x / then change remove last item and update it with current
        if (mathOperators.includes(currentInput) && mathOperators.includes(lastItem)) {
          this.remove();
          this.exp.push(currentInput);
          return
        }

        if (allowedAfterThis.includes(currentInput)) {
          // if 
          if (currentInput.includes(")") && this.bracketCounter > 0) {
            this.bracketCounter--;
            this.exp.push(currentInput)

          }
          else if (!currentInput.includes(")")) {
            this.exp.push(currentInput);
          }
        }
        else if (validWithPrefix && prefix) {
          if (validWithPrefix.includes(currentInput)) {
            this.exp.push(prefix)
            this.exp.push(currentInput)
          }
        }
      }
    }

    // check if last item has '(', if it has then update the bracketCounter
    if (this.length && this.lastItem.includes("(")) {
      this.bracketCounter++;
    }
  },

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
  calc.bracketCounter = 0
  renderExpression();
});

equalbtn.addEventListener("click", () => {
  alert(calc.solve)
})

// application specific function
function renderExpression() {
  expressionScreen.innerText = calc.exp.join("");
}


