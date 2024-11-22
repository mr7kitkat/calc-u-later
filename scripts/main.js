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

  add(currentItem) {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const trigonomatory = ["sin(", "cos(", "tan(", "log("];
    const mathOperators = ["/", "+", "-", "×"];
    const restSymbols = ["1/", "π", "e", "√", "(", ")", "^", "%", "."];
    const validSymbols = [...numbers, ...trigonomatory, ...mathOperators, ...restSymbols,];

    // if currentItem is allowed valid calculator symbol
    if (validSymbols.includes(currentItem)) {


      // if expression has nothing in it
      if (this.length <= 0) {

        if ([...numbers, ...trigonomatory, "1/", "π", "e", "√", "("].includes(currentItem)) {
          if (currentItem == "1/") {
            this.exp.push("1");
            this.exp.push("/");
          } else {
            this.exp.push(currentItem);
          }
        }
      }




      // if expression has more than 1 item
      else {

        // getting last item
        const { lastItem } = this;

        // if lastItem is a number or dot
        if ([...numbers
          , "."].includes(lastItem)) {
          if (currentItem == "1/") {
            this.exp.push("×");
            this.exp.push("1");
            this.exp.push("/");
          }
          else if ([...trigonomatory, "π", "e", "√", "("].includes(currentItem)) {
            this.exp.push("×");
            this.exp.push(currentItem);
          }
          else if ([...numbers, "1/", ".", ...mathOperators, "%", "^"].includes(lastItem)) {
            if (!(currentItem == "." && lastItem == ".")) {
              this.exp.push(currentItem);
            }
          }
        }
        // if last items are operator
        else if (mathOperators.includes(lastItem)) {
          if (currentItem == "1/") {
            this.exp.push("(");
            this.exp.push("1");
            this.exp.push("/");
          }
          else if (mathOperators.includes(lastItem)) {
            this.remove();
            this.exp.push(currentItem);
          }
          else if ([...numbers, ...trigonomatory, "π", "e", "√", "("].includes(currentItem)) {
            this.exp.push(currentItem);
          }
        }

        // if last items is (
        else if (lastItem == "(") {
          if ([...numbers, "1/x", ...trigonomatory, "π", "e", "√", "(", "+", "-"].includes(currentItem)) {
            if (currentItem == "1/") {
              this.exp.push("1");
              this.exp.push("/");
            }
            else {
              this.exp.push(currentItem);
            }
          }
        }
        // if last items are pi, exponent and )
        else if (["π", "e", ")"].includes(lastItem)) {
          if ([...numbers, "1/", ...trigonomatory, "π", "e", "√", "("].includes(currentItem)) {
            this.exp.push("×");
            if (currentItem == "1/") {
              this.exp.push("(");
              this.exp.push("1");
              this.exp.push("/");
            } else {
              this.exp.push(currentItem);
            }
          }
          else if ([(")", "/", "×", "+", "-", "^", "%")].includes(currentItem)) {
            this.exp.push(currentItem);
          }
        }
        // if last item is sqrt
        else if (["^", "√"].includes(lastItem)) {
          if ([...numbers, "1/", ...trigonomatory, "π", "e", "√", "+", "-"].includes(currentItem)) {
            this.exp.push("(");
            if (currentItem == "1/") {
              this.exp.push("1");
              this.exp.push("/");
            }
            else {
              this.exp.push(currentItem);
            }
          }
          else if (currentItem == "(") {
            this.exp.push("(");
          }
        }
        // /[\%]/gi;
        // /[0-9\1/\sin(\cos(\tan(\log(\π\√\e\(\)\/\×\+\-\^\%\.]/gi
        else if (lastItem == "%") {
          if ([...numbers, "1/", ...trigonomatory, "π", "e", "√", "(",].includes(currentItem)) {
            this.exp.push("×");
            if (currentItem == "1/") {
              this.exp.push("(");
              this.exp.push("1");
              this.exp.push("/");
            }
            else {
              this.exp.push(currentItem);
            }
          } else if ([")", "/", "+", "-", "×"].includes(currentItem)) {
            this.exp.push(currentItem);
          }
        }
        // end of the else block
      }
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
  renderExpression();
});

// application specific function
function renderExpression() {
  expressionScreen.innerText = calc.exp.join("");
}
