function hideElements(element) {
  element.style.display = "none";
}

function otherField(eventEl, hiddenEl) {
  if (eventEl.value === "other") {
    hiddenEl.style.display = "block";
  } else {
    hiddenEl.style.display = "none";
    hiddenEl.value = "";
  }
}

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
  jobRole.addEventListener('change', function() {
    otherField(jobRole, node.otherField);
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
  let runningTotal = 0;

  const activities = document.querySelector('#activities');
  const priceDiv = document.createElement('div');
  priceDiv.id = "running-total";
  priceDiv.innerHTML =
    '<span>Total: $' + runningTotal +'</span>';
  activities.appendChild(priceDiv);

  activities.addEventListener('change', function(e) {
    const allActivities = 200;
    const oneActivity = 100;
    console.log(e.target);
    if (e.target.checked) {
      runningTotal += 100;
      console.log(e.target.name);
    } else {
      runningTotal -= 100;
    }
  })

}());
