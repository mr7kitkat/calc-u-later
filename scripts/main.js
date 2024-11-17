// DOM SELECTORS
const outputPanel = document.querySelector(".output");
const expressionScreen = outputPanel.querySelector(".expression");
const resultScreen = outputPanel.querySelector(".result");
const btns = document.querySelectorAll(".getvalue");
const deleteBtn = document.querySelector("#deletebtn");

// THE EXPRESSION ARRAY
const EXPRESSION = [];
let tempNumHolder = "";

// for every button input
btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const currentInput = e.target.dataset.value;
    const validationResult = runValidations(EXPRESSION, currentInput);
    if (validationResult) {
      expressionScreen.innerText += validationResult;
    }
  });
});

// delete btn work
deleteBtn.addEventListener("click", function () {
  let currentValue = expressionScreen.innerText;
  expressionScreen.innerText = currentValue.slice(0, currentValue.length - 1);
  console.log(EXPRESSION);
});

// =============== Helper function ===============
// run validation checks
function checkValidation(expressionArray, input) {
  // 1. check if the input is valid input for calculator
  const validSymbols = /[0-9+\-/×\/^√]/;
  if (!validSymbols.test(input)) {
    // if symbol is not a valid calculator symbol then return false
    return false;
  }

  // if expression has items in it then check if last digit is symbol then
  // currentInput must be a number
  const len = expressionArray.length;
  const symbolRegEx = /[+\-/×\/^√]/;
  if (len > 0) {
    const lastItem = expressionArray.slice(-1);
    if (symbolRegEx.test(input) && symbolRegEx.test(lastItem)) {
      return false;
    }
  }
  // if expression has no item in it just check if the first input is number
  // if it is number then ok other wise return false
  else if (symbolRegEx.test(input) && len == 0) {
    return false;
  }
}
