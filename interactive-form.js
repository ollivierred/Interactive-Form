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
})
