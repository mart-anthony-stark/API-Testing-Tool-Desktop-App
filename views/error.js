const errorOverlay = document.querySelector(".error-overlay");
const errorTxt = document.querySelector("p.error");
const okayBtn = document.querySelector("#close-error");
const { hideEl } = require("./helper");

okayBtn.addEventListener("click", () => {
  hideEl(errorOverlay);
});

const setError = (err) => {
    errorTxt.innerText = err
}
module.exports = { errorOverlay, setError };
