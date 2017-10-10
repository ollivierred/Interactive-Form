const jobRole = document.querySelector('#title');
const otherField = document.querySelector('#other-title');
otherField.style.display = "none";

//Show and hide input field for the option "other"
jobRole.addEventListener('change', function() {
  if (jobRole.value === "other") {
    otherField.style.display = "";
  } else {
    otherField.style.display = "none";
  }
});

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

console.log(design);
console.log(color[1]);
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
  }); //design option EventListener
}()); //Immediately invoked function
