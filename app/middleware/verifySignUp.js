const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //username
    User.findOne({
        username: req.body.username
    }).exec((err,user) => {
        if (err) {
            res.status(500).send({ message: err });
        }
    })
}



//to verify a signup action we need two functions:
//-check for duplicates for username and email
//-check if roles in the request is legal or not
