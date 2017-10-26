//Number tracker function



(function createCountContainer() {
  var paymentLabels = document.querySelectorAll(".payment-info input");
  var cc = document.querySelector('#credit-card');
  var maxLength = 0;
  var count = 0;

  for (var i = 0; i < paymentLabels.length; i++) {
    var countContainer = document.createElement('span');
        countContainer.className = "counter";
    if (paymentLabels[i].id === "cc-num") maxLength = 16;
    if (paymentLabels[i].id === "zip") maxLength = 5;
    if (paymentLabels[i].id === "cvv") maxLength = 3;
    paymentLabels[i].previousElementSibling.appendChild(countContainer);
  }
  
}());

//Complete this using jquery***
(function counter(field, countContainer) {
  const creditCard = document.querySelector('#cc-num');
  const zip = document.querySelector('#zip');
  const cvv = document.querySelector('#cvv');
  var countContainer = creditCard.previousElementSibling;
  console.log(countContainer);

  creditCard.addEventListener('keyup', (e) => {
    var countContainer = creditCard.previousElementSibling;
    countContainer.textContent = e.target.value.length + "/16";
  })
  zip.addEventListener('keyup', (e) => {
    var countContainer = zip.previousElementSibling;
    countContainer.textContent = e.target.value.length + "/5";
  })
  cvv.addEventListener('keyup', (e) => {
    var countContainer = cvv.previousElementSibling;
    countContainer.textContent = e.target.value.length + "/3";
  })

}());


// -------------------------------------------------------------------------
// FUNCTIONS TO SET / GET / SHOW / REMOVE ERROR MESSAGES
// -------------------------------------------------------------------------
// --- SET ERROR MESSAGE FUNCTION ------------------------------------------
function setErrorMessage(field, message) {
  $(field).data('errorMessage', message);
};
// --- SHOW ERROR MESSAGE FUNCTION -----------------------------------------
function showErrorMessage(field) {
  var $field = $(field);
  var $errorContainer = $field.parent().children('.error');

  if (!$errorContainer.length) $errorContainer = $('<span class="error"></span>').insertAfter($field);
  $errorContainer.text($(field).data('errorMessage'));
};
// --- REMOVE ERROR MESSAGE FUNCTION ---------------------------------------
function removeErrorMessage(field) {
  var errorContainer = $(field).parent().children('.error');
  errorContainer.remove();
};

// -------------------------------------------------------------------------
// VALIDATES FIELDS DYNAMICALLY BY ID
// -------------------------------------------------------------------------
// --- VALIDATION LIST OBJECT ----------------------------------------------
var validate = {
  "name": function(field, value) {                  //Validates name
    var valid = /^[a-zA-Z ]{2,30}$/.test(value);    //Letters, 2-30 maximum
    if (!valid) setErrorMessage(field, "Enter your first and last " + field.id + ". No special characters allowed");
    return valid;
  },
  "email": function(field, value) {                 //Validates email
    var valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value); //
    if (!valid) setErrorMessage(field, "Enter a valid " + field.id + " format: jane@doe.com");
    return valid;
  },
  "cc-num": function(field, value) {                //Validates credit card number
    var valid = /^(?:\d[ -]*?){13,16}$/.test(value);  
    if (!valid) setErrorMessage(field, "Enter a 13-16 digit number");
    return valid;
  },
  "zip": function(field, value) {                   //Validates zip code
    var valid = /^\d{5}$/.test(value);
    if (!valid) setErrorMessage(field, "Enter a 5-digit number");
    return valid;
  },
  "cvv": function(field, value) {                   //Validates cvv number
    var valid = /^\d{3}$/.test(value);
    if (!valid) setErrorMessage(field, "Enter a 3-digit number");
    return valid;
  }
}
// --- GENERIC VALIDATION FUNCTION -----------------------------------------
function validateThisField(field) {
  var id = field.id, type = field.type, value = field.value; //Variable for the field's "id", "type", and "value"
  var valid = false;
  if (valueMissing(field)) {                         //If no value present
    setErrorMessage(field, "This field is required");
    showErrorMessage();                              //Set and show error message for fields that are empty
  } else {
    valid = validate[id](field, value);              //Match the field value to its validation function based on "id"
  }
  return valid;
}


// -------------------------------------------------------------------------
// CUSTOM VALIDATION FUNCTIONS: ACTIVITIES AND PAYMENT
// -------------------------------------------------------------------------
// --- ACTIVITIES VALIDATION -----------------------------------------------
function validateActivities() {
  var fieldset = document.querySelector('.activities'); //Fieldset surrounding activities
  var legend = document.querySelector('.activities legend');  //Legend tag inside fieldset
  var checklist = document.querySelectorAll('.activities input'); //List of all activities
  var valid = false;
  var isChecked = 0;

  for (let i = 0; i < checklist.length; i++) {       //Loops through list of checkboxes and count if any checked
    if (checklist[i].checked) isChecked++
  }
  isChecked > 0 ? valid = true : valid = false;      //If checked is more than "0" it passes

  if (!valid) {                                      //If not valid
    setErrorMessage(fieldset, "Select at least one activity");
    showErrorMessage(fieldset);                      //Set and show error message
  } else {
    removeErrorMessage(fieldset);                    //Remove if valid
  }
  return valid;                                      //Return valid state
}

// --- PAYMENT VALIDATION -----------------------------------------------
function validatePayment() {
  var option = document.querySelector("#payment");   //Get options parent element reference
  var fields = document.querySelectorAll(".payment-info input");  //Get list of each option
  var creditCard = {};                               //Stores the valid state of each credit card field
  var valid = false;

  if (option.selectedIndex !== 0) {                  //If option's selected index is NOT "0" || "creditcard"
    for (var i = 0; i < fields.length; i++) {        //Clear the credit card input fields
      fields[i].value = "";
    }
    return valid = true;                             //set valid to true
  } else {
    for (var i = 0; i < fields.length; i++) {
      valid = validateThisField(fields[i]);          //Loops through and validates credit card fields
      !valid ? showErrorMessage(fields[i]) : removeErrorMessage(fields[i]);   //Shows or removes error message if valid is true / false
      creditCard[fields[i].id] = valid;              //Adds fields to the valid object
    }
    for (var field in creditCard) {
      if (!creditCard[field]) valid = false;         //If any credit card field fails, payment is false
    }
    return valid;                                    //Returns the valid state of payment
  }
}


// -------------------------------------------------------------------------
// VALIDATION HELPER FUNCTIONS
// -------------------------------------------------------------------------
// --- REQUIRED FIELD VALIDATION -------------------------------------------
function isRequired(field) {
  var valid;
  return field.className === "required" ? valid = true : valid = false;
}
// --- VALUE MISSING VALIDATION --------------------------------------------
function valueMissing(field) {
  var valid;
  return (field.value === "") ? valid = true : valid = false;
}


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
}());



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
  }; // checkboxControl function

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
    }
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
  };

  //Control display when payment option is selected
  payment.addEventListener('change', (e) => {
    var option = e.target;
    if (option.value === "credit card") showAndHide(field, 'inherit', 'none', 'none');
    if (option.value === "paypal") showAndHide(field, 'none', 'none', 'inherit');
    if (option.value === "bitcoin") showAndHide(field, 'none', 'inherit', 'none');
  });

}());

// -------------------------------------------------------------------------
// VALIDATION ONSUBMIT / LIVE
// -------------------------------------------------------------------------
// --- LIVE FIELD VALIDATION -----------------------------------------------
(function() {
  const form = document.register;
  const fieldset = document.querySelector('.activities');
  var isFormValid = false;
  var isValid = false;
  var valid = {};

  form.addEventListener('keyup', (e) => {
    var field = e.target;
    if (field.disabled || field.type === 'submit' || field.type === 'button') return;  //Don't validate submits, buttons, and disabled fields
    if (isRequired(field)) {
      isValid = validateThisField(field);
      !isValid ? showErrorMessage(field) : removeErrorMessage(field);
      valid[field.id] = isValid;
    }
    valid.payment = validatePayment();            //Custom validation
  }, true);

  fieldset.addEventListener('change', (e) => {
    valid.activities = validateActivities();      //Custom validation
  }, false);

// --- ON SUBMIT VALIDATION ------------------------------------------------
  form.addEventListener('submit', (e) => {
    e.preventDefault();
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
    !isFormValid ? e.preventDefault() : alert("Yay, this form is complete!");
  });

}());
