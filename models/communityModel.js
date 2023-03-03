let mongoose = require("mongoose");

let communitySchema = new mongoose.Schema({
    name: String,
    username: String,
    members: Array,
    profilePic: String,
    bannerPic: String,
    bio: String,
    introduction: String,
    rules: String,
    faq: String,
    private: Boolean,
    owner: String,
    admins: Array,
})

let communityModel = new mongoose.model("communities", communitySchema);

module.exports = communityModel;
