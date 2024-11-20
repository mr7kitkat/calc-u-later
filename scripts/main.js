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

  // add items to the array
  add: function (item) {
    // gate of validaṁtions
    console.log("CLICKED - ", item);
    const validationCheck = /[0-9\+\-\×\%\/\(\)\^\.\√\π\s\e\sin\cos\tan\log]/gi;

    if (validationCheck.test(item)) {
      const typeValidation = {
        // its for number 0 to 9
        number: {
          prevChecks: /[0-9\.\+\-\×\/\√\^\(]/gi,
          afterChecks: /[0-9\.\+\-\×\/\%\^\)]/gi,
          withDefaultPrefix: /[\√\π\(\e\sin\cos\tan\log]/gi,
          defaultPrefix: "×",
        },
        // it is for the basic math basicOperator
        // +-×/
        basicOperator: {
          prevChecks: /[0-9\.\π\%\)\e\sin\cos\tan\log]/gi,
          afterChecks: /[0-9\√\π\(\e\sin\cos\tan\log]/gi,
          withDefaultPrefix: null,
          defaultPrefix: null,
        },
        //validations for percentage %
        percentage: {
          prevChecks: /[0-9\π\e]/gi,
          afterChecks: /[\+\-\×\/\^]/gi,
          withDefaultPrefix: /[0-9\√\π\(\e\sin\cos\tan\log]/gi,
          defaultPrefix: "×",
        },
        // sqrt
        sqrt: {
          prevChecks: /[\+\-\×\/\√\^\(]/gi,
          afterChecks: /[0-9\√\π\(\e\sin\cos\tan\log]/gi,
          withDefaultPrefix: null,
          defaultPrefix: null,
        },
        // square
        square: {
          prevChecks: /[0-9\.\π\%\)\e]/gi,
          afterChecks: /[0-9\-\√\π\(\e\sin\cos\tan\log]/gi,
          withDefaultPrefix: null,
          defaultPrefix: null,
        },
        // scientific function
        scientificFunctions: {
          prevChecks: /[\+\-\×\/\√\^\(]/gi,
          afterChecks: /[\(]/gi,
          withDefaultPrefix: /[0-9\√\π\(\e\sin\cos\tan\log]/gi,
          defaultPrefix: "(",
        },
        dot: {
          prevChecks: /[0-9]/gi,
          afterChecks: /[0-9\+\-\×\/\^\)]/gi,
          withDefaultPrefix: /[\√\π\(\e\sin\cos\tan\log]/gi,
          defaultPrefix: "×",
        },
        pi: {
          prevChecks: /[\+\-\×\/\^\√\(]/gi,
          afterChecks: /[\+\-\×\/\^\%\)]/gi,
          withDefaultPrefix: /[0-9\√\π\(\e\sin\cos\tan\log]/gi,
          defaultPrefix: "×",
        },
      };

      if (this.length <= 0) {
        // if there is nothing in expression then check for number and scientific inputs
        if (/[0-9\√\π\(\e\sin\cos\tan\log]/gi.test(item)) {
          let itemToPush = item;
          if (/[\sin\cos\tan\log]/gi.test(item)) {
            itemToPush += "(";
          }
          this.exp.push(itemToPush);
        }
      }
      // if there are more then one item in expression
      // check for validations depending on type
      else {
        // this function takes object of previous item and current input
        const validateAndMakeEntry = (objectOfLastItem, input) => {
          const { prevChecks, afterChecks, withDefaultPrefix, defaultPrefix } =
            objectOfLastItem;

          if (afterChecks.test(input)) {
            if (/[\sin\cos\tan\log]/gi.test(input)) {
              return input + "(";
            }
            return input;
          } else {
            if (withDefaultPrefix) {
              if (withDefaultPrefix.test(input)) {
                let theItemToPush = input;
                if (/[\sin\cos\tan\log]/gi.test(input)) {
                  theItemToPush += "(";
                }
                return defaultPrefix + theItemToPush;
              }
            }
          }

          return false;
        };

        const lastInput = this.lastItem;
        const {
          number,
          basicOperator,
          dot,
          scientificFunctions,
          sqrt,
          square,
          percentage,
          pi,
        } = typeValidation;

        let entry = "";
        if (/[0-9]/gi.test(lastInput)) {
          entry = validateAndMakeEntry(number, item);
        } else if (/[\.]/gi.test(lastInput)) {
          entry = validateAndMakeEntry(dot, item);
        } else if (/[\+\-\×\/]/gi.test(lastInput)) {
          entry = validateAndMakeEntry(basicOperator, item);
        } else if (/[\%]/gi.test(lastInput)) {
          entry = validateAndMakeEntry(percentage, item);
        } else if (/[\^]/gi.test(lastInput)) {
          entry = validateAndMakeEntry(square, item);
        } else if (/[\√]/gi.test(lastInput)) {
          entry = validateAndMakeEntry(sqrt, item);
        } else if (/[\e\sin\cos\tan\log]/gi.test(lastInput)) {
          entry = validateAndMakeEntry(
            scientificFunctions,
            item,
            this.exp,
            "scientificFunctions"
          );
        } else if (/[\π]/gi.test(lastInput)) {
          entry = validateAndMakeEntry(pi, item);
        }

        if (entry) {
          this.exp.push(entry);
        }
      }
    }
  },
  // remove items from the array
  get remove() {
    this.exp.pop();
  },

  // render expression to the screen
  renderCalc(nodename) {
    nodename.innerText = this.exp.join("");
  },
};

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const targetbtn = e.target.dataset.value;
    calc.add(targetbtn);
    calc.renderCalc(expressionScreen);
  });
});
