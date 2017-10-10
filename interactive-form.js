function hideElements(element) {
  element.style.display = "none";
}

function showElements(eventEl, hiddenEl) {
  if (eventEl.value === "other") {
    hiddenEl.style.display = "";
  } else {
    hiddenEl.style.display = "none";
  }
}

const jobRole = document.querySelector('#title');
const otherField = document.querySelector('#other-title');
hideElements(otherField);

const payment = document.querySelector("#payment");
const creditCard = document.querySelector("#credit-card");
hideElements(creditCard);
const paypal = document.querySelector("#paypal");
hideElements(paypal);
const bitcoin = document.querySelector("#bitcoin");
hideElements(bitcoin);

//Show and hide input field for the option "other"
jobRole.addEventListener('change', function() {
  showElements(jobRole, otherField);
});

//Show and hide input field for the option "other"
payment.addEventListener('change', function() {
  if (payment.value === "credit card") {
    creditCard.style.display = "block";
  } else if (payment.value === "paypal") {
    paypal.style.display = "block";
  } else if (payment.value === "bitcoin") {
    bitcoin.style.display = "block";
  } else {
    creditCard.style.display = "none";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
  }
});




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
