let searchBox = document.getElementById("search-box");

async function loadParks() {
  document.getElementById("results-list").textContent = "Loading…";
  let response = await fetch("https://student-data-api.anastasiaketchersid-757.workers.dev/api/v1/datasets/us-national-parks/records?search=" + searchBox.value);
  console.log("Status: " + response.status);

if (response.status !== 200) {
  document.getElementById("results-list").textContent = "Something went wrong.";
  return;
}

  let data = await response.json();
  let parks = data.records;
  if (parks.length === 0) {
  document.getElementById("results-list").textContent = "Nothing matched.";
} else {
  console.log("Records: " + parks.length);
  
  let park = parks[0];

  let lines = parks.map(function (park) {
  return "• " + park.Name + " is located in " + park.Location + ".";
});

  document.getElementById("results-list").textContent = lines.join(" ");
 }
}

let goButton = document.getElementById("go-button");

goButton.addEventListener("click", function () {
  loadParks();
});