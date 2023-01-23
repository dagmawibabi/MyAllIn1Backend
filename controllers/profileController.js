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

let getAllProfiles = async (req, res) => {
    let allAccounts = await accountModel.find({});
    res.status(200).send(allAccounts);
}

let getAllFollowing = async (req, res) => {
    let username = req.params.username;
    let accountExists = await accountModel.findOne({"username": username});
    if(accountExists != [] && accountExists != null){
        let allFollowingUsernames = await accountModel.find({"username": username}, {"following": 1});
        let allFollowing = await accountModel.find({"username": {$in: allFollowingUsernames[0]["following"]}});
        res.status(200).send(allFollowing);
    } else {
        res.status(200).send("Account Doesn't exist");
    }
}

let getAllFollowers = async (req, res) => {
    let username = req.params.username;
    let accountExists = await accountModel.findOne({"username": username});
    if(accountExists != [] && accountExists != null){
        let allFollowersUsernames = await accountModel.find({"username": username}, {"followers": 1});
        let allFollowers = await accountModel.find({"username": {$in: allFollowersUsernames[0]["followers"]}});
        res.status(200).send(allFollowers);
    } else {
        res.status(200).send("Account Doesn't exist");
    }
}


module.exports = {
    introduction,
    getProfile,
    getAllProfiles,
    getAllFollowing,
    getAllFollowers,
}