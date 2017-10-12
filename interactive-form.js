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

  //Show and hide input field for the option "other"
  const payment = document.querySelector("#payment");
  payment.addEventListener('change', function() {
    let value = payment.value;
    console.log(value);
      if (value.style === 'display', 'block') {
        value.style = 'display', 'none';
      }
        if (value === "credit card") {
          node.creditCard.style.display = 'block';
          node.paypal.style.display = 'none';
          node.bitcoin.style.display = 'none';
        } else if (value === "paypal") {
            node.paypal.style.display = 'block';
            node.creditCard.style.display = 'none';
            node.bitcoin.style.display = 'none';
        } else if (value === "bitcoin") {
            node.bitcoin.style.display = 'block';
            node.paypal.style.display = 'none';
            node.creditCard.style.display = 'none';
        } else {
          node.bitcoin.style.display = 'none';
          node.paypal.style.display = 'none';
          node.creditCard.style.display = 'none';
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
  const activitiesList = fieldset.querySelectorAll('input[type="checkbox"]');
  const labels = fieldset.querySelectorAll('label');
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
