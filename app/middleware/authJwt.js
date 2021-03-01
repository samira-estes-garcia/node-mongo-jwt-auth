const jwt = require('jsonwebtoken');
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) { 
        return res.status(403).send({ message: "No token provieed! "});
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: unauthorized });
        }
        req.userId = decoded.id;
        next();
    });
};




//to process authentication and auth we create the following functions:
//-check if token is provided, legal or not. we get token from x-access-token of HTTP headers, then use jsonwebtoken's verify() function
//-check if roles of the user contains required role or not

