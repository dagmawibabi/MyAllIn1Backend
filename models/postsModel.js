let mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

let postsScheme = new mongoose.Schema({
    fullname: String,
    username: String,
    content: String,

    likes: Number,
    comments: Number,
    reposts: Number,

    likers: Array,
    commenters: Array,
    reposters: Array,

    tags: Array,
    reports: Array,
    
    hidden: Boolean,

    time: Number,
})

let postsModel = new mongoose.model("posts", postsScheme);

module.exports = postsModel;
