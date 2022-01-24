let pushedNumber = 0;
let workingNumber = 0;
let globalOperator = "";

const buttonPress = (button) => {
  button.addEventListener("click", (event) => {
    console.log(event.target.id);
    if (event.target.id.includes("num") || event.target.id==="decimal") {
      appendNumberToDisplay(event.target.innerHTML);
    } else if (event.target.id==="clear") {
      clearAll();
    } else if (event.target.id==="backspace") {
      backspace();
    } else if (event.target.id==="percentage") {

    } else if (event.target.id==="calculate") {
      workingNumber = document.querySelector("h1").innerHTML;
      document.querySelector("p").innerHTML += workingNumber;
      document.querySelector("h1").innerHTML = calculate();
      globalOperator = "";
    } else {
      selectOperator(event.target.id);
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
    }

  if (workingNumber==0) {
    pushedNumber = document.querySelector("h1").innerHTML;
    document.querySelector("p").innerHTML = `${pushedNumber} ${globalOperator}`;
    document.querySelector("h1").innerHTML = "";
  } else {
    workingNumber = document.querySelector("h1").innerHTML;
    pushedNumber = calculate();
    document.querySelector("p").innerHTML = push + globalOperator;
  }
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
  };
  workingNumber = 0;
  return result;
}

document.querySelectorAll("button").forEach( (button) => buttonPress(button));

document.querySelector("h1").innerHTML = workingNumber;