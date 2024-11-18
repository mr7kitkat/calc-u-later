// DOM SELECTORS
const outputPanel = document.querySelector(".output");
const expressionScreen = outputPanel.querySelector(".expression");
const resultScreen = outputPanel.querySelector(".result");
const btns = document.querySelectorAll(".getvalue");
const clearbtn = document.querySelector("#clearbtn");
const allclearbtn = document.querySelector("#allclearbtn");
const openingBracket = document.querySelector("#openingBracket");
const closingBracket = document.querySelector("#closingBracket");

// THE EXPRESSION ARRAY
let EXPRESSION = [0];

// SETTING INITIAL VALUES
function setInitialValues() {
  EXPRESSION = [0];
  expressionScreen.innerText = 0;
  closingBracket.dataset.balance = 0;
}

// for every button input
btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const currentInput = e.target.dataset.value;
    const validationRes = checkExpressionInput(EXPRESSION, currentInput);
    if (validationRes) {
      renderArray();
    }
  });
});

// openingBracket eventlistner
openingBracket.addEventListener("click", function () {
  closingBracket.dataset.value = ")";
  closingBracket.dataset.balance = +closingBracket.dataset.balance + 1;
});

// closingBracket eventlistner
closingBracket.addEventListener("click", function () {
  if (+closingBracket.dataset.balance > 0) {
    closingBracket.dataset.value = ")";
    closingBracket.dataset.balance = +closingBracket.dataset.balance - 1;
  }

  if (+closingBracket.dataset.balance <= 0) {
    closingBracket.dataset.value = "";
  }
});

// clear btn work (single character)
clearbtn.addEventListener("click", function () {
  EXPRESSION.pop();
  renderArray();
});

// all clear btn work
allclearbtn.addEventListener("click", function () {
  setInitialValues();
});

// run validations
function checkExpressionInput(expAry, currentInput) {
  const currentLength = () => expAry.length;
  // this line is taken from chatgpt
  let validRegEx = /^(?:[0-9.\-+×\/%()^√]|(?:sin|cos|tan|log|e|√|π))+$/i;

  const runTest = (validRegEx, item = currentInput) => validRegEx.test(item);
  // check if currentInput is valid
  if (runTest(validRegEx)) {
    if (currentLength() > 1) {
      const lastItem = () => expAry.slice(-1)[0];

      // if last item is - + x / operator and currentInput is also one of them
      // then change currentInput to the last input
      validRegEx = /[\-+×\/]/;
      if (runTest(validRegEx) && runTest(validRegEx, lastItem())) {
        expAry[expAry.length - 1] = currentInput;
        return true;
      }

      // if last item is a digit then next valid items are
      //   + - * / % ^ . 0 to 9 , )
      // invalid: sin cos tan log 1/x e sqrt (
      validRegEx = /[0-9.\-+×\/%)^]/;
      if (runTest(/[0-9]/, lastItem())) {
        console.log(runTest(validRegEx));

        if (runTest(validRegEx)) {
          expAry.push(currentInput);

          return true;
        } else {
          
          currentInput = `×${currentInput}(`;
          expAry.push(currentInput);
          return true;
        }
      }
    } else {
      // if expression 1st item is 0
      if (expAry[0] == 0) {
        validRegEx = /[0-9(]/;
        if (runTest(validRegEx)) {
          expAry[0] = currentInput;
          return true;
        }
      }
      // if expression 1st item is other then 0
      else {
        validRegEx = /[0-9.\-+×\/%^]/;
        if (runTest(validRegEx)) {
          expAry.push(currentInput);
          return true;
        } else {
          currentInput = `×${currentInput}(`;
          expAry.push(currentInput);
          return true;
        }
      }
    }
  }

  // if it is not a valid input just return false to stop input
  return false;
}

// calculator program
function renderArray(expAry = EXPRESSION) {
  expressionScreen.innerText = expAry.join("");
}
