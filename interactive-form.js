
/*
  INDEX |ELEMENT              |REQUIRED
    0    elements.name         Yes
    1    elements.email        Yes
    2    elements.job-role     No
    3    elements.t-shirt      Yes
    4    elements.activities   Yes
    5    elements.payment      If credit-card selected
    6      elements.cc-num     Yes
    7      elements.zip-code   Yes
    8      elements.cvv        Yes
*/

//job-role "other" field pattern ="^\w+ ?\w+$"
//credit-card number pattern ="^(?:\d[ -]*?){13,16}$"
//zip-code pattern ="^\d{5}$"
//cvv pattern ="^\d{3}$"

//**Note: boolean value is not a string... DOn't put quotes around it.

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
  // node.creditCard.className = "inherit";
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
  var runningTotal = 0;
  const fieldset = document.querySelector('.activities');
  const priceDiv = document.createElement('div');
  priceDiv.id = "running-total";
  fieldset.appendChild(priceDiv);

  fieldset.addEventListener('change', function(e) {
    const checkbox = e.target;
    const isChecked = checkbox.checked;
    const itsValue = checkbox.value;
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






function isDefault(el) {
  return el.value === "default";
}


function getElementName(el) {
  var name = el.name;
  return name;
}

function setErrorMessage(el) {

}

var validateBy = {
  name: function(el) {
    return /^(-?([A-Z].\s)?([A-Z][a-z]+)\s?)+([A-Z]'([A-Z][a-z]+))?$/.test(el);

  },
  email: function(el) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(el);
  }
}


function validateShirtInfo(el) {
  // return el.value;
}

function validatePayment(fieldOne, fieldTwo, fieldThree) {
  var cardNumber = /^(?:\d[ -]*?){13,16}$/.test(fieldOne);
  var zip = /^\d{5}$/.test(fieldTwo);
  var cvv = /^\d{3}$/.test(fieldThree);
}

function validateActivities(checklist) {
  var valid;
  var isChecked = 0;
  for (let i = 0; i < checklist.length; i++) {
    if(checklist[i].checked) {
      isChecked ++;
    }
  }
  return isChecked > 0 ? valid = true : valid = false;
}

function validateElementByType(el) {
  if (!el.value === "") {
    return true;
  }
  var type = el.getAttribute('type');
  //The typeof operator returns the type of a variable or an expression
  if (typeof validateBy[type] === 'function') {
    return validateBy[type](el);
  } else {
    return true;
  }
}

function isEmpty(field) {
  if (field === "") {
    return true;
  } else {
    return false;
  }
}

function isRequired(formField) {
  if (formField.className === "required") {
    var valid = isEmpty(formField);
    if (valid === true) {
      return valid = false;
    } else {
      return valid = true;
    }
  }
}//End of required validation



(function() {
  const form = document.register;
  const activitiesList = document.register.activities;
  //Stores form fields designated as required
  var required = {};
  //Add validation boolean to valid object
  var valid = {};
  var validState = false;
  var isFormValid = false;


  // valid.name = isEmpty(element) && validateElementByType(element);
  // valid.email = isEmpty(element) && validateElementByType(element);
  // if ( type === "email") {
  //   valid.email = validateBy.emailTest(element);
  // }
  // if (type === "select-one" && name === "user_design") {
  //   valid.shirtInfo = !isDefault(element);
  // }
  // if (type === "select-one" && name === "user_payment") {
  //   valid.payment = !isDefault(element);
  //   valid.payment = !
  // }
  //Custom validation
  // valid.checklist = validateActivities(activitiesList);
  // console.log(valid);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    for (let i = 0; i < form.length; i++) {
      validState = isRequired(form[i]);
      valid[form[i].id] = validState;
    }
    console.log(valid);

    for (var field in valid) {
      console.log(valid[field]);
      // if (!valid[field]) {
      //   isFormValid = false;
      //   break;
      // } else {
      //   isFormValid = true;
      // }
    }

    if (!isFormValid) {
      e.preventDefault();
    }
  });
}());
