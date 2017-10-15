// function validateInput(node) {
//   let inputField = node.target;
//   let inputValue = node.target.value;
//   let inputPattern = node.target.pattern;
//   var spanElement = inputField.previousElementSibling;
//
//   var currentPattern = new RegExp(inputPattern);
//   var test = currentPattern.test(inputValue);
//
//   if (!test) {
//     spanElement.className = "error";
//     console.log(test);
//   } else {
//     test = "valid"
//     spanElement.className = "error is-hidden";
//     console.log(test);
//   }
// }

const thisForm = document.getElementById('register-form');
const name = document.getElementById('name');
const email = document.getElementById('mail');
const creditCard = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');


// Disables / Enables checkboxes...
function checkboxControl(checked, boxValue, thisName ,conflict) {
  if (checked && boxValue === thisName) {
      conflict.disabled = true;
  } else if (!checked && boxValue === thisName) {
      conflict.disabled = false;
  }
};// checkboxControl function

// Show / Hide function...
(function() {
  //Holds the list of elements to be hidden
  let node = {
    otherField: document.querySelector('#other-title'),
    creditCard: document.querySelector("#credit-card"),
    paypal: document.querySelector("#paypal"),
    bitcoin: document.querySelector("#bitcoin"),
    error: document.querySelectorAll(".error")
  };
  //Hides the specified form elements
  for (let nodeValue in node) {
    node[nodeValue].className = "is-hidden";
  };

  //Show and hide input field for the option "other"
  const jobRole = document.querySelector('#title');
  jobRole.addEventListener('change', function(e) {
    if (e.target.value === "other") {
      node.otherField.className = "inherit";
    } else {
        node.otherField.className = "is-hidden";
        node.otherField.value = "";
    }
  });

  //Control display when payment option is selected
  node.creditCard.className = "inherit";
  //Credit-card shows by default
  const payment = document.querySelector("#payment");
  payment.addEventListener('change', function() {
    let value = payment.value;
    if (value === "paypal") {
        node.paypal.className = 'inherit';
        node.creditCard.className = 'is-hidden';
        node.bitcoin.className = 'is-hidden';
    } else if (value === "bitcoin") {
        node.bitcoin.className = 'inherit';
        node.paypal.className = 'is-hidden';
        node.creditCard.className = 'is-hidden';
    } else {
      node.bitcoin.className = 'is-hidden';
      node.paypal.className = 'is-hidden';
      node.creditCard.className = 'inherit';
    }
  });
}());

// ”T-Shirt Info” function...
(function() {
  const design = document.querySelector('#design');
  const color = document.querySelector('#color');
  const defaultOption = '<option><-- Select a T-shirt theme</option>';
  color.innerHTML = defaultOption;

  const jsPuns =
    '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>' +
    '<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>' +
    '<option value="gold">Gold (JS Puns shirt only)</option>';

  const heartJs =
    '<option value="tomato">Tomato (I &#9829; JS shirt only)</option>' +
    '<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>' +
    '<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>';

  //Show and hide input field for the option "other"
    design.addEventListener('change', function() {
      let options = '<option value="default" selected>Select a Color</option>';

      if (this.value === 'default') {
        color.innerHTML = defaultOption;
        return;
      }
        if (this.value === "js puns") {
          options += jsPuns;
          color.innerHTML = options;
        } else if (this.value === "heart js") {
          options += heartJs;
          color.innerHTML = options;
        }
    }); //”T-Shirt Info” EventListener
}()); //Immediately invoked function

// Activities function...
(function() {
  // const labels = fieldset.querySelectorAll('label');
  var runningTotal = 0;
  const fieldset = document.getElementById('activities');
  const priceDiv = document.createElement('div');
  priceDiv.id = "running-total";
  fieldset.appendChild(priceDiv);

  fieldset.addEventListener('change', function(e) {
    const checkbox = e.target;
    const isChecked = checkbox.checked;
    const itsName = checkbox.name;
    const itsValue = checkbox.value;
    console.log("Checkbox value " + itsValue);

    // Tracks the running total...
      // If box is checked || unchecked and the main activity
      // If box is checked || unchecked
    if (isChecked && itsValue === "all") {
      runningTotal += 200;
    } else if (!isChecked && itsValue === "all") {
      runningTotal -= 200;
    } else {
      if (isChecked) {
        runningTotal += 100;
      } else if (!isChecked) {
        runningTotal -= 100;
      }// Inner if, else statement
    }// Outer if, else statement
    priceDiv.innerHTML = '<span>Total: $' + runningTotal +'</span>';

    // Stores the activities, would like this be be more dynamic
    let event = {
      all: fieldset.querySelector('input[value="all"]'),
      jsFrameworks: fieldset.querySelector('input[value="js-frameworks"]'),
      jsLibs: fieldset.querySelector('input[value="js-libs"]'),
      express: fieldset.querySelector('input[value="express"]'),
      node: fieldset.querySelector('input[value="node"]'),
      buildTools: fieldset.querySelector('input[value="build-tools"]'),
      npm: fieldset.querySelector('input[value="npm"]')
    }
    // Prevent selection of activities that conflict
    // checkedBox, checkedBoxName, thisName ,conflict
    checkboxControl(isChecked, itsValue, "js-frameworks", event.express);
    checkboxControl(isChecked, itsValue, "express", event.jsFrameworks);
    checkboxControl(isChecked, itsValue, "js-libs", event.node);
    checkboxControl(isChecked, itsValue, "node", event.jsLibs);
  });// activities EventListener
}());// End of function


function inputValidation(pattern, value) {
  var currentPattern = new RegExp(pattern);
  var test = currentPattern.test(value);
  return test;
}


function showHideInputError(testValue, errorNode) {
  if (!testValue) {
    errorNode.className = "error";
    console.log(testValue);
  } else {
    testValue = "valid"
    errorNode.className = "error is-hidden";
    console.log(testValue);
  }
}


function createListener(validatorFunction, errorFunction) {
  return function(e) {
    let inputField = e.target;
    let inputValue = e.target.value;
    let inputPattern = e.target.pattern;
    var test = validatorFunction(inputPattern, inputValue);
    var spanElement = inputField.previousElementSibling;
    errorFunction(test, spanElement);
  }
}


email.addEventListener('input', createListener(inputValidation, showHideInputError), true);
name.addEventListener('input', createListener(inputValidation, showHideInputError), true);
creditCard.addEventListener('input', createListener(inputValidation, showHideInputError), true);
zipCode.addEventListener('input', createListener(inputValidation, showHideInputError), true);
cvv.addEventListener('input', createListener(inputValidation, showHideInputError), true);
