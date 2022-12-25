let postsModel = require("../models/postsModel");
let accountModel = require("../models/accountModel");

// Introduction
let introduction = (req, res) => {
    res.send("Welcome to the posts route");
}

// New Post
let newPost = async (req, res) => {
    let reqBody = req.body;
    let newPost = {
        "fullname": reqBody["fullname"],
        "username": reqBody["username"],
        "content": reqBody["content"],

        "likes": 1,
        "comments": 0,
        "reposts": 0,

        "likers": [
            reqBody["username"],
        ],
        "commenters": [],
        "reposters": [],

        "tags": reqBody["tags"] == null ? [] : reqBody["tags"],
        "reports": [],

        "hidden": reqBody["hidden"] ? true : false,
        "time": Date.now(),
    }


    await postsModel.create(newPost);
    await accountModel.updateOne({"username": reqBody["username"]},{$inc: {"posts": 1}});

    // await postsModel.deleteMany({"username": "dagmawibabi"});
    res.status(200).send("New Post has been published!");
}

// Get All Posts
let getAllPosts = async (req, res) => {
    let allPosts = await postsModel.find({});
    res.status(200).send(allPosts);
}

// Get User Posts
let getUserPosts = async (req, res) => {
    let username = req.body["username"];
    let allUserPosts = await postsModel.find({"username": username});
    res.status(200).send(allUserPosts);
}

//! Export
module.exports = {
    introduction,
    newPost,
    getAllPosts,
    getUserPosts,
}