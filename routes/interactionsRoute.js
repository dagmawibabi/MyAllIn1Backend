let express = require("express");
let Router = express.Router();
let interactionsController = require("../controllers/interactionsController");

Router.get("/", interactionsController.introduction);
Router.post("/likeDislikePosts", interactionsController.likeDislikePosts);
Router.get("/followUnfollowUser/:username/:newUsername", interactionsController.followUnFollowUser);

Router.post("/commentOnPost", interactionsController.commentOnPost);
Router.post("/likeUnlikeComments", interactionsController.likeUnlikeComments);
Router.get("/deleteComment/:postID/:commentID", interactionsController.deleteComment);

module.exports = Router;
