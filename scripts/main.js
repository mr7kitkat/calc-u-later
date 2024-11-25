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


    const { allValidInputs, numberSymbols, scientificSymbols, operatorSymbols, keyValidation } = validationChecks();

    // current length and lastItem
    const { lastItem, length } = this;

    // if current input is valid then processed further
    if (allValidInputs.includes(currentInput)) {
      // if there is nothing in expression then check for valid input and add it.
      if (!length) {
        if ([...numberSymbols, ...scientificSymbols, "+", "-", "π", "e"].includes(currentInput)) {
          this.exp.push(currentInput);
        }
      }

      // if there is something then based on last item lets add the currentInput
      else {
        const { allowedAfterThis, validWithPrefix, prefix } = keyValidation[lastItem];
        // if last item and current item both are + - x / then change remove last item and update it with current
        if (operatorSymbols.includes(currentInput) && operatorSymbols.includes(lastItem)) {
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


  get stringExpression() {
    if (this.length) {
      return this.exp.join("")
    }
    return ""
  },

  get solve() {
    if (this.length) {
      const expression = Array.from(this.exp);

      const replacement = {
        "sin(": "Math.sin(",
        "cos(": "Math.cos(",
        "tan(": "Math.tan(",
        "log(": "Math.log(",
        "√(": "Math.sqrt(",
        "×": "*",
        "π": 3.14,
        "e": 2.72,
        "^": "**"
      }

      expression.forEach((key, index) => {
        if (key in replacement) {
          expression[index] = replacement[key]
        }
      });
      try {
        const result = eval(expression.join(""))
        if (isFinite(result)) {
          return result
        }
        else {
          return "<span style='color:tomato;'>Mathematical Error!</span>"
        }
      }
      catch {
        return "<span style='color:tomato;'>Invalid Inputs!</span>"
      }
    }
    else {
      return ""
    }

  }
};


// DOM Manupluation part for the app
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
  resultScreen.innerHTML = ""
  renderExpression();
});

equalbtn.addEventListener("click", () => {
  resultScreen.innerHTML = calc.solve;
})





// Helper function
// application specific function
function renderExpression() {
  expressionScreen.innerText = calc.stringExpression;
}



// all the validation for calculator mentioned here
function validationChecks() {
  // valid inputs category wise
  const numberSymbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const scientificSymbols = ["sin(", "cos(", "tan(", "log(", "1/(", "√(", "("];
  const operatorSymbols = ["/", "+", "-", "×"];
  const restSymbols = ["π", "e", ")", "^", "%", "."];
  const allValidInputs = [...numberSymbols, ...scientificSymbols, ...operatorSymbols, ...restSymbols,];

  // to reduce complexity of keyValidation object
  // it is a kind of object cache
  const testNumbers = {
    allowedAfterThis: [...numberSymbols, ...operatorSymbols, "^", "%", ".", ")"],
    validWithPrefix: [...scientificSymbols, "π", "e"],
    prefix: "×",
  }

  const testScientificFunc = {
    allowedAfterThis: [...numberSymbols, ...scientificSymbols, "+", "-", "π", "e"],
    validWithPrefix: null,
    prefix: null,
  };

  const testOperators = {
    allowedAfterThis: [...numberSymbols, ...scientificSymbols, "π", "e"],
    validWithPrefix: null,
    prefix: null,
  }

  const testPiAndE = {
    allowedAfterThis: [...operatorSymbols, "%", "^", ")"],
    validWithPrefix: [...numberSymbols, ...scientificSymbols, "π", "e"],
    prefix: "×",
  }

  // single object to track down all the keyValidation
  const keyValidation = {
    "0": testNumbers,
    "1": testNumbers,
    "2": testNumbers,
    "3": testNumbers,
    "4": testNumbers,
    "5": testNumbers,
    "6": testNumbers,
    "7": testNumbers,
    "8": testNumbers,
    "9": testNumbers,
    "sin(": testScientificFunc,
    "cos(": testScientificFunc,
    "tan(": testScientificFunc,
    "log(": testScientificFunc,
    "1/(": testScientificFunc,
    "(": testScientificFunc,
    "√(": testScientificFunc,
    "+": testOperators,
    "-": testOperators,
    "/": testOperators,
    "×": testOperators,
    "π": testPiAndE,
    "e": testPiAndE,
    "^": {
      allowedAfterThis: [...numberSymbols, "(", "π", "e", "1/"],
      validWithPrefix: null,
      prefix: null,
    },
    "%": {
      allowedAfterThis: [...operatorSymbols, "^"],
      validWithPrefix: [...numberSymbols, ...scientificSymbols, "π", "e", "("],
      prefix: "×",
    },
    ".": {
      allowedAfterThis: [...numberSymbols, ...operatorSymbols, "%", "^"],
      validWithPrefix: [...scientificSymbols, "π", "e"],
      prefix: "×",
    },
    ")": {
      allowedAfterThis: [...operatorSymbols, "%", "^", ")"],
      validWithPrefix: [...numberSymbols, ...scientificSymbols, "π", "e"],
      prefix: "×",
    },
  }

  return {
    keyValidation,
    numberSymbols,
    operatorSymbols,
    scientificSymbols,
    allValidInputs
  }

}




