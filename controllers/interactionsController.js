let postsModel = require("../models/postsModel");

// Introduction
let introduction = async (req, res) => {
    res.send("Welcome to the interactions route");
}

// Like and Dislike Post
let likeDislikePosts = async (req, res) => {
    let likedPostID = req.body["postID"];
    let likedBy = req.body["likedBy"];
    let currentPost = await postsModel.findOne({"_id": likedPostID});

    if(currentPost["likers"].includes(likedBy)){
        await postsModel.updateOne({"_id": likedPostID},{$inc: {"likes": -1}}); 
        await postsModel.updateOne({"_id": likedPostID},{$pull: {"likers": likedBy}}); 
    } else {
        await postsModel.updateOne({"_id": likedPostID},{$inc: {"likes": 1}}); 
        await postsModel.updateOne({"_id": likedPostID},{$push: {"likers": likedBy}}); 
    }

    res.status(200).send("Post had been interacted with");
}

module.exports = {
    introduction,
    likeDislikePosts,
}