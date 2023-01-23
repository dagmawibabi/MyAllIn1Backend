let express = require("express");
let Router = express.Router();
let notificationsController = require("../controllers/notificationsController")

Router.get("/", notificationsController.introduction);
Router.post("/getNotifications", notificationsController.getNotifications);
Router.post("/readNotifications", notificationsController.readNotifications);
Router.get("/readAllNotifications/:username", notificationsController.readAllNotifications);
Router.get("/unreadAllNotifications/:username", notificationsController.unreadAllNotifications);
Router.get("/getNotificationContent/:notificationID", notificationsController.getNotificationContent);


module.exports = Router;