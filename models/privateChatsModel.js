let mongoose = require("mongoose");

let privateChatsScheme = mongoose.Schema({
    from: String,
    to: String,
    forwardedFrom: String,

    content: String,
    media: String,

    reactions: Array,
    seen: Array,

    dateTime: Number
})

let privateChatsModel = new mongoose.model("privateChats", privateChatsScheme);

module.exports = privateChatsModel;

