let pushedNumber = 0;
let workingNumber = 0;
let globalOperator = "";
let hasInitialValue = false;

const buttonPress = (button) => {
  button.addEventListener("click", (event) => {
    if (event.target.id.includes("num") || event.target.id==="decimal") {
      appendNumberToDisplay(event.target.innerHTML);
    } else if (event.target.id==="clear") {
      clearAll();
    } else if (event.target.id==="backspace") {
      backspace();
    } else if (event.target.id==="percentage") {


    } else if (event.target.id==="calculate") {

      workingNumber = document.querySelector("h1").innerHTML;
      document.querySelector("p").innerHTML += ` ${workingNumber} =`;
      document.querySelector("h1").innerHTML = calculate();
      globalOperator = "";

    } else {
      
      selectOperator(event.target.id);

      if (!hasInitialValue) {
        pushedNumber = document.querySelector("h1").innerHTML;
        document.querySelector("p").innerHTML = `${pushedNumber} ${globalOperator}`;
        document.querySelector("h1").innerHTML = "";
        hasInitialValue = true;
      } else {
        workingNumber = document.querySelector("h1").innerHTML;
        pushedNumber = calculate();
        document.querySelector("p").innerHTML = `${pushedNumber} ${globalOperator}`;
        document.querySelector("h1").innerHTML = ""
        hasInitialValue = true;
      }
      console.log(workingNumber);
      console.log(pushedNumber);
    }
  });
};

const appendNumberToDisplay = (numberToAppend) => {
  document.querySelector("h1").innerHTML += numberToAppend;
}

const clearAll = () => {
  document.querySelector("h1").innerHTML = "";
  document.querySelector("p").innerHTML = "";
  pushedNumber = 0;
  workingNumber = 0;
  globalOperator = "";
  hasInitialValue = false;
}

const backspace = () => {
  document.querySelector("h1").innerHTML = document.querySelector("h1").innerHTML.slice(0,-1);
}

selectOperator = (operatorType) => {
  switch(operatorType) {
    case "addition":
      globalOperator = "+";
      break;
    case "subtraction":
      globalOperator = "-";
      break;
    case "multiplication":
      globalOperator = "*";
      break;
    case "division":
      globalOperator = "/";
      break;
  };
}

const calculate = () => {
  let result = 0;
  switch(globalOperator) {
    case "+":
      result = parseFloat(pushedNumber) + parseFloat(workingNumber);
      break;
    case "-":
      result = parseFloat(pushedNumber) - parseFloat(workingNumber);
      break;
    case "*":
      result = parseFloat(pushedNumber) * parseFloat(workingNumber);
      break;
    case "/":
      result = parseFloat(pushedNumber) / parseFloat(workingNumber);
      break;
  }
  console.log(`Result: ${pushedNumber} ${globalOperator} ${workingNumber}`);
  hasInitialValue = false;
  return result;
}

document.querySelectorAll("button").forEach( (button) => buttonPress(button));
