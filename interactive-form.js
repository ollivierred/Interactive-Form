// -------------------------------------------------------------------------
// A) FUNCTIONS TO SET / GET / SHOW / REMOVE ERROR MESSAGES
// -------------------------------------------------------------------------

var errorMessage = {};
function setErrorMessage(field, message) {
  errorMessage.field = field;
  errorMessage.message = message;
};

function showErrorMessage() {
  // Create error message element
  var $ref = $(errorMessage.field);
  var message = errorMessage.message;
  var $errorContainer = $ref.parent().children('span');
  console.log($errorContainer.length);

  if (!$errorContainer.length) {
    $errorContainer = $('<span class="error at_" "aria-live", "polite"></span>').insertAfter($ref);
  }
    $errorContainer.text(message);
};

function removeErrorMessage() {
  var $ref = $(errorMessage.field);
  var $errorContainer = $ref.parent().children('.error');
  console.log($errorContainer.length);
  $errorContainer.remove();
};

// -------------------------------------------------------------------------
// A) OBJECT FOR VALIDATION BY ID NAME
// -------------------------------------------------------------------------

var validate = {
  "name": function(field, value) {
    var valid = /^[a-zA-Z ]{2,30}$/.test(value);
    if (!valid) {
      setErrorMessage(field, "Enter a valid " + field.id + ". Special characters are not allowed");
      // showErrorMessage();
    }
    return valid;
  },
  "email": function(field, value) {
    var valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
    if (!valid) {
      setErrorMessage(field, "Enter a valid " + field.id + " address: jane@doe.com");
      // showErrorMessage();
    }
    return valid;
  },
  "cc-num": function(field, value) {
    var valid = /^(?:\d[ -]*?){13,16}$/.test(value);
    if (!valid) {
      setErrorMessage(field, "Must be a 13-16 digit number " + value.length + "/16");
      // showErrorMessage();
    }
    return valid;
  },
  "zip": function(field, value) {
    var valid = /^\d{5}$/.test(value);
    if (!valid) {
      setErrorMessage(field, "Must be a 5-digit number " + value.length + "/5");
      // showErrorMessage();
    }
    return valid;
  },
  "cvv": function(field, value) {
    var valid = /^\d{3}$/.test(value);
    if (!valid) {
      setErrorMessage(field, "Must be a 3-digit number " + value.length + "/3");
      // showErrorMessage();
    }
    return valid;
  }
}//End of object
function validateThisField(field) {
  var id = field.id, type = field.type, value = field.value;
  var valid = false; //Flag is set to false

  if (valueMissing(field)) {
    //Sets error message for fields that are empty
    setErrorMessage(field, "This field, " + id + " is required");
    showErrorMessage();
  } else {
    //Match the value and its validation function based on "id"
    // removeErrorMessage();
    valid = validate[id](field, value);
  }
  return valid;
}

// -------------------------------------------------------------------------
// D) FUNCTIONS TO SET / GET / SHOW / REMOVE ERROR MESSAGES
// -------------------------------------------------------------------------
//Custom validat functions
function validateActivities() {
  var fieldset = document.querySelector('.activities');
  var checklist = document.querySelectorAll('.activities input');
  console.log(fieldset);
  var isChecked = 0;
  var valid = false;
  for (let i = 0; i < checklist.length; i++) {
    //Counts all checked boxes
    if (checklist[i].checked) {
      isChecked++
    }
  }
  isChecked > 0 ? valid = true : valid = false;
  if (!valid) {
    setErrorMessage(fieldset, "Select at least one activity");
    showErrorMessage();
  }
  return valid;
}
function validatePayment() {
  var payment = document.querySelector("#payment");
  var paymentFields = {};
  var valid = false;

  if (payment.selectedIndex !== 0) {
    return valid = true;
  } else {
    var fields = document.querySelectorAll(".payment-info input");
    for (var i = 0; i < fields.length; i++) {
       valid = validateThisField(fields[i]);
       paymentFields[fields[i].id] = valid;
    }
    return paymentFields;
  }
}

// -------------------------------------------------------------------------
// D) FUNCTIONS TO SET / GET / SHOW / REMOVE ERROR MESSAGES
// -------------------------------------------------------------------------
//validation helper functions
function isRequired(field) {
  var valid;
  return field.className === "required" ? valid = true : valid = false;
}//End of required validation
function valueMissing(field) {
  var valid;
  return (field.value === "") ? valid = true : valid = false;
}

// -------------------------------------------------------------------------
// D) FUNCTIONS TO SET / GET / SHOW / REMOVE ERROR MESSAGES
// -------------------------------------------------------------------------
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

// -------------------------------------------------------------------------
// D) ACTIVITIES FUNCTION
// -------------------------------------------------------------------------
// Activities function...
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

// -------------------------------------------------------------------------
// D) PAYMENT AND JOB ROLE FUNCTION
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

  //Helper function add required class
  // function addRequiredClass(elements) {
  //   //Give input fields the class "required"
  //   for (let i = 0; i < elements.length; i++) {
  //     elements[i].setAttribute("class", "required");
  //   }
  // }
  //Helper function remove required class
  // function removeRequiredClass(elements) {
  //   //Give input fields the class "required"
  //   for (let i = 0; i < elements.length; i++) {
  //     if (elements[i].hasAttribute("class")) elements[i].removeAttribute("class");
  //   }
  // }

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
// D) VALIDATION ONSUBMIT / LIVE
// -------------------------------------------------------------------------

(function() {
  const form = document.register;
  var isFormValid = false;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    var valid = {}, isValid = false;
    for (let i = 0; i < form.length; i++) {
      var field = form[i];
      if (isRequired(field)) {
        isValid = validateThisField(field);
        !isValid ? showErrorMessage() : removeErrorMessage();
        valid[field.id] = isValid;
      }

    }
    //Custom validation
    valid.activities = validateActivities();
    valid.payment = validatePayment();
    console.log(valid);

    if (!isFormValid) {
      e.preventDefault();
    }
  });

}());
