const historyListCont = document.querySelector("#history-list");
const urlInput = document.querySelector("#url");
const sendBtn = document.querySelector("#sendBtn");
const history = localStorage.getItem("history");

const loader = document.querySelector(
  "body > main > div.response-container > div.loader"
);

if (!history || history.length == 0) {
  historyListCont.innerHTML = "<h3>No request made yet</h3>";
}

const getData = async (
  method,
  url,
  body = {},
  headers = {
    "Content-Type": "application/json",
  }
) => {
  loader.style.display = "block";

  const res = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  console.log(data);
  loader.style.display = "none";
};

sendBtn.addEventListener("click", (e) => {
  const req = {
    url: urlInput.value,
    method: "get",
  };
});
