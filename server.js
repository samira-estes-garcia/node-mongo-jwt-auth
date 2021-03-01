const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
    origin: "https://localhost:8081"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//add the following code to open Mongoose connection to MongoDB database;
const db = require('./app/models')
const Role = db.role;

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to MongoDB!");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Samira's auth app"});
});

//more routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//initial function
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                
                console.log("added 'user' to roles collection")
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}




//import express, body-parser, and cors modules:
//-express is for building REST apis
//-body-parser helps to parse the request and create the req.body object
//-cors provides Express middleware to enable CORS
//create an express app, then add body-parser and cors middleware using app.use() method. Notice that we set the origin: localhost:8081, 
//-define a GET route which is simple for test
//-listen on port 8080 for incoming requests
//run the app with the command: node server.js
//open browser with url http://localhost:8080/ you should see your message