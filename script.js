let searchBox = document.getElementById("search-box");

async function loadParks() {
  let response = await fetch("https://student-data-api.anastasiaketchersid-757.workers.dev/api/v1/datasets/us-national-parks/records?search=" + searchBox.value);
  console.log("Status: " + response.status);

  let data = await response.json();
  let parks = data.records;
  console.log("Records: " + parks.length);
}

let goButton = document.getElementById("go-button");

goButton.addEventListener("click", function () {
  loadParks();
});