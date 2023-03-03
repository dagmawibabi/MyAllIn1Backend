let mongoose = require("mongoose");

let communityChatsScheme = mongoose.Schema({
    from: String,
    community: String,
    forwardedFrom: String,

    content: String,
    media: String,

    reactions: Array,
    seen: Array,

    dateTime: Number
})

let communityChatsModel = new mongoose.model("communityChats", communityChatsScheme);

module.exports = communityChatsModel;

