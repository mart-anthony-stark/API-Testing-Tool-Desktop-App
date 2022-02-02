const errorOverlay = document.querySelector(".error-overlay");
const errorTxt = document.querySelector("p.error");
const okayBtn = document.querySelector("#close-error");
const { hideEl } = require("./helper");

okayBtn.addEventListener("click", () => {
  hideEl(errorOverlay);
});
module.exports = { errorOverlay, errorTxt };
