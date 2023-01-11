let express = require("express");
let Router = express.Router();
let postsController = require("../controllers/postsController");

Router.get("/", postsController.introduction);
Router.post("/newPost", postsController.newPost);
Router.get("/getAllPosts", postsController.getAllPosts);
Router.post("/getUserPosts", postsController.getUserPosts);
Router.post("/deletePost", postsController.deletePost);

module.exports = Router;
