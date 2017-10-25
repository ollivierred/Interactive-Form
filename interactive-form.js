//Number tracker function
(function numberCounter() {
  var fields = document.querySelectorAll(".payment-info input");
  var maxLength = 0;

  for (var i = 0; i < fields.length; i++) {
    // console.log(fields[i].previousElementSibling);
    var label = fields[i].previousElementSibling;
    var value = fields[i].value;
    // console.log(label);
    var countingContainer = document.createElement('span');
    countingContainer.className = "counter";
    if (fields[i].id === "cc-num") maxLength = 16;
    if (fields[i].id === "zip") maxLength = 5;
    if (fields[i].id === "cvv") maxLength = 3;
    countingContainer.textContent = value.length + "/" + maxLength;
    fields[i].previousElementSibling.appendChild(countingContainer);
  }
}());



// -------------------------------------------------------------------------
// FUNCTIONS TO SET / GET / SHOW / REMOVE ERROR MESSAGES
// -------------------------------------------------------------------------

function setErrorMessage(field, message) {
  $(field).data('errorMessage', message);
};

function showErrorMessage(field) {
  var $field = $(field);
  // console.log($field);
  var $errorContainer = $field.parent().children('.error');

  if (!$errorContainer.length) $errorContainer = $('<span class="error"></span>').insertAfter($field);
  $errorContainer.text($(field).data('errorMessage'));
};

function removeErrorMessage(field) {
  var errorContainer = $(field).parent().children('.error');
  errorContainer.remove();
};



// -------------------------------------------------------------------------
// OBJECT FOR VALIDATION BY ID NAME
// -------------------------------------------------------------------------

var validate = {
  "name": function(field, value) {
    var valid = /^[a-zA-Z ]{2,30}$/.test(value);
    if (!valid) setErrorMessage(field, "Enter your first and last " + field.id + ". No special characters allowed");
    return valid;
  },
  "email": function(field, value) {
    var valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
    if (!valid) setErrorMessage(field, "Enter a valid " + field.id + " format: jane@doe.com");
    return valid;
  },
  "cc-num": function(field, value) {
    var valid = /^(?:\d[ -]*?){13,16}$/.test(value);
    if (!valid) setErrorMessage(field, "Enter a 13-16 digit number");
    return valid;
  },
  "zip": function(field, value) {
    var valid = /^\d{5}$/.test(value);
    if (!valid) setErrorMessage(field, "Enter a 5-digit number");
    return valid;
  },
  "cvv": function(field, value) {
    var valid = /^\d{3}$/.test(value);
    if (!valid) setErrorMessage(field, "Enter a 3-digit number");
    return valid;
  }
}//End of object
function validateThisField(field) {
  var id = field.id, type = field.type, value = field.value;
  var valid = false;                                                //Flag is set to false

  if (valueMissing(field)) {
    setErrorMessage(field, "This field is required");               //Sets error message for fields that are empty
    showErrorMessage();
  } else {
    valid = validate[id](field, value);                             //Match the field value to its validation function based on "id"
  }
  return valid;
} // -----------------------------------------------------------------------


// -------------------------------------------------------------------------
// CUSTOM VALIDATION FUNCTIONS: ACTIVITIES AND PAYMENT
// -------------------------------------------------------------------------

function validateActivities() {
  var fieldset = document.querySelector('.activities');
  var legend = document.querySelector('.activities legend');
  var checklist = document.querySelectorAll('.activities input');
  var valid = false;
  var isChecked = 0;

  for (let i = 0; i < checklist.length; i++) {
    //Counts all checked boxes
    if (checklist[i].checked) isChecked++;
  }

  isChecked > 0 ? valid = true : valid = false;

  if (!valid) {
    setErrorMessage(fieldset, "Select at least one activity");
    showErrorMessage(fieldset);
  } else {
    removeErrorMessage(fieldset);
  }
  return valid;
} // -------------------------------------------------------------------

function validatePayment() {
  var payment = document.querySelector("#payment");
  var creditCard = {};
  var valid = false;

  if (payment.selectedIndex !== 0) {
    return valid = true;
  } else {
    var fields = document.querySelectorAll(".payment-info input");
    for (var i = 0; i < fields.length; i++) {
      valid = validateThisField(fields[i]);                                  //Loops through and validates credit card fields
      !valid ? showErrorMessage(fields[i]) : removeErrorMessage(fields[i]);   //Shows or removes error message if valid is true / false
      creditCard[fields[i].id] = valid;                                   //Adds fields to the valid object
    }
    for (var field in creditCard) {
      if (!creditCard[field]) valid = false;
    }
    return valid;
  }
} // --------------------------------------------------------------------


// -------------------------------------------------------------------------
// VALIDATION HELPER FUNCTIONS
// -------------------------------------------------------------------------
function isRequired(field) {
  var valid;
  return field.className === "required" ? valid = true : valid = false;
} // -----------------------------------------------------------------------
function valueMissing(field) {
  var valid;
  return (field.value === "") ? valid = true : valid = false;
} // -----------------------------------------------------------------------



// -------------------------------------------------------------------------
// T-SHIRT INFO FUNCTION
// -------------------------------------------------------------------------

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



// -------------------------------------------------------------------------
// DISABLE / ENABLE CHECKBOX FUNCTION
// -------------------------------------------------------------------------

(function() {
  const fieldset = document.querySelector('.activities');
  const priceDiv = document.createElement('div');
  var runningTotal = 0;
  priceDiv.id = "running-total";
  fieldset.appendChild(priceDiv);

  function checkboxControl(checked, boxValue, thisName ,conflict) {   // Disables / Enables checkboxes...
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

    if (isChecked && itsValue === "all") {
      runningTotal += 200;
    } else if (!isChecked && itsValue === "all") {
      runningTotal -= 200;
    } else {
      if (isChecked) runningTotal += 100;
      if (!isChecked) runningTotal -= 100;
      //End of Inner if, else statement
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



// -------------------------------------------------------------------------
// PAYMENT AND JOB ROLE FUNCTION
// -------------------------------------------------------------------------

(function() {
  const payment = document.querySelector("#payment");
  const elements = document.querySelectorAll('#credit-card input');

  var field = {                                                     // Holds the list of elements to be hidden
    otherField: document.querySelector('#other-title'),
    creditCard: document.querySelector("#credit-card"),
    paypal: document.querySelector("#paypal"),
    bitcoin: document.querySelector("#bitcoin")
  }
  //Hides the specified form elements
  for (var el in field) {
    field[el].style.display = "none";
  };
  field.creditCard.style.display = 'inherit';                       // Credit-card shows by default

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

  function showAndHide(field, creditCard, bitcoin, paypal) {        //Show / Hide option helper function
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

// -------------------------------------------------------------------------
// VALIDATION ONSUBMIT / LIVE
// -------------------------------------------------------------------------

(function() {
  const form = document.register;
  var isFormValid = false;

  form.addEventListener('blur', (e) => {
    var field = e.target;
    console.log(field);
    // Don't validate submits, buttons, file and reset inputs, and disabled fields
   if (field.disabled || field.type === 'submit' || field.type === 'button') return;
   var valid = {}, isValid = false;

   if (isRequired(field)) {
     isValid = validateThisField(field);
     !isValid ? showErrorMessage(field) : removeErrorMessage(field);
     valid[field.id] = isValid;
   }
    //Custom validation
    valid.activities = validateActivities();
    valid.payment = validatePayment();

  }, true);


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    var valid = {}, isValid = false;
    for (let i = 0; i < form.length; i++) {
      var field = form[i];
      if (isRequired(field)) {
        isValid = validateThisField(field);
        !isValid ? showErrorMessage(field) : removeErrorMessage(field);
        valid[field.id] = isValid;
      }
    }

    //Custom validation
    valid.activities = validateActivities();
    valid.payment = validatePayment();
    console.log(valid);

    for (var field in valid) {
      if (!valid[field]) {
        isFormValid = false;
        break;
      }
      isFormValid = true;
    }
    !isFormValid ? e.preventDefault() : alert("Yay, your can submit!");
  });

}());
// -------------------------------------------------------------------------
