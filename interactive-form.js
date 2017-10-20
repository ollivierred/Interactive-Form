
//**Note: boolean value is not a string... DOn't put quotes around it.

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
  "cc-num": function(field) {
    return /^(?:\d[ -]*?){13,16}$/.test(field.value);
  },
  "zip": function(field) {
    return /^\d{5}$/.test(field.value);
  },
  "cvv": function(field) {
    return /^\d{3}$/.test(field.value);
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
    } else {
      return true;
    }
  }
}//End of object

function isRequired(field) {
  if (field.className === "required") {
    return true;
  } else {
    return false;
  }
}//End of required validation
function isEmpty(field) {
  // setErrorMessage(valueMissing, field);
  if (field.value === "") {
    return false;
  } else {
    return true;
  }
}

function setErrorMessage(field, fieldValue) {
  const form = document.querySelector('#register');
  const fieldset = form.querySelector('fieldset');
  const span = document.createElement('span');
  span.className = "error";
  span.style.textAlign = "center";
  form.insertBefore(span, fieldset);
  console.log(fieldset);

  if (field.id === "name") span.innerHTML = "Please enter a valid " + field.id;
  if (field.id === "email") span.innerHTML = "Please enter a valid " + field.id + " address";
  if (field.id === "cc-num") span.innerHTML = "Credit card must be 13 - 16 digits long, you entered " + fieldValue.length;
  if (field.id === "zip") span.innerHTML = "Zipcode should be 5 digits long, you entered " + fieldValue.length;
  if (field.id === "cvv") span.innerHTML = "Your cvv should be 3 digits long, you entered " + fieldValue.length;
}

function removeErrorMessage() {
  const form = document.querySelector('#register');
  const error = form.querySelector('.error');
  console.log(error);
  if (error === null) {
    return;
  } else {
    form.removeChild(error);
  }
}

function validateThisField(field) {
  //Declare the "thisField" object
  var thisField = {};
  thisField.id = field.id;
  thisField.required = isRequired(field);
  if (thisField.required) thisField.hasValue = isEmpty(field);
  var value = field.value;

  //Has field been filled out
  if (thisField.hasValue === false) {
    if (thisField.id === "name" || thisField.id === "email") console.log("Please fill this field");
  } else {
    //Retrieves a validation function based on the field's "id"
    //I feel pretty good about this one
    for (var hasVal in thisField) {
      if (thisField[hasVal]) thisField.valIsValid = validateBy[field.id](field);
    }
    //Breakdown of the above script
    // if (thisField.id === 'name') thisField.validValue = validateBy[field.id](field);

    if (thisField.validValue === false) {
      setErrorMessage(field, value);
    } else {
      // removeErrorMessage();
    }

      // for (let value in thisField) {
      //   console.log(thisField[value]);
      //   // if (!valid[field]) {
      //   //   isFormValid = false;
      //   //   break;
      //   // } else {
      //   //   isFormValid = true;
      //   // }
      // }
      console.log(thisField);
  }
  // console.log(thisField);
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
  const fieldset = document.querySelector('.activities');
  const priceDiv = document.createElement('div');
  priceDiv.id = "running-total";
  fieldset.appendChild(priceDiv);
  var runningTotal = 0;

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
    var field = e.target;
    // Don't validate submits, buttons, file and reset inputs, and disabled fields return;
    if (e.target.type === 'submit' || e.target.type === 'button' || e.target.type === 'fieldset' || e.target.type === undefined) {
      return;
    } else {
      //Validate it
      validateThisField(field);
    }

  }, true);

  form.addEventListener('submit', (e) => {

  //   for (let i = 0; i < form.length; i++) {
  //     if (form[i].className === "required") {
  //       validState = !isEmpty(form[i]);
  //       validState = validateFieldBy(form[i]);
  //       valid[form[i].id] = validState;
  //     }
  //   }
  //   //Custom validation
  //   valid.checklist = validateActivities(activitiesList);
  //   console.log(valid);
  //
  //   for (var field in valid) {
  //     // console.log(valid[field]);
  //     // if (!valid[field]) {
  //     //   isFormValid = false;
  //     //   break;
  //     // } else {
  //     //   isFormValid = true;
  //     // }
  //   }

    if (!isFormValid) {
      e.preventDefault();
    }
  }, false);
}());
