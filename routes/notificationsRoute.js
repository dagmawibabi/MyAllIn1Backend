let express = require("express");
let Router = express.Router();
let notificationsController = require("../controllers/notificationsController")

Router.get("/", notificationsController.introduction);
Router.post("/getNotifications", notificationsController.getNotifications);
Router.post("/readNotifications", notificationsController.readNotifications);

module.exports = Router;