let express = require("express");
let Router = express.Router();
let postsController = require("../controllers/postsController");

//! File Uploading Middleware
// let path = require("path");
// let multer = require("multer");
// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "../public_html/userdata/images")
//     },
//     filename: (req, file, cb) => {
//         let imageFileName = Date.now() + path.extname(file.originalname);
//         req.imageName = imageFileName;
//         cb(null, imageFileName);
//     }
// }) 
// let upload = multer({storage: storage});

Router.get("/", postsController.introduction);
Router.post("/newPost", postsController.newPost);
Router.get("/getAllPosts", postsController.getAllPosts);
Router.get("/getFeed/:username", postsController.getFeed);
Router.post("/getUserPosts", postsController.getUserPosts);
Router.post("/deletePost", postsController.deletePost);
Router.get("/getPostComments/:postID", postsController.getPostComments);

module.exports = Router;
