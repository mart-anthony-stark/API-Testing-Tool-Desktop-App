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

sendBtn.addEventListener("click", (e) => {
  if (urlInput.value.length === 0) {
    console.log("Invalid url");
    return;
  }

  const req = {
    url: urlInput.value,
    method: "get",
    body: bodyInput.value,
  };
  req.body = req.body.replaceAll(/\\"/g, '"');
  console.log(req);
});

// const getData = async (
//   method,
//   url,
//   body = {},
//   headers = {
//     "Content-Type": "application/json",
//   }
// ) => {
//   loader.style.display = "block";

//   const res = await fetch(url, {
//     method,
//     headers,
//     body: JSON.stringify(body),
//   });
//   const data = await res.json();
//   console.log(data);
//   loader.style.display = "none";
// };
