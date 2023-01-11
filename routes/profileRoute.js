let express = require("express");
let Router = express.Router();

let profileController = require("../controllers/profileController");

Router.get("/", profileController.introduction);
Router.get("/getProfile/:username", profileController.getProfile);


module.exports = Router;