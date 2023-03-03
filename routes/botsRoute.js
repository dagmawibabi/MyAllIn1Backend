let express = require("express");
let Router = express.Router();
let botsController = require("../controllers/botsController");

Router.get("/", botsController.introduction);
Router.get("/allBotsPost", botsController.allBotsPost);


module.exports = Router;

