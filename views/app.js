const historyListCont = document.querySelector("#history-list");
const urlInput = document.querySelector("#url");
const sendBtn = document.querySelector("#sendBtn");
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

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

sendBtn.addEventListener("click", (e) => {
  const method = document.querySelector("#request-method").value.toLowerCase();
  const isValid = validateUrl(urlInput.value);

  console.log(isValid);
  if (!isValid) {
    console.log("Invalid url");
    return;
  }
  let json;
  console.log(method);
  if (method != "get") json = JSON.parse(bodyInput.value);

  const req = {
    url: urlInput.value,
    method,
    body: json,
    headers: { "Content-Type": "application/json" },
  };

  getData(req);
});

const getData = async ({ method, url, body, headers }) => {
  loader.style.display = "block";

  try {
    const res =
      method != "get"
        ? await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body),
          })
        : await fetch(url, {
            method,
            headers,
          });
    const data = await res.text();
    console.log(res);
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  loader.style.display = "none";
};
