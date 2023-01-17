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
        "image": req.imageName,

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

        "hidden": reqBody["hidden"] == true ? true : false,
        "spoiler": reqBody["spoiler"] == true ? true : false,
        "nsfw": reqBody["nsfw"] == true ? true : false,
        "gore": reqBody["gore"] == true ? true : false,
    
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

// Delete Posts
let deletePost = async (req, res) => {
    let reqBody = req.body;
    let username = reqBody["username"]; 
    let content = reqBody["content"]; 
    let time = reqBody["time"]; 
    await postsModel.deleteOne({"username": username, "content": content, "time": time});
    res.status(200).send("Post Deleted");
}

// Repost
let repost = async (req, res) => {
    
    res.status(200).send("Post Reposted");
}

//! Export
module.exports = {
    introduction,
    newPost,
    getAllPosts,
    getUserPosts,
    deletePost,
}