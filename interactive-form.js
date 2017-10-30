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
// CHARACTER COOUNTER FUNCTIONS
// -------------------------------------------------------------------------
// --- CREATE COUNT CONTAINER FUNCTION -------------------------------------
(function createCountContainer() {
  var paymentLabels = document.querySelectorAll(".payment-info input");
  var cc = document.querySelector('#credit-card');
  var maxLength = 0;
  var count = 0;

  // for (var i = 0; i < paymentLabels.length; i += 1) {
  //   var countContainer = document.createElement('span');
  //       countContainer.className = "counter";
  //   if (paymentLabels[i].id === "cc-num") maxLength = 16;
  //   if (paymentLabels[i].id === "zip") maxLength = 5;
  //   if (paymentLabels[i].id === "cvv") maxLength = 3;
  //   paymentLabels[i].previousElementSibling.appendChild(countContainer);
  // }

  paymentLabels.forEach(function(label) {
    var countContainer = document.createElement('span');
    countContainer.className = "counter";
    if (label.id === "cc-num") maxLength = 16;
    if (label.id === "zip") maxLength = 5;
    if (label.id === "cvv") maxLength = 3;
    label.previousElementSibling.appendChild(countContainer);
  });
  
}());

// --- COUNTER FUNCTION ----------------------------------------------------
(function counter() {
  const creditCard = document.querySelector('#cc-num');
  const zip = document.querySelector('#zip');
  const cvv = document.querySelector('#cvv');

  creditCard.addEventListener('input', function() {
    var $countContainer = $('label[for="cc-num"]').children('span');
    $countContainer.text(this.value.length + "/16");
  })
  zip.addEventListener('input', function() {
    var $countContainer = $('label[for="zip"]').children('span');
    $countContainer.text(this.value.length + "/5");
  })
  cvv.addEventListener('input', function() {
    var $countContainer = $('label[for="cvv"]').children('span');
    $countContainer.text(this.value.length + "/3");
  })

}());


// -------------------------------------------------------------------------
// T-SHIRT INFO FUNCTION
// -------------------------------------------------------------------------

(function() {
  const design = document.querySelector('#design'); //
  const color = document.querySelector('#color');   //
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
      var options = '<option value="default" selected>Select a Color</option>';

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
    });

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
  function showAndHide(field, creditCard, bitcoin, paypal) {    // Show or Hide option helper function
    field.creditCard.style.display = creditCard;
    field.bitcoin.style.display = bitcoin;
    field.paypal.style.display = paypal;
  };

  var field = {
    otherField: document.querySelector('#other-title'),
    creditCard: document.querySelector("#credit-card"),
    paypal: document.querySelector("#paypal"),
    bitcoin: document.querySelector("#bitcoin")
  }                                                     // Holds the list of elements to be hidden

  const title = document.querySelector('#title');       // Retrieve reference to job role options
  const payment = document.querySelector("#payment");   // Reference to parent div
  var $cardFields = $('#credit-card input');            // All input fields in credit card div

  for (var el in field) {
    field[el].style.display = "none";
  };                                                    // Hides all fields stored in the above object "field"
  
    field.creditCard.style.display = 'inherit';         // Credit-card shows by default
    $cardFields.addClass("required");

  // --- JOB TITLE EVENT LISTENER ----------------------------------------------
  title.addEventListener('change', function(e) {        // Show and hide input field for the option "other"
    if (this.value === "other") {
      field.otherField.style.display = "inherit";       // If option is other, show hidden input field
    } else {
      field.otherField.style.display = "none";
      field.otherField.value = "";                      // If option is changed, hide the input field
    }
  });

  // --- PAYMENT EVENT LISTENER ----------------------------------------------
  payment.addEventListener('change', function() {       // Control display when payment option is selected
    if (this.value === "credit card") {                 // If option is credit card
      showAndHide(field, 'inherit', 'none', 'none');    // Show card fields
      $cardFields.addClass("required");                 // Add class required to card fields
    }
    if (this.value === "paypal") {                      // If option is paypal
      showAndHide(field, 'none', 'none', 'inherit');    // Show paypal container
      $cardFields.val("");                              // Reset card field content
      $cardFields.removeClass("required");              // Remove the class required
    }
    if (this.value === "bitcoin") {                     // If option is bitcoin
      showAndHide(field, 'none', 'inherit', 'none');    // Show bitcoin container
      $cardFields.val("");                              // Reset card field content
      $cardFields.removeClass("required");              // Remove the class required
    }
  });

}());

// -------------------------------------------------------------------------
// VALIDATION HELPER FUNCTIONS
// -------------------------------------------------------------------------
// --- REQUIRED FIELD VALIDATION -------------------------------------------
function isRequired(field) {
  var valid;
  return field.className === "required" ? valid = true : valid = false;   // If has class required result true, else false. return result
}
// --- VALUE MISSING VALIDATION --------------------------------------------
function valueMissing(field) {
  var valid;
  return (field.value === "") ? valid = true : valid = false;   // If value is missing result true, else false. return result
}


// -------------------------------------------------------------------------
// VALIDATES FIELDS DYNAMICALLY BY ID
// -------------------------------------------------------------------------
// --- VALIDATION LIST OBJECT ----------------------------------------------
var validate = {
  "name": function(field, value) {                  // Validates name
    var valid = /^[a-zA-Z ]{2,30}$/.test(value);    // Letters, 2-30 maximum
    if (!valid) setErrorMessage(field, "Enter your first and last " + field.id + ". No special characters allowed");
    return valid;
  },
  "email": function(field, value) {                 // Validates email
    var valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i.test(value); //
    if (!valid) setErrorMessage(field, "Enter a valid " + field.id + " format: jane@doe.com");
    return valid;
  },
  "cc-num": function(field, value) {                // Validates credit card number
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
  var checklist = document.querySelectorAll('.activities input'); //List of all activities
  var valid = false;
  var isChecked = 0;

  for (var i = 0; i < checklist.length; i += 1) {       //Loops through list of checkboxes and count if any checked
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
function validatePayment(field) {
  var id = field.id,  value = field.value,  valid = false,  creditCard = {};   //Stores the valid state of each credit card field 

  valid = validate[id](field, value);                //Loops through and validates credit card fields
  !valid ? showErrorMessage(field) : removeErrorMessage(field);   //Shows or removes error message if valid is true / false
  
  creditCard[field.id] = valid;                      //Adds fields to the valid object

  for (var field in creditCard) {
    if (!creditCard[field]) valid = false;           //If any credit card field fails, payment is false
  }
  return valid;                                      //Returns the valid state of payment
}


// -------------------------------------------------------------------------
// ONSUBMIT / LIVE VALIDATION 
// -------------------------------------------------------------------------
// --- LIVE FIELD VALIDATION -----------------------------------------------
(function() {
  const form = document.register;
  const fieldset = document.querySelector('.activities');
  var option = document.querySelector("#payment");           //Get options parent element reference
  var creditCard = document.querySelector("#credit-card");   //Get list of each option
  
  var isFormValid = false;
  var isValid = false;
  var valid = {};

  form.addEventListener('keyup', (e) => {
    var field = e.target;
    if (field.disabled || 
        field.type === 'submit' || 
        field.type === 'button') return;              //Don't validate submits, buttons, and disabled fields
    if (!isRequired(field)) return;                   //Don't validate a field if there is no required class attribute

    isValid = validateThisField(field);
    !isValid ? showErrorMessage(field) : removeErrorMessage(field);
    valid[field.id] = isValid;
  }, false);

  fieldset.addEventListener('change', (e) => {        //Activities event listener
    valid.activities = validateActivities();          //Custom validation
  }, false);

  option.addEventListener('change', (e) => {          //Event listener for payment option selection
    if (e.target.selectedIndex !== 0) {
      isValid = true;
      valid.payment = isValid;
    }
  }, false);

  creditCard.addEventListener('input', (e) => {       //Event listener for credit card fields
      var field = e.target;
      valid.payment = validatePayment(field);         //Custom validation
  }, false);                                          //If option's selected index is NOT "0" || "creditcard"

  // console.log(valid);

// --- ON SUBMIT VALIDATION ------------------------------------------------
  form.addEventListener('submit', (e) => {
    var valid = {};
    for (var i = 0; i < form.length; i += 1) {
      var field = form[i];
      if (isRequired(field)) {
        isValid = validateThisField(field);
        !isValid ? showErrorMessage(field) : removeErrorMessage(field);
        valid[field.id] = isValid;
      }
    }
    
    valid.activities = validateActivities();          //Custom validation
    // console.log(valid);

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
