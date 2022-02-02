const { validateUrl, hideEl, showEl } = require("./helper");
const { errorOverlay, setError } = require("./error");
const historyListCont = document.querySelector("#history-list");
const urlInput = document.querySelector("#url");
const sendBtn = document.querySelector("#sendBtn");
const resultDiv = document.querySelector("#Result");

const bodyInput = document.querySelector(
  "body > main > div.request-container > div > textarea"
);

const loader = document.querySelector(
  "body > main > div.response-container > div.loader"
);

const history = localStorage.getItem("history");
if (!history || history.length == 0) {
  historyListCont.innerHTML = "<p>No request made yet</p>";
}

const sendRequest = (e) => {
  const method = document.querySelector("#request-method").value.toLowerCase();
  let isValid = validateUrl(urlInput.value);
  if (urlInput.value.length === 0) {
    isValid = false;
  }

  if (!isValid) {
    setError("Invalid Url");
    showEl(errorOverlay);
    return;
  }
  let json;
  try {
    if (method != "get" && bodyInput.value.length !== 0)
      json = JSON.parse(bodyInput.value);
  } catch (e) {
    resultDiv.innerHTML = ``;
  }

  const req = {
    url: urlInput.value,
    method,
    body: json,
    headers: { "Content-Type": "application/json" },
  };

  getData(req);
};

const getData = async ({ method, url, body, headers }) => {
  loader.style.display = "block";

  try {
    const res =
      method != "get"
        ? await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body),
            credentials: "include",
          })
        : await fetch(url, {
            method,
            headers,
            credentials: "include",
          });
    const contentType = res.headers.get("content-type");
    console.log(contentType);
    const data =
      contentType === "application/json; charset=utf-8"
        ? await res.json()
        : await res.text();

    const preview =
      contentType === "application/json; charset=utf-8"
        ? JSON.stringify(data, null, 4)
        : data;

    resultDiv.innerHTML = preview;
  } catch (error) {
    console.log(error);
    resultDiv.innerHTML = `
      <div class="error">${error}</div>
    `;
  }

  loader.style.display = "none";
};

sendBtn.addEventListener("click", sendRequest);
