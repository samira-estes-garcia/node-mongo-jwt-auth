const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "https://localhost:8081"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Samira's auth app"});
});

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//import express, body-parser, and cors modules:
//-express is for building REST apis
//-body-parser helps to parse the request and create the req.body object
//-cors provides Express middleware to enable CORS
//create an express app, then add body-parser and cors middleware using app.use() method. Notice that we set the origin: localhost:8081, 
//-define a GET route which is simple for test
//-listen on port 8080 for incoming requests
//run the app with the command: node server.js
//open browser with url http://localhost:8080/ you should see your message