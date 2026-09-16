// Get the search input and result count from the page
let searchBox = document.getElementById("search-box");
let resultCount = document.getElementById("result-count");
let stateBox = document.getElementById("state-box");

// Fun facts for some national parks
let funFacts = {
  "Yellowstone": "Yellowstone was the first national park in the world.",
  "Grand Canyon": "The Grand Canyon was carved by the Colorado River.",
  "Yosemite": "Yosemite is famous for its giant granite cliffs.",
  "Acadia": "Acadia is the first national park east of the Mississippi River.",
  "Zion": "Zion is known for its huge sandstone cliffs.",
  "Bryce Canyon": "Bryce Canyon is famous for its colorful hoodoos."
};

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
  console.log(park.Name);


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
	// add a fun fact if the park is in the fun facts list 
	"<p><strong>Fun Fact:</strong> " + (funFacts[park.Name] || "Every national park has something special to discover.") + "</p>" +
    "</div>";
});
 
 // Put the park cards on the page
 document.getElementById("results-list").innerHTML = lines.join("");
 }
} 

// Search by national parks by state 
async function loadParksByState() {
  // Send request to the API using the state search value
  let response = await fetch("https://student-data-api.anastasiaketchersid-757.workers.dev/api/v1/datasets/us-national-parks/records?search=" + stateBox.value + "&limit=" + resultCount.value);
  // convert the response to JSON 
  let data = await response.json();
  //Get the records from the response
  let parks = data.records;
  // Show message if no parks were found
  if (parks.length === 0) {
    document.getElementById("results-list").textContent = "Nothing matched.";
    return;
  }
  // Create a card for each park found by state 
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
  // putt the state search result on the page 
  document.getElementById("results-list").innerHTML = lines.join("");
}


// Get the Search button 
let goButton = document.getElementById("go-button");

let stateButton = document.getElementById("state-button");

// Run loadParks when the Search button is clicked
goButton.addEventListener("click", function () {
  loadParks();
});

// Run laodParksByState when the state button is clicked 
stateButton.addEventListener("click", function () {
  loadParksByState();
});


// Get the Random Park button 
let randomButton = document.getElementById("random-button");

// Get and display a random national park when the button is clicked
randomButton.addEventListener("click", async function () {
  // Get all national parks from the API	
  let response = await fetch("https://student-data-api.anastasiaketchersid-757.workers.dev/api/v1/datasets/us-national-parks/records?limit=67");
  // Convert the response to JSON
  let data = await response.json();
  // Get the records from the response
  let parks = data.records;
  // Create a random number based on the number of parks
  let randomNumber = Math.floor(Math.random() * parks.length);
  // Select the park at the random position 
  let park = parks[randomNumber];
  // Display the random park on the page 
  document.getElementById("random-park").innerHTML =
  "<div class=\"card\">" +
  "<img src=\"" + park.Image + "\" alt=\"" + park.Name + "\">" +
  "<h3>" + park.Name + "</h3>" +
  "<p>Location: " + park.Location + "</p>" +
  "<p>Area: " + park["Area in acres"] + " acres</p>" +
  "</div>";
});