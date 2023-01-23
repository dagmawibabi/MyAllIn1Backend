let express = require("express");
let Router = express.Router();
let interactionsController = require("../controllers/interactionsController");

Router.get("/", interactionsController.introduction);
Router.post("/likeDislikePosts", interactionsController.likeDislikePosts);
Router.get("/followUnfollowUser/:username/:newUsername", interactionsController.followUnFollowUser);

module.exports = Router;
