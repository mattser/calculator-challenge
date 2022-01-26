// Global calculator object
const calculator = {
  buttons: document.querySelectorAll("button"),
  workingLine: document.querySelector("p"),
  answerLine: document.querySelector("h1"),
  operator: "",
  workingLineNumber: "",
  answerLineNumber: 0,
  isNegative: false,
  isDarkMode: true
}

// Main Function Which Listens for a click and Sorts operations
// Based on Results
const buttonPress = (button) => {
  button.addEventListener("click", (event) => {
    // Sort Action Code
    if (event.target.id.includes("num") || event.target.id==="decimal") {
      // For Number Toggle or adding decimals. Not cannot add additional decimals
        if (calculator.workingLineNumber.includes(".") && event.target.innerHTML==".") {
          alert("You already have a decimal")
        } else {
          appendValueToWorkingLine(event.target.innerHTML);
          appendValueToWorkingLineNumber(event.target.innerHTML);
        }
    } else if (event.target.id==="light-mode") {
      // Light Mode Toggle
        document.body.classList.toggle("light-mode");
    } else if (event.target.id==="clear") {
      // Clears all variables
        clearAll();
    } else if (event.target.id==="backspace") {
       // Removes the last character in the Working Number
        backspace();
    } else if (event.target.id==="percentage") {
      // Divides the working number by 100
        makeWorkingValuePercentage();
    } else if (event.target.id==="plus-minus") {
        // Toggles Positive or negative number
        if (calculator.isNegative) {
          makeWorkingValuePositive();
        } else {
          calculator.isNegative = true;
          makeWorkingValueNegative();
        }
    } else if (event.target.id==="calculate") {
        // When equal is pressed. Check if there is a running answer value. 
        // If not set answer value as working value. Reset working value.
        // If there is a running value perform calculation with running answer and working value. 
        // Set running answer as the result. Clear working value
        if (!calculator.answerLineNumber) {
          calculator.answerLineNumber = parseFloat(calculator.workingLineNumber);
          calculator.answerLine.innerHTML = `= ${calculator.answerLineNumber}`;
          calculator.workingLineNumber = "";
          calculator.workingLine.innerHTML = calculator.answerLineNumber;
        } else {
          calculator.workingLineNumber = parseFloat(calculator.workingLineNumber);
          performCalculation();
          calculator.workingLineNumber = calculator.answerLineNumber;
          calculator.answerLineNumber = 0;
        }
        calculator.isNegative = false;

    } else {
      // Check if there is an runningAnswerValue.
      // If not set the Answer Value to the working value. 
      // Set operator to be the operator. Reset working value
      // When operator is pressed, check if there is a runningAnswerValue. 
      if (!calculator.answerLineNumber) {
        calculator.answerLineNumber = parseFloat(calculator.workingLineNumber);
        calculator.workingLineNumber = "";
        selectOperator(event.target.id);
        calculator.workingLine.innerHTML = calculator.answerLineNumber;
        appendValueToWorkingLine(` ${event.target.innerHTML} `);
      } else {
        calculator.workingLineNumber = parseFloat(calculator.workingLineNumber);
        performCalculation();
        calculator.workingLine.innerHTML = calculator.answerLineNumber;
        selectOperator(event.target.id);
        appendValueToWorkingLine(` ${event.target.innerHTML} `);
      }
      isNegative = false;
      // If true perform calculation with runningAnswer and working value. 
      // Set running answer as the result. Clear working value. Select new operator.
    }
  });
};

// Appends any value to the working line
const appendValueToWorkingLine = (valueToAppend) => {
  calculator.workingLine.innerHTML += valueToAppend;
}
// Appends numbers and decimals to the working line variable
const appendValueToWorkingLineNumber = (valueToAppend) => {
  calculator.workingLineNumber += valueToAppend;
}
// Clears Screens and Variables
const clearAll = () => {
  calculator.workingLine.innerHTML = "";
  calculator.answerLine.innerHTML = "";
  calculator.operator = "";
  calculator.workingLineNumber = "";
  calculator.answerLineNumber = 0;
  calculator.isNegative = false;
}

// Performs Calculation
const performCalculation = () => {
  let result = 0;
  switch(calculator.operator) {
    case "+":
      result = calculator.answerLineNumber + calculator.workingLineNumber;
      break;
    case "-":
      result = calculator.answerLineNumber - calculator.workingLineNumber;
      break;
    case "*":
      result = calculator.answerLineNumber * calculator.workingLineNumber;
      break;
    case "/":
      result = calculator.answerLineNumber / calculator.workingLineNumber;
      break;
  }
  calculator.answerLineNumber = result;
  calculator.workingLineNumber = "";
  calculator.answerLine.innerHTML = `= ${result}`;
}

// Selects the operator
const selectOperator = (operatorType) => {
  switch(operatorType) {
    case "addition":
      calculator.operator = "+";
      break;
    case "subtraction":
      calculator.operator = "-";
      break;
    case "multiplication":
      calculator.operator = "*";
      break;
    case "division":
      calculator.operator = "/";
      break;
  };
}

const makeWorkingValueNegative = () => {
  let tempArr = temporaryStringSplitter();
  tempArr.unshift("-");
  console.log(tempArr);
  temporaryStringJoiner(tempArr);
}

const makeWorkingValuePositive = () => {
  calculator.isNegative = false;
  let tempArr = temporaryStringSplitter();
  tempArr.shift();
  temporaryStringJoiner(tempArr);
}

const backspace = () => {
  let tempArr = temporaryStringSplitter();
  tempArr.pop();
  temporaryStringJoiner(tempArr);
}

const makeWorkingValuePercentage = () => {
  calculator.workingLineNumber = (calculator.workingLineNumber/100);
  appendValueToWorkingLine("%");
}

const temporaryStringSplitter = () => {
  let temp = calculator.workingLine.innerHTML.split("").slice(0,(-1)*(1+calculator.workingLineNumber.length));
  calculator.workingLine.innerHTML = temp.join("");
  temp = calculator.workingLineNumber.split("");
  return temp;
}

const temporaryStringJoiner = (inputArray) => {
  calculator.workingLineNumber = inputArray.join("");
  appendValueToWorkingLine(calculator.workingLineNumber);
}

calculator.buttons.forEach( (button) => buttonPress(button));