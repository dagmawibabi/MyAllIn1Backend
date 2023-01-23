let postsModel = require("../models/postsModel");
let accountModel = require("../models/accountModel");
let notificationModel = require("../models/notificationModel");

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
        // Remove Notification
        let notificationObject = {
            "source": likedBy,
            "destination": currentPost["username"], 
            "message": "liked your post.",
            "content": likedPostID,
        }
        await notificationModel.deleteOne({}, {notificationObject});
    } else {
        await postsModel.updateOne({"_id": likedPostID},{$inc: {"likes": 1}}); 
        await postsModel.updateOne({"_id": likedPostID},{$push: {"likers": likedBy}}); 
        // Create Notification
        let notificationObject = {
            "source": likedBy,
            "destination": currentPost["username"], 
            "message": "liked your post.",
            "content": likedPostID,
            "isRead": false,
            "time": Date.now(),
        }
        await notificationModel.create(notificationObject);
    }

    res.status(200).send("Post had been interacted with");
}

// Follow and Unfollow User
let followUnFollowUser = async (req, res) => {
    let username = req.params.username;
    let newUsername = req.params.newUsername;
    let allFollowing = await accountModel.findOne({"username": username});
    if (allFollowing["following"].includes(newUsername) == false) {
        await accountModel.updateOne({"username": username}, {$push: {"following": newUsername}});
        await accountModel.updateOne({"username": newUsername}, {$push: {"followers": username}});
        res.status(200).send("Followed User");
    } else {
        await accountModel.updateOne({"username": username}, {$pull: {"following": newUsername}});
        await accountModel.updateOne({"username": newUsername}, {$pull: {"followers": username}});    
        res.status(200).send("Unfollowed User");
    }
}

// Comment on posts
let commentOnPost = async (req, res) => {
    res.status(200).send("commented");
}

module.exports = {
    introduction,
    likeDislikePosts,
    followUnFollowUser,
}