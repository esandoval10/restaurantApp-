// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Reservations (DATA)
// =============================================================
var reservations = [

];

var waitingList = [

];

// Routes
// =============================================================

// Basic route that sends the user first to the home Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
  
app.get("/make", function(req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
  });

app.get("/view", function(req, res){
    res.sendFile(path.join(__dirname, "view.html"));
  })
  
  // Displays all characters
  app.get("/api/characters", function(req, res) {
    return res.json(characters);
  });
  
  // Displays a single character, or returns false
  app.get("/api/characters/:character", function(req, res) {
    var chosen = req.params.character;
  
    console.log(chosen);
  
    for (var i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
        return res.json(characters[i]);
      }
    }
  
    return res.json(false);
  });
  








app.post("/api/reservations", function(req, res){
  var newReservation = req.body;
  if(reservations.length <= 5) {
    alert("You've been added to the reservation list")
    reservations.push(newReservation)
    res.json(newReservation);
  } else {
    alert("You've been added to the wait list");
    waitlist.push(newReservation);
  }
})

app.get("/api/reservations", function(req, res){
  return res.json(reservations);

})

app.get("/api/waitlist", function(req, res){
  return res.json(waitlist);
})

app.listen(port, function(){
  console.log("Listening on port " + port);
})