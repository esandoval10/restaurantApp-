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
  {
    "customerName": "Rusty Shackleford",
    "customerEmail": "rustyshack@gmail.com",
    "customerID": "rustyshack",
    "phoneNumber": "123-456-7891"

  }
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
  
app.post("/api/reserve", function(req, res){
  var newReservation = req.body;
  if(reservations.length <= 5) {
    reservations.push(newReservation)
    res.json(true);
  } else {
    waitingList.push(newReservation);
    res.json(false);
  }
})

app.get("/api/tables", function(req, res){
  return res.json(reservations);
})

app.get("/api/waitlist", function(req, res){
  return res.json(waitingList);
})

app.listen(PORT, function(){
  console.log("Listening on port " + PORT);
})