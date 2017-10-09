const jobRole = document.querySelector('#title');
const otherField = document.querySelector('#other-title');
const design = document.querySelector('#design');
const color = document.querySelector('#color');
console.log(design);
console.log(color[1]);
otherField.style.display = "none";

//Show and hide input field for the option "other"
jobRole.addEventListener('change', function() {
  if (jobRole.value === "other") {
    otherField.style.display = "";
  } else {
    otherField.style.display = "none";
  }
});

//Show and hide input field for the option "other"
design.addEventListener('change', function() {
  if (design.value === "js puns") {
    for (let i = 0; i < color.length; i++) {
      console.log('Is looping');
    }
  } else {
    //Code block here
  }
});
