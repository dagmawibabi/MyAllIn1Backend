let express = require("express");
let Router = express.Router();
let privateChatsController = require("../controllers/privateChatsController");

Router.get("/", privateChatsController.introduction);
Router.get("/getChats/:username", privateChatsController.getChats);
Router.get("/getPrivateChat/:from/:to", privateChatsController.getPrivateChat);
Router.post("/sendPrivateMessage", privateChatsController.sendPrivateMessage);
Router.get("/clearPrivateChat/:from/:to", privateChatsController.clearPrivateChat);

module.exports = Router;