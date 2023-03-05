let mongoose = require("mongoose");

let postsScheme = new mongoose.Schema({
    fullname: String,
    username: String,
    isByBot: Boolean,

    content: String,
    image: String,
    video: String,

    likes: Number,
    commentCount: Number,
    reposts: Number,

    likers: Array,
    comments: Array,
    reposters: Array,

    tags: Array,
    reports: Array,
    
    hidden: Boolean,
    spoiler: Boolean,
    nsfw: Boolean,
    gore: Boolean,

    time: Number,
})

let postsModel = new mongoose.model("posts", postsScheme);

module.exports = postsModel;
