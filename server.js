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
  var jsonArr = [];
  var newReservation = req.body;
  if(reservations.length <= 5) {
    reservations.push(newReservation)
    var message = {message: "You've been added to the reservations list."}
    res.json(message);
  } else {
    waitingList.push(newReservation);
    var message = {message: "You've been added to the waiting list."}
    res.json(message);
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