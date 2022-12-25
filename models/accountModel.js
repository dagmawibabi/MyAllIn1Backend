let mongoose = require("mongoose");

let accountSchema = new mongoose.Schema({
    "fullname": String,
    "username": String,
    "password": String,
    "profilepic": String,
    "posts": Number,
    "followers": Number,
    "following": Number,
    "phone": String,
    "email": String,
    "bio": String,
})

let accountModel = new mongoose.model("accounts", accountSchema);

module.exports = accountModel;