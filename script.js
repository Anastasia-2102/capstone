let searchBox = document.getElementById("search-box");
let goButton = document.getElementById("go-button");

goButton.addEventListener("click", function () {
  document.getElementById("results-list").textContent = searchBox.value;
});