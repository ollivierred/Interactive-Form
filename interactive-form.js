
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

var validateBy = {
  "notEmpty": function(field) {
    var value = field.value;
    if ( value.length > 0 ) {
      return true;
    } else {
      return false;
    }
  },
  "name": function(field) {
    return /^[a-zA-Z ]{2,30}$/.test(field.value);
  },
  "email": function(field) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(field.value);
  },
  "option": function(field) {
    if (!field.value === "default" || !field.value === "select_method") {
      return true;
    } else {
      return false;
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

function setErrorMessage(obj, field, type, id, value) {
  if (!obj.isNotEmpty) return "Please fill out this field";
  if (!obj.validOption && id === "design") return "Select a T-Shirt theme";
  if (id === "email") return "Please enter a valid " + id + " address";
  if (id === "cc-num") return "Credit card must be 13 - 16 digits long, you entered " + value.length;
  if (id === "zip") return "Zipcode should be 5 digits long, you entered " + value.length;
  if (id === "cvv") return "Your cvv should be 3 digits long, you entered " + value.length;
}

function createError(field, id) {
  const form = document.querySelector('#register');
    const span = document.createElement('span');
    span.setAttribute = 'aria-live="polite"';
    span.className = 'error at ' + id;
    field.parentElement.insertBefore(span, field);
    return span;
}

function removeErrorMessage(field) {
  // const form = document.querySelector('#register');
  // const error = form.querySelector('.error');
  // console.log(error);
  // if (error === null) {
  //   return;
  // } else {
  //   form.removeChild(error);
  // }
}

function validateThisField(field) {
  //Declare the "thisField" object
  var thisField = {};

  //Check if required
  //If yes, check if the field is empty
  //If empty, show error
  //If not, validate field by id

  thisField.required = isRequired(field);
  if (thisField.required) {
    console.log("This field " + id + " is required");
    var id = field.id;
    var type = field.type;
    var value = field.value;
    if (type === "text" || type === "email") thisField.notEmpty = validateBy["notEmpty"](field);
    if (type === "select-one") thisField.validOption = validateBy["option"](field);
    //Has field been filled out
    if (!thisField.isNotEmpty) {
      var error = createError(field, id);
      error.innerHTML = setErrorMessage(thisField, field, type, id, value);
      console.log("Please fill out this field");
    } else if (!thisField.validOption) {
      var error = createError(field, id);
      error.innerHTML = setErrorMessage(thisField, field, type, id, value);
      console.log("Please select");
    }

      //Retrieves a validation function based on the field's "id"
      // for (var hasVal in thisField) {
      //   if (thisField[hasVal]) {
      //     thisField.isValid = validateBy[id](field);
      //     //Breakdown of the above script
      //     // if (thisField.id === 'name') thisField.validValue = validateBy[field.id](field);
      //   }
      // }

      if (thisField.isValid === false) {
        // <span class="error is-hidden" aria-live="polite"></span>
        // defineError(field, id, value);
        // console.log(val);
      } else if (thisField.isValid === true) {
        // removeErrorMessage(field);
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
  const form = document.querySelector('#register');
  // const fieldset = form.querySelector('fieldset');
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
