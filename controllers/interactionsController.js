let postsModel = require("../models/postsModel");
let accountModel = require("../models/accountModel");
let notificationModel = require("../models/notificationModel");
let commentsModel = require("../models/commentsModel");

// Introduction
let introduction = async (req, res) => {
    res.send("Welcome to the interactions route");
}

// Like and Unlike Post
let likeDislikePosts = async (req, res) => {
    let likedPostID = req.body["postID"];
    let likedBy = req.body["likedBy"];
    let currentPost = await postsModel.findOne({"_id": likedPostID});

    if(currentPost["likers"].includes(likedBy) == true){
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
        // Create Notification
        let notificationObject = {
            "source": newUsername,
            "destination": username, 
            "message": "followed you.",
            "content": newUsername,
            "isRead": false,
            "time": Date.now(),
        }
        await notificationModel.create(notificationObject);
    } else {
        await accountModel.updateOne({"username": username}, {$pull: {"following": newUsername}});
        await accountModel.updateOne({"username": newUsername}, {$pull: {"followers": username}});    
        res.status(200).send("Unfollowed User");
        // Remove Notification
        let notificationObject = {
            "source": newUsername,
            "destination": username, 
            "message": "followed you.",
            "content": newUsername,
        }
        await notificationModel.create(notificationObject);
    }
}

// Comment on posts
let commentOnPost = async (req, res) => {
    let reqBody = req.body;
    let newComment = {
        "fullname": reqBody["fullname"],
        "username": reqBody["username"],
        "isByBot": reqBody["isByBot"] || false,

        "postID": reqBody["postID"],
        "content": reqBody["content"],
        "image": "",
        "video": "",

        "likeCount": 1,
        "commentCount": 0,
        "repostCount": 0, 

        "likers": [
            reqBody["username"],
        ],
        "comments": [],
        "reposters": [],

        "tags": reqBody["tags"] == null ? [] : reqBody["tags"],
        "reports": [],

        "hidden": reqBody["hidden"] == true ? true : false,
        "spoiler": reqBody["spoiler"] == true ? true : false,
        "nsfw": reqBody["nsfw"] == true ? true : false,
        "gore": reqBody["gore"] == true ? true : false,
    
        "time": Date.now(),
    }

    let comment = await commentsModel.create(newComment);
    await postsModel.updateOne({"_id": reqBody["postID"]}, {$inc: {"commentCount": 1}, $push: {"comments": comment["_id"]}})
    res.status(200).send(comment);
}

// Like/Unlike Comment
let likeUnlikeComments = async (req, res) => {
    let likedCommentID = req.body["commentID"];
    let likedBy = req.body["likedBy"];
    let currentComment = await commentsModel.findOne({"_id": likedCommentID});

    if(currentComment["likers"].includes(likedBy) == true){
        await commentsModel.updateOne({"_id": likedCommentID},{$inc: {"likeCount": -1}, $pull: {"likers": likedBy}}); 
        // await commentsModel.updateOne({"_id": likedCommentID},{$pull: {"likers": likedBy}}); 
        // Remove Notification
        let notificationObject = {
            "source": likedBy,
            "destination": currentComment["username"], 
            "message": "liked your comment.",
            "content": likedCommentID,
        }
        await notificationModel.deleteOne({}, {notificationObject});
    } else {
        await commentsModel.updateOne({"_id": likedCommentID},{$inc: {"likeCount": 1}, $push: {"likers": likedBy}}); 
        // await commentsModel.updateOne({"_id": likedCommentID},{$push: {"likers": likedBy}}); 
        // Create Notification
        let notificationObject = {
            "source": likedBy,
            "destination": currentComment["username"], 
            "message": "liked your comment.",
            "content": likedCommentID,
            "isRead": false,
            "time": Date.now(),
        }
        await notificationModel.create(notificationObject);
    }

    res.status(200).send("Comment has been interacted with");
}

// Delete Comments
let deleteComment = async (req, res) => {
    let commentID = req.params.commentID;
    let postID = req.params.postID;
    await commentsModel.deleteOne({"_id": commentID});
    await postsModel.updateOne({"_id": postID}, {$inc: {"commentCount": -1}, $pull: {"comments": commentID}})
    res.status(200).send("Comment Deleted");
}

module.exports = {
    introduction,
    likeDislikePosts,
    followUnFollowUser,
    commentOnPost,
    likeUnlikeComments,
    deleteComment,
}