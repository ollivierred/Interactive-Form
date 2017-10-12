function hideElements(element) {
  element.style.display = "none";
}

function searchForConflicts(thisList, searchValue) {
  let conflicts = [];
  for (let i = 0; i < thisList.length; i++) {
    let content = thisList[i].textContent;
    // console.log(content);
    //Searching list of student names and emails for a match...
    if (content.search(searchValue) > -1) {
      conflicts.push(thisList[i].textContent);
    };
  };
  return conflicts;
} //End of Searching function

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
    hideElements(node[nodeValue]);
  };

  const jobRole = document.querySelector('#title');
  //Show and hide input field for the option "other"
  jobRole.addEventListener('change', function(eventEl, hiddenEl) {
    if (eventEl.value === "other") {
      hiddenEl.style.display = "block";
    } else {
        hiddenEl.style.display = "none";
        hiddenEl.value = "";
    }
  });

  const payment = document.querySelector("#payment");
  //Show and hide input field for the option "other"
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

//”T-Shirt Info” section of the form
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


(function() {
  const fieldset = document.querySelector('.activities');
  const activitiesList = fieldset.querySelectorAll('input[type="checkbox"]');
  const labels = fieldset.querySelectorAll('label');
  const priceDiv = document.createElement('div');
  priceDiv.id = "running-total";
  fieldset.appendChild(priceDiv);

  var runningTotal = 0;

  fieldset.addEventListener('change', function(e) {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const boxName = checkbox.name;
    const boxValue = checkbox.parentNode.textContent;

    //Tracks running total, DON'T TOUCH IT!
    if (checked && boxName === "all") {
      runningTotal += 200;
        console.log("Checked, $" + runningTotal);
        console.log(boxName);
    } else if (!checked && boxName === "all") {
      runningTotal -= 200;
        console.log("Unchecked, $" + runningTotal);
    } else {
      if (checked) {
        runningTotal += 100;
         console.log("Checked, $" + runningTotal);
         console.log(boxName);
      } else if (!checked) {
        runningTotal -= 100;
         console.log("Unchecked, $" + runningTotal);
      }
    }
    priceDiv.innerHTML = '<span>Total: $' + runningTotal +'</span>';
  }); //activities EventListener

  // let list = {
  //   all:
  //   jsFrameworks:
  //   jsLibs:
  //   express:
  //   node:
  //   buildTools:
  //   npm:
  // }

}());


//Conflicts: js-frameworks, express
//           js-libs, node

    //if checked === js-frameworks
      //find express HTML node --> disable express
    //if checked === express
      //find js-frameworks HTML node --> disable js-frameworks

    //if checked === js-libs
      //find node HTML node --> disable node
    //if checked === node
      //find js-libs HTML node --> disable js-libs
