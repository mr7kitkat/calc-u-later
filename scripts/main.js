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
  remove(renderingNode) {
    this.exp.pop();
    this.renderCalc(renderingNode);
  },

  // render expression to the screen
  renderCalc(nodename) {
    nodename.innerText = this.exp.join("");
  },

  add(currentItem, renderingNode) {
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
          } else if (/[0-9\+\-\/\×\%\^\.]/gi.test(currentItem)) {
            if (!(currentItem == "." && lastItem == ".")) {
              this.exp.push(currentItem);
            }
          }
        }
        // if last items are operator
        else if (/[\+\-\/\×]/gi.test(lastItem)) {
          if (currentItem == "1/") {
            this.exp.push("(");
            this.exp.push("1");
            this.exp.push("/");
          } else if (/[\+\-\/\×]/gi.test(currentItem)) {
            this.remove();
            this.exp.push(currentItem);
          } else if (/[0-9\sin(\cos(\tan(\log(\π\√\e\(]/gi.test(currentItem)) {
            this.exp.push(currentItem);
          }
        }

        // if last items is (
        else if (/\(/.test(lastItem)) {
          if (/[0-9\sin(\cos(\tan(\log(\π\√\e\(\+\-]/gi.test(currentItem)) {
            if (currentItem == "1/") {
              this.exp.push("1");
              this.exp.push("/");
            } else {
              this.exp.push(currentItem);
            }
          }
        }
        // if last items are pi, exponent and )
        else if (/[\π\e\)]/.test(lastItem)) {
          if (/[0-9\sin(\cos(\tan(\log(\π\√\e\(]/gi.test(currentItem)) {
            this.exp.push("×");
            if (currentItem == "1/") {
              this.exp.push("(");
              this.exp.push("1");
              this.exp.push("/");
            } else {
              this.exp.push(currentItem);
            }
          } else if (/[\)\/\×\+\-\^\%]/gi.test(currentItem)) {
            this.exp.push(currentItem);
          }
        }
        // if last item is sqrt
        else if (/[\√\^]/gi.test(lastItem)) {
          if (/[0-9\sin(\cos(\tan(\log(\π\√\e\+\-]/gi.test(currentItem)) {
            this.exp.push("(");
            if (currentItem == "1/") {
              this.exp.push("1");
              this.exp.push("/");
            } else {
              this.exp.push(currentItem);
            }
          } else if (/[\(]/gi.test(currentItem)) {
            this.exp.push("(");
          }
        }
        // /[\%]/gi;
        // /[0-9\1/\sin(\cos(\tan(\log(\π\√\e\(\)\/\×\+\-\^\%\.]/gi
        else if (/[\%]/gi.test(lastItem)) {
          if (/[0-9\sin(\cos(\tan(\log(\π\√\e\(]/gi.test(currentItem)) {
            this.exp.push("×");
            if (currentItem == "1/") {
              this.exp.push("(");
              this.exp.push("1");
              this.exp.push("/");
            } else {
              this.exp.push(currentItem);
            }
          } else if (/[\)\/\×\+\-]/gi.test(currentItem)) {
            this.exp.push(currentItem);
          }
        }
        // end of the else block
      }
    }

    // after adding the item render expression
    this.renderCalc(renderingNode);
  },
};

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const targetbtn = e.target.dataset.value;
    calc.add(targetbtn, expressionScreen);
  });
});

deleteBtn.addEventListener("click", function () {
  calc.remove(expressionScreen);
});

allclearbtn.addEventListener("click", function () {
  calc.exp = [];
  calc.renderCalc(expressionScreen);
});
