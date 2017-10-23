//*Note: a boolean value is not a string... DON'T put quotes around it*
function setErrorMessage(field) {
  const fieldset = document.querySelectorAll('fieldset');

  //Create error message element
  const span = document.createElement("span");
  span.setAttribute("aria-live", "polite");
  span.setAttribute("class", "error at_" + field.id);
  //Error message is set here
  span.textContent = "Error message goes here";

  //Add error to document
  field.insertAdjacentElement('afterend', span);
  field.style.border = '2px solid #B71C1C';
};

function removeErrorMessage(field) {
  var reference = document.querySelector("error at_" + field.id);
  if (reference.className === "error at_" + field.id) reference.parentElement.removeChild(reference);
  field.style.border = 'inherit';
};

//Dynamic validation function
var validate = {
  "name": function(field) {
      return /^[a-zA-Z ]{2,30}$/.test(field.value);
  },
  "email": function(field) {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(field.value);
  },
  "cc-num": function(field) {
      return /^(?:\d[ -]*?){13,16}$/.test(field.value);
  },
  "zip": function(field) {
      return /^\d{5}$/.test(field.value);
  },
  "cvv": function(field) {
      return /^\d{3}$/.test(field.value);
  }
}//End of object
function validateThisField(field) {
  var id = field.id, type = field.type, value = field.value;

  var valid = false; //Flag is set to false
    //Match the value and its validation function based on "id"
    valid = validate[id](field);
    //If not valid, show appropriate error
    if (!valid) {
      //show error message
      setErrorMessage(field);
      return valid;
    } else {
      //Once field is valid, remove error and return the value
      //Remove error message
      removeErrorMessage(field);
      return valid;
    }
}

//Custom validat functions
function validateActivities() {
  var checklist = document.querySelectorAll('.activities input');
  var isChecked = 0;
  for (let i = 0; i < checklist.length; i++) {
    //Counts all checked boxes
    if (checklist[i].checked) {
      isChecked++
    }
  }
  return isChecked > 0 ? valid = true : valid = false;
}
function validatePayment() {
  var payment = document.querySelector("#payment");
  var paymentFields = {};
  var valid = false;

  if (payment.selectedIndex !== 0) {
    return valid = true;
  } else {
    var fields = document.querySelectorAll(".payment-info input");
    console.log(fields);
    for (var i = 0; i < fields.length; i++) {
      paymentFields[fields[i].id] = validateThisField(fields[i]);
    }
    return paymentFields;
  }
}

//validation helper functions
function isRequired(field) {
  if (field.className === "required") {
    return true;
  } else {
    return false;
  }
}//End of required validation
function valueMissing(field) {
  if (field.value === "") {
    return true;
  } else {
    return;
  }
}

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
  const fieldset = document.querySelector('.activities');
  const priceDiv = document.createElement('div');
  var runningTotal = 0;

  priceDiv.id = "running-total";
  fieldset.appendChild(priceDiv);

  // Disables / Enables checkboxes...
  function checkboxControl(checked, boxValue, thisName ,conflict) {
    if (checked && boxValue === thisName) {
        conflict.disabled = true;
    } else if (!checked && boxValue === thisName) {
        conflict.disabled = false;
    }
  };// checkboxControl function

  fieldset.addEventListener('change', function(e) {
    const checkbox = e.target;
    const isChecked = checkbox.checked;
    const itsValue = checkbox.value;
    // Tracks the running total...
      // If box is checked || unchecked and the main activity
      // If box is checked || unchecked
    if (isChecked && itsValue === "all") { runningTotal += 200;
    } else if (!isChecked && itsValue === "all") { runningTotal -= 200;
    } else {
      if (isChecked) { runningTotal += 100;
      } else if (!isChecked) { runningTotal -= 100;
      }//End of Inner if, else statement
    }//End of Outer if, else statement
    priceDiv.innerHTML = '<span>Total: $' + runningTotal +'</span>';

    // Stores the activities, would like this be be more dynamic
    var event = {
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

// Payment and job role function...
(function() {
  const payment = document.querySelector("#payment");
  const elements = document.querySelectorAll('#credit-card input');
  //Holds the list of elements to be hidden
  var field = {
    otherField: document.querySelector('#other-title'),
    creditCard: document.querySelector("#credit-card"),
    paypal: document.querySelector("#paypal"),
    bitcoin: document.querySelector("#bitcoin")
  }
  //Hides the specified form elements
  for (var el in field) {
    field[el].style.display = "none";
  };
  // Credit-card shows by default
  field.creditCard.style.display = 'inherit';
  // addRequiredClass(elements);

  //Show and hide input field for the option "other"
  const jobRole = document.querySelector('#title');
  jobRole.addEventListener('change', function(e) {
    if (e.target.value === "other") {
      field.otherField.style.display = "inherit";
    } else {
        field.otherField.style.display = "none";
        field.otherField.value = "";
    }
  });

  //Helper function add required class
  function addRequiredClass(elements) {
    //Give input fields the class "required"
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute("class", "required");
    }
  }
  //Helper function remove required class
  function removeRequiredClass(elements) {
    //Give input fields the class "required"
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].hasAttribute("class")) elements[i].removeAttribute("class");
    }
  }

  //Show / Hide option helper function
  function showAndHide(field, creditCard, bitcoin, paypal) {
    field.creditCard.style.display = creditCard;
    field.bitcoin.style.display = bitcoin;
    field.paypal.style.display = paypal;
  }
  //Control display when payment option is selected
  payment.addEventListener('change', (e) => {
    var option = e.target;
    if (option.value === "paypal") {
      // removeRequiredClass(elements);
      showAndHide(field, 'none', 'none', 'inherit');
    } else if (option.value === "bitcoin") {
      // removeRequiredClass(elements);
      showAndHide(field, 'none', 'inherit', 'none')
    } else {
      // addRequiredClass(elements);
      showAndHide(field, 'inherit', 'none', 'none')
    }
  });
}());


//Live and onSubmit validatiion
(function() {
  const form = document.register;
  var isFormValid = false;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    var isValid = {};
    for (let i = 0; i < form.length; i++) {
      var field = form[i];
      if (isRequired(field)) {
        isValid[field.id] = validateThisField(field);
      }
    }
    //Custom validation
    isValid.activities = validateActivities();
    isValid.payment = validatePayment();
    console.log(isValid);

    if (!isFormValid) {
      e.preventDefault();
    }
  });

}());
