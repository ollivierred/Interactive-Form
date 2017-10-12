function hideElements(element) {
  element.style.display = "none";
}

// function otherField(eventEl, hiddenEl) {
//   if (eventEl.value === "other") {
//     hiddenEl.style.display = "block";
//   } else {
//     hiddenEl.style.display = "none";
//     hiddenEl.value = "";
//   }
// }

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
  const priceDiv = document.createElement('div');
  priceDiv.id = "running-total";
  fieldset.appendChild(priceDiv);

  let runningTotal = 0;
  fieldset.addEventListener('change', function(e) {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const boxName = checkbox.name;
    const boxValue = checkbox.parentNode.textContent;
    console.log(checkbox);
    console.log(checked);
    console.log(boxName);
    console.log(boxValue);

    function checkActivities(name, day, time, price) {
      this.name = name;
      this.day = day;
      this.time = time;
      this.price = price;
    }
    let jsFrameworks = new checkActivities('js-frameworks', 'Tuesday', '9am-12pm', 100);
    let jsLibs = new checkActivities('js-libs', 'Tuesday', '1pm-4pm', 100);
    let express = new checkActivities('express', 'Tuesday', '9am-12pm', 100);
    let node = new checkActivities('node', 'Tuesday', '1pm-4pm', 100);

    console.log(jsFrameworks.name, jsFrameworks.day, jsFrameworks.time, jsFrameworks.price);


    if (checked && boxName !== "all") {
      runningTotal += 100;
      console.log("Price is $" + runningTotal + " dollars " );
    } else {
      runningTotal -= 100;
      console.log("Price is $" + runningTotal + " dollars " );
    }

    if (checked && boxName === "all") {
      runningTotal += 200;
      console.log("Price is $" + runningTotal + " dollars " );
    }




      // if (checked) {
      //   runningTotal += 100;
      //   console.log("Price is $" + runningTotal + " dollars " );
      // } else {
      //   runningTotal -= 100;
      //   console.log("Price is $" + runningTotal + " dollars " );
      // }

        // if (eventName !== "all") {
        //    = areChecked * 100;
        // } else {
        //   runningTotal = (areChecked * 100) + 100;
        // };

          // priceDiv.innerHTML = '<span>Total: $' + runningTotal +'</span>';
  }); //activities EventListener

}());


// for (let i = 0; i < activitiesList.length; i++) {
//   activitiesList[3].disabled = true;
// }

//Conflicts: js-frameworks, express
//           js-libs, node
// function disableCheckbox(checkedEventName, conflictEven) {
//   if (checkedEvent.checked === false) {
//     for (let i = 0; i < activitiesList.length; i++) {
//       activitiesList[i].disabled = false;
//     }
//   } else {
//     if (checkedEvent.name === 'js-frameworks') {
//     //  retrieve its conflict, conflict.disabled = true;
//    } else if (checkedEvent.name === 'express') {
//         activitiesList[1].disabled = true;
//     }
//   }
//
//  //if checkedEventName === 'js-libs'
//     //Disable: node[4]
//  //else if checkedEventName === 'node'
//     //Disable: js-libs[2]
// }
