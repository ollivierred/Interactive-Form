
//**Note: boolean value is not a string... DOn't put quotes around it.
var validateBy = {
  "name": function(field) {
    return /^[a-zA-Z ]{2,30}$/.test(field.value);
  },
  "email": function(field) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(field.value);
  },
  "design": function(field) {
    if (field.value === "default") {
      return false;
    } else {
      return true;
    }
  },
  "payment": function(field) {
    if (field.value === "select_method") {
      return false;
    } else if (field.value === "credit card") {
      var inputField = field.parentNode.querySelectorAll('input');
      for (let i = 0; i < inputField.length; i++) {
        inputField[i].className = "required";
      }
      return false;
      console.log(inputField);
    } else {
      return true;
    }
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
}

function validateActivities(checklist) {
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

function isEmpty(field) {
  var valueMissing;
  if (field.value === "") {
    valueMissing = true;
    // setErrorMessage(valueMissing, field);
    return valueMissing;
  }
}

function setErrorMessage(errorType, field) {
  // valueMissing = false;
  // valueMismatch = false;
  // valueTooShort = false;
  // valueTooLong = false;

  if (valueMissing && field.id === "name") {
    let error = field.previousElementSibling;
    error.style.display = "block";
    var message = "Please fill out this field.";
    field.style.border = "2px solid firebrick";
  } else {
    field.style.border = "inherit";
  }
}

function isRequired(field) {
  if (field.className === "required") {
    var error;
    if (field.value === "") {
      error = field.previousElementSibling;
      error.className = "error";
      return error.innerHTML = 'Whoops error here.';
    } else {
      error = field.previousElementSibling;
      error.className = "error is-hidden";
      return valid = true;
    }
  }
}//End of required validation

function validateFieldBy(field) {
  if (field.value === false) {
    var valueMissing = false;
    return !valueMissing;
  }
  var id = field.id;
  console.log(id);
  //Retrieves a validation function based on the field's "id"
  //I feel pretty good about this one
  if (id === 'name') return validateBy[id](field);
  if (id === 'email') return validateBy[id](field);
  if (id === 'design') return validateBy[id](field);
  if (id === 'payment') return validateBy[id](field)
  if (id === 'cc-num') return validateBy[id](field);
  if (id === 'zip') return validateBy[id](field);
  if (id === 'cvv') return validateBy[id](field);
}

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
  const payment = document.querySelector("#payment");
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

  //Control display when payment option is selected
  payment.addEventListener('change', function() {
    let value = payment.value;
    if (value === "paypal") {
        field.paypal.style.display = 'inherit';
        field.creditCard.style.display = 'none';
        field.bitcoin.style.display = 'none';
    } else if (value === "bitcoin") {
        field.bitcoin.style.display = 'inherit';
        field.paypal.style.display = 'none';
        field.creditCard.style.display = 'none';
    } else if (value === "select_method"){
      field.bitcoin.style.display = 'none';
      field.paypal.style.display = 'none';
      field.creditCard.style.display = 'none';
    } else {
      field.creditCard.style.display = 'inherit';
      field.bitcoin.style.display = 'none';
      field.paypal.style.display = 'none';
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


(function() {
  const form = document.register;
  const activitiesList = document.register.activities;
  //Add validation boolean to valid object
  var valid = {};
  var validState = true;
  var isFormValid = false;

  document.addEventListener('blur', (e) => {
    // Don't validate submits, buttons, file and reset inputs, and disabled fields return;
    if (e.target.type === 'submit' || e.target.type === 'button' || e.target.type === 'fieldset' ) {
      return;
    } else {
      valueMissing = isEmpty(e.target);
      console.log(validState);
      if (valueMissing && e.target.id === "name" || e.target.id === "email") {
        var error = e.target.previousElementSibling;
        var message = "Please fill out this field.";
        error.innerHTML = message;
        error.style.display = "block";
        e.target.style.border = "2px solid firebrick";
      } else {
        var error = e.target.previousElementSibling;
        error.style.display = "none";
        e.target.style.border = "inherit";
      }
      // Collect them
      var valid = e.target;
    }
    console.log(valid);
  }, true);

  form.addEventListener('submit', (e) => {

    for (let i = 0; i < form.length; i++) {
      if (form[i].className === "required") {
        validState = !isEmpty(form[i]);
        validState = validateFieldBy(form[i]);
        valid[form[i].id] = validState;
      }
    }
    //Custom validation
    valid.checklist = validateActivities(activitiesList);
    console.log(valid);

    for (var field in valid) {
      // console.log(valid[field]);
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
  }, false);
}());
