let notificationModel = require("../models/notificationModel");
const postsModel = require("../models/postsModel");


let introduction = (req, res) => {
    res.status(200).send("Welcome to the Notifications route");
}

let getNotifications = async (req, res) => {
    let reqBody = req.body;
    let username = reqBody["username"];

    let results = await notificationModel.find({"destination": username});

    res.status(200).send(results);
}

let readNotifications = async (req, res) => {
    let reqBody = req.body;
    let notificationID = reqBody["notificationID"];
    await notificationModel.updateOne({"_id": notificationID},{"isRead": true});
    res.status(200).send("Notification Read");
}

let readAllNotifications = async (req, res) => {
    let username = req.username;
    await notificationModel.updateMany({"destination": username},{"isRead": true});
    res.status(200).send("All Notification Read");
}

let unreadAllNotifications = async (req, res) => {
    let username = req.username;
    await notificationModel.updateMany({"destination": username},{"isRead": false});
    res.status(200).send("All Notification Read");
}

let getNotificationContent = async (req, res) => {
    let notificationID = req.params.notificationID;
    let notification = await notificationModel.findOne({"_id": notificationID});
    let notificationContent = await postsModel.findOne({"_id": notification["content"]});
    res.status(200).send(notificationContent);
}

module.exports = {
    introduction,
    getNotifications,
    readNotifications,
    readAllNotifications,
    unreadAllNotifications,
    getNotificationContent,
}