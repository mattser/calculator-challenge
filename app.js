const calculator = {
  buttons: document.querySelectorAll("button"),
  workingLine: document.querySelector("p"),
  answerLine: document.querySelector("h1"),
  operator: "",
  workingLineNumbers: [],
  answerLineNumber: 0,
  temporaryNumber: "",
  justPush: false
}

const buttonPress = (button) => {
  button.addEventListener("click", (event) => {

    if (event.target.id.includes("num") || event.target.id==="decimal") {
        // Pressing Number or Decimal will create an output on the working line
        // It will also start adding to a temporary storage
        appendValueToWorkingLine(event.target.innerHTML);
        appendValueToTemporaryNumber(event.target.innerHTML);
    } else if (event.target.id==="clear") {
        // Clears all variables
        clearAll();
    } else if (event.target.id==="backspace") {
        // Removes the last character in Temporary Number
        backspace();
    } else if (event.target.id==="percentage") {

    } else if (event.target.id==="calculate") {
        // Pushes Temporary Number to working Number
        // Takes Both working Numbers and performs the operation on them
        pushTemporaryToWorking();
    } else {
        // Appends temporary number to working number. Clears the temporary Number
        // If working Numbers already have 2 values calculate and reset the screen
        // with new result and operator
        if (calculator.temporaryNumber !=="") {
          pushTemporaryToWorking();
        }
        appendValueToWorkingLine(event.target.innerHTML);
        selectOperator(event.target.id);
    }
  });
};

// Appends any value to the working line
const appendValueToWorkingLine = (valueToAppend) => {
  calculator.workingLine.innerHTML += valueToAppend;
}
// Appends numbers and decimals to the current temporary storage
const appendValueToTemporaryNumber = (valueToAppend) => {
  calculator.temporaryNumber += valueToAppend;
  console.log(calculator.temporaryNumber)
}
// Clears Screens and Variables
const clearAll = () => {
  calculator.workingLine.innerHTML = "";
  calculator.answerLine.innerHTML = "";
  calculator.operator = "";
  calculator.workingLineNumbers = [];
  calculator.answerLineNumber = 0;
  calculator.temporaryNumber = "";
}

// Performs Calculation
const performCalculation = () => {
  let result = 0;
  switch(calculator.operator) {
    case "+":
      result = calculator.workingLineNumbers[0] + calculator.workingLineNumbers[1];
      break;
    case "-":
      result = calculator.workingLineNumbers[0] - calculator.workingLineNumbers[1];
      break;
    case "*":
      result = calculator.workingLineNumbers[0] * calculator.workingLineNumbers[1];
      break;
    case "/":
      result = calculator.workingLineNumbers[0] / calculator.workingLineNumbers[1];
      break;
  }
  console.log(`Result: ${result}`);
  calculator.answerLineNumber = result;
  calculator.workingLineNumbers = [result];
  calculator.answerLine.innerHTML = result;
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
  console.log(calculator.operator)
}

// A function to push the current temporary value up to the working value;
const pushTemporaryToWorking = () => {
  console.log(calculator.temporaryNumber)
  if (calculator.workingLineNumbers.length >= 1) {
    console.log("Pushing To Second and Calculating");
    calculator.workingLineNumbers[1] = parseFloat(calculator.temporaryNumber);
    calculator.temporaryNumber = "";
    performCalculation();
  } else {
    console.log("Pushing to First Slot");
    calculator.workingLineNumbers = [parseFloat(calculator.temporaryNumber)];
    calculator.temporaryNumber = "";
  }
  console.log(calculator.workingLineNumbers)
}

calculator.buttons.forEach( (button) => buttonPress(button));