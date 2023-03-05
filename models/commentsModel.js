let mongoose = require("mongoose");

let commentsScheme = new mongoose.Schema({
    fullname: String,
    username: String,
    isByBot: Boolean,

    postID: String,
    content: String,
    image: String,
    video: String,

    likeCount: Number,
    commentCount: Number,
    repostCount: Number,

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

let commentsModel = new mongoose.model("comments", commentsScheme);

module.exports = commentsModel;
