let notificationModel = require("../models/notificationModel");


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

module.exports = {
    introduction,
    getNotifications,
    readNotifications,
}