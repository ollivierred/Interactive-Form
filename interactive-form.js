const thisForm = document.querySelector('#register-form');
const fieldset = document.querySelector('.activities');

const submit = thisForm.querySelector('[type="submit"]');
var isValid = false;
// Disables / Enables checkboxes...
function checkboxControl(checkedBox, checkedBoxName, thisName ,conflict) {
  if (checkedBox && checkedBoxName === thisName) {
      conflict.disabled = true;
  } else if (!checkedBox && checkedBoxName === thisName) {
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
    bitcoin: document.querySelector("#bitcoin")
  };
  //Hides the specified form elements
  for (let nodeValue in node) {
    node[nodeValue].style.display = "none";
  };

  //Show and hide input field for the option "other"
  const jobRole = document.querySelector('#title');
  jobRole.addEventListener('change', function(e) {
    if (e.target.value === "other") {
      node.otherField.style.display = "block";
    } else {
        node.otherField.style.display = "none";
        node.otherField.value = "";
    }
  });

  //Control display when payment option is selected
  node.creditCard.style.display = 'inherit';
  //Credit-card shows by default
  const payment = document.querySelector("#payment");
  payment.addEventListener('change', function() {
    let value = payment.value;
    if (value === "paypal") {
        node.paypal.style.display = 'inherit';
        node.creditCard.style.display = 'none';
        node.bitcoin.style.display = 'none';
    } else if (value === "bitcoin") {
        node.bitcoin.style.display = 'inherit';
        node.paypal.style.display = 'none';
        node.creditCard.style.display = 'none';
    } else {
      node.bitcoin.style.display = 'none';
      node.paypal.style.display = 'none';
      node.creditCard.style.display = 'inherit';
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

  const priceDiv = document.createElement('div');
  priceDiv.id = "running-total";
  fieldset.appendChild(priceDiv);

  fieldset.addEventListener('change', function(e) {
    const checkbox = e.target;
    const isChecked = checkbox.checked;
    const boxName = checkbox.name;
    const boxValue = checkbox.parentNode.textContent;

    // Tracks the running total...
      // If box is checked || unchecked and the main activity
      // If box is checked || unchecked
    if (isChecked && boxName === "all") {
      runningTotal += 200;
    } else if (!isChecked && boxName === "all") {
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
      all: fieldset.querySelector('input[name="all"]'),
      jsFrameworks: fieldset.querySelector('input[name="js-frameworks"]'),
      jsLibs: fieldset.querySelector('input[name="js-libs"]'),
      express: fieldset.querySelector('input[name="express"]'),
      node: fieldset.querySelector('input[name="node"]'),
      buildTools: fieldset.querySelector('input[name="build-tools"]'),
      npm: fieldset.querySelector('input[name="npm"]')
    }
    // Prevent selection of activities that conflict
    // checkedBox, checkedBoxName, thisName ,conflict
    checkboxControl(isChecked, boxName, "js-frameworks", event.express);
    checkboxControl(isChecked, boxName, "express", event.jsFrameworks);
    checkboxControl(isChecked, boxName, "js-libs", event.node);
    checkboxControl(isChecked, boxName, "node", event.jsLibs);
  });// activities EventListener
}());// End of function

//Using the closure method, with this function
function eventListener() {
  return function(e) {
    let inputField = e.target;
    let inputValue = e.target.value;
    let inputPattern = e.target.pattern;
    console.log(inputField);
    console.log(inputValue);
  }
}

//Using the closure method, with this function
function isValidText(currentField, itsPattern, itsValue) {
    var currentPattern = new RegExp(itsPattern);
    var validValue = currentPattern.test(itsValue);
    return validValue;
}

  const eventsChecked = fieldset.querySelectorAll('input[type="checkbox"]');
  var validValue;
  if (eventsChecked.length > 0) {
    console.log("Check something");
  } else {
    console.log("you selected something");
  }

function isValidShirtPick(theField, pattern, theValue) {

}
function isValidPayment(theField, pattern, theValue) {

}
// function showHideError(theField, validField, validActivities, validShirt, ) {
//   let label = theField.previousElementSibling;
//   let oldLabelMessage = label.textContent;
//   let newLabelMessage = errorMessage.name;
//
//   if (!validField) {
//     theField.style.border = "2px solid rgba(255, 0, 0, 0.35)";
//   } else {
//     theField.style.border = "2px solid rgba(47, 236, 0, 0.58)";
//   }
//   if (!validActivities) {
//     theField.style.color = "rgba(255, 0, 0, 0.35)";
//   }
// }
//Form validation function...
//Retrieve the current input field being worked on
//Validate the value from the input field
// function isSelectionValid(theField, theValue){}
function isItChecked() {
  const activitiesChecked = fieldset.querySelectorAll('input[type="checkbox"]');
  if (!activitiesChecked.length > 0) {
    let validActivities = false;
    console.log(validActivities);
  }
}

thisForm.addEventListener('change', (e) => {
  let inputField = e.target;
  let inputValue = e.target.value;
  let inputPattern = e.target.pattern;
  console.log(isValidText(inputField, inputPattern, inputValue));
});



//Name field can't be blank
//validly formatted e-mail address: dave@teamtreehouse.com
//Must select at least one checkbox under the "Register for Activities" section of the form.
//If payment option is "Credit Card," user must supply:
  //a credit card number,
  //a zip code,
  //a 3 number CVV value before the form can be submitted.
//Credit card field should only accept a number between 13 and 16 digits
//The zipcode field should accept a 5-digit number
//The CVV should only accept a number that is exactly 3 digits long
