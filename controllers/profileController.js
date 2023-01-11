let accountModel = require("../models/accountModel");
let postsModel = require("../models/postsModel");

let introduction = (req, res) => {
    res.status(200).send("Welcome Profile Route");
}

let getProfile = async (req, res) => {
    let username = req.params.username;
    let profile = await accountModel.findOne({"username": username});
    let posts = await postsModel.find({"username": username});
    let result = {
        "profile": profile,
        "posts": posts,
    }
    res.status(200).send(result);
}

module.exports = {
    introduction,
    getProfile,
}