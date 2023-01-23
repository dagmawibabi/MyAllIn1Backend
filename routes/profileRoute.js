let express = require("express");
let Router = express.Router();

let profileController = require("../controllers/profileController");

Router.get("/", profileController.introduction);
Router.get("/getAllProfiles/", profileController.getAllProfiles);
Router.get("/getProfile/:username", profileController.getProfile);
Router.get("/getAllFollowing/:username", profileController.getAllFollowing);
Router.get("/getAllFollowers/:username", profileController.getAllFollowers);


module.exports = Router;