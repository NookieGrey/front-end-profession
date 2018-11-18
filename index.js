const form = document.getElementById("form");
const template = document.getElementById("result-template").querySelector(".result-row");
const resultContainer = document.getElementById("results");

form.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const searchQuery = event.target.elements.query.value || "GDG";

  makeRequest(searchQuery);
}

function makeRequest(searchQuery) {
  const API_KEY = "AIzaSyD21zAUiEOASgPFg1WcQRqmrEJ3lkT4tl0";
  const ENGINE_ID = "008352208444969352903:hueghfwucug";

  fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${ENGINE_ID}&q=${searchQuery}`)
    .then(response => response.json())
    .then(response => {
      resultContainer.innerHTML = "";

      response.items.forEach(insertRow);
    });
}

function insertRow(item) {
  const row = template.cloneNode(true);

  const title = row.querySelector(".result-title");
  title.innerHTML = item.htmlTitle;
  title.href = item.link;

  const url = row.querySelector(".result-url");
  url.innerHTML = item.htmlFormattedUrl;

  const description = row.querySelector(".result-description");
  description.innerHTML = item.htmlSnippet;

  resultContainer.appendChild(row);
}