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

const buttonPress = (button) => {
  button.addEventListener("click", (event) => {

    if (event.target.id.includes("num") || event.target.id==="decimal") {
        // Pressing Number or Decimal will create an output on the working line
        // It will also start adding to a temporary storage
        if (calculator.workingLineNumber.includes(".") && event.target.innerHTML==".") {
          alert("You already have a decimal")
        } else {
          appendValueToWorkingLine(event.target.innerHTML);
          appendValueToWorkingLineNumber(event.target.innerHTML);
        }
    } else if (event.target.id==="light-mode") {
        document.body.classList.toggle("light-mode");
    } else if (event.target.id==="clear") {
        // Clears all variables
        clearAll();
    } else if (event.target.id==="backspace") {
        // Removes the last character in Temporary Number
        backspace();
    } else if (event.target.id==="percentage") {
        makeWorkingValuePercentage();
    } else if (event.target.id==="plus-minus") {
        if (calculator.isNegative) {
          calculator.isNegative = false;
          makeWorkingValuePositive();
        } else 
        {
          calculator.isNegative = true;
          makeWorkingValueNegative();
        }
    } else if (event.target.id==="calculate") {
      // When equal is pressed. Check if there is a running answer value. 
      // If not set answer value as working value. Reset working value.
      // If there is a running value perform calculation with running answer and working value. 
      // Set running answer as the result. Clear working value
      if (!calculator.answerLineNumber) {
        console.log("pushing to answerLine");
        calculator.answerLineNumber = parseFloat(calculator.workingLineNumber);
        calculator.answerLine.innerHTML = `= ${calculator.answerLineNumber}`;
        calculator.workingLineNumber = "";
        calculator.workingLine.innerHTML = calculator.answerLineNumber;
      } else {
        console.log("performing Calc and pushing");
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
        console.log("pushing to answerLine");
        calculator.answerLineNumber = parseFloat(calculator.workingLineNumber);
        calculator.workingLineNumber = "";
        selectOperator(event.target.id);
        calculator.workingLine.innerHTML = calculator.answerLineNumber;
        appendValueToWorkingLine(` ${event.target.innerHTML} `);
      } else {
        console.log("performing Calc and pushing");
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
  console.log(calculator.workingLineNumber)
}
// Clears Screens and Variables
const clearAll = () => {
  calculator.workingLine.innerHTML = "";
  calculator.answerLine.innerHTML = "";
  calculator.operator = "";
  calculator.workingLineNumber = "";
  calculator.answerLineNumber = 0;
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
      result = calculator.answerLineNumber / calculator.workingLineNumbers;
      break;
  }
  console.log(`Result: ${result}`);
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
  console.log(calculator.operator);
  console.log(calculator.answerLineNumber);
  console.log(calculator.workingLineNumber);
}

const makeWorkingValueNegative = () => {
  
  let temp = calculator.workingLine.innerHTML.split("").slice(0,(-1)*(calculator.workingLineNumberlength));
  calculator.workingLine.innerHTML = temp.join("");
  let tempArr = calculator.workingLineNumber.split("");
  tempArr.unshift("-");
  console.log(tempArr);
  calculator.workingLineNumber = tempArr.join("");
  appendValueToWorkingLine(calculator.workingLineNumber);
}

const makeWorkingValuePositive = () => {

  let temp = calculator.workingLine.innerHTML.split("").slice(0,(-1)*(calculator.workingLineNumber.length));
  calculator.workingLine.innerHTML = temp.join("");
  let tempArr = calculator.workingLineNumber.split("");
  tempArr.shift();
  console.log(tempArr);
  calculator.workingLineNumber = tempArr.join("");
  appendValueToWorkingLine(calculator.workingLineNumber);
}

const backspace = () => {
  let temp = calculator.workingLine.innerHTML.split("").slice(0,(-1)*(calculator.workingLineNumber.length));
  calculator.workingLine.innerHTML = temp.join("");
  let tempArr = calculator.workingLineNumber.split("");
  tempArr.pop();
  console.log(tempArr);
  calculator.workingLineNumber = tempArr.join("");
  appendValueToWorkingLine(calculator.workingLineNumber);
}

const makeWorkingValuePercentage = () => {
  let temp = calculator.workingLine.innerHTML.split("").slice(0,(-1)*(calculator.workingLineNumber.length));
  calculator.workingLine.innerHTML = temp.join("");
  calculator.workingLineNumber = (calculator.workingLineNumber/100);
  appendValueToWorkingLine(calculator.workingLineNumber);
}

calculator.buttons.forEach( (button) => buttonPress(button));