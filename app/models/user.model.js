const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schemaa({
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