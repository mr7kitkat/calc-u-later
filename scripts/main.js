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

  // render expression to the screen
  renderCalc(nodename) {
    nodename.innerText = this.exp.join("");
  },

  add(currentItem) {
    const validSymbols =
      /[0-9\1/\sin(\cos(\tan(\log(\π\√\e\(\)\/\×\+\-\^\%\.]/gi;

    if (validSymbols.test(currentItem)) {
      // if expression has nothing in it
      if (this.length <= 0) {
        if (currentItem == "1/") {
          this.exp.push("1");
          this.exp.push("/");
        } else if (/[0-9\sin(\cos(\tan(\log(\π\√\e\(]/gi.test(currentItem)) {
          this.exp.push(currentItem);
        }
      }
      // if expression has more than 1 item
      else {
        // Validation object contains validation for different types
        const validations = {
          numberAndDot: {
            valid: /[0-9\)\/\×\+\-\^\%\.]/gi,
            validWithPrefix: /[\1/\sin(\cos(\tan(\log(\π\√\e\(]/gi,
            prefix: "×",
          },
          trigonomatoryAndOperatorsAndBracketsOn: {
            valid: /[0-9\1/\sin(\cos(\tan(\log(\π\√\e\(\+\-]/gi,
            validWithPrefix: /[\.]/gi,
            prefix: "0",
          },
          exponentAndPi: {
            valid: /[\)\/\×\+\-\^\%]/gi,
            validWithPrefix: /[0-9\1/\sin(\cos(\tan(\log(\π\√\e]/gi,
            prefix: "×",
          },
          percentage: {
            valid: /[\/\×\+\-\^]/gi,
            validWithPrefix: /[0-9\1/\sin(\cos(\tan(\log(\π\√\e\(\)]/gi,
            prefix: "×",
          },
        };

        const { lastItem } = this;

        // if lastItem is a number or dot
        if (/[0-9\.]/.test(lastItem)) {
          if (currentItem == "1/") {
            this.exp.push("×");
            this.exp.push("1");
            this.exp.push("/");
          } else if (/[\sin(\cos(\tan(\log(\π\√\e\(]/gi.test(currentItem)) {
            this.exp.push("×");
            this.exp.push(currentItem);
          } else {
            if (
              /\./.test(lastItem) &&
              /[0-9\)\/\×\+\-\^\%]/gi.test(currentItem)
            ) {
              this.exp.push(currentItem);
            }
          }
        }
        // if 

        // end of the else block
      }
    }
  },
};

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const targetbtn = e.target.dataset.value;
    calc.add(targetbtn);
    calc.renderCalc(expressionScreen);
  });
});
