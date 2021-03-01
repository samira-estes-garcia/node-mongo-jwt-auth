const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
);

module.exports = User;

//these mongoose models represent users & roles collections in MongoDB database
//User object will have a roles array that contians ids in roles collection as reference
//dont need to write crud functions bc mongo supports all of them! 
//create new user: object.save();
//find a user by id: User.findById(id);
//find a user by email: User.findOne({ email: ... });
//find a user by username: User.findOne({ username:...});
//find all ROles which name in given roles array: Role.find({ name: { $in: roles }});
//these functions will be used in our Controllers and Middlewares

