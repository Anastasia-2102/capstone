// Get the search input and result count from the page
let searchBox = document.getElementById("search-box");
let resultCount = document.getElementById("result-count");

async function loadParks() {
  // Show a loading message
  document.getElementById("results-list").textContent = "Loading…";
  
  // Send a request to the API with the search value and result limit
  let response = await fetch("https://student-data-api.anastasiaketchersid-757.workers.dev/api/v1/datasets/us-national-parks/records?search=" + searchBox.value + "&limit=" + resultCount.value);
  
  // Show the response status in the console
  console.log("Status: " + response.status);

  // Show an error message if the request was not successful
  if (response.status !== 200) {
  document.getElementById("results-list").textContent = "Something went wrong.";
  return;
}


  // Convert the response to JSON
  let data = await response.json();
  
  // Get the records from the response
  let parks = data.records;
  
  // Check if the API returned any parks
  if (parks.length === 0) {
  document.getElementById("results-list").textContent = "Nothing matched.";
} else {
	
  // Show the number of records in the console
  console.log("Records: " + parks.length);
  
  let park = parks[0];


  // Create a card for each national park
  let lines = parks.map(function (park) {
  return "<div class=\"card\">" +
    "<img src=\"" + park.Image + "\" alt=\"" + park.Name + "\">" +
    "<h3>" + park.Name + "</h3>" +
    "<p>Location: " + park.Location + "</p>" +
	"<p>Established: " + park["Date established"] + "</p>" +
    "<p>Area: " + park["Area in acres"] + " acres</p>" +
    "<p>Visitors in 2019: " + park["Recreation visitors in 2019"] + "</p>" +
    "<p>" + park.Description + "</p>" +
    "</div>";
});
 
 // Put the park cards on the page
 document.getElementById("results-list").innerHTML = lines.join("");
 }
} 

// Get the Search button 
let goButton = document.getElementById("go-button");

// Run loadParks when the Search button is clicked
goButton.addEventListener("click", function () {
  loadParks();
});

let randomButton = document.getElementById("random-button");

randomButton.addEventListener("click", async function () {
  let response = await fetch("https://student-data-api.anastasiaketchersid-757.workers.dev/api/v1/datasets/us-national-parks/records?limit=67");

  let data = await response.json();

  let parks = data.records;

  let randomNumber = Math.floor(Math.random() * parks.length);

  let park = parks[randomNumber];

  document.getElementById("random-park").innerHTML =
  "<div class=\"card\">" +
  "<img src=\"" + park.Image + "\" alt=\"" + park.Name + "\">" +
  "<h3>" + park.Name + "</h3>" +
  "<p>Location: " + park.Location + "</p>" +
  "<p>Area: " + park["Area in acres"] + " acres</p>" +
  "</div>";
});