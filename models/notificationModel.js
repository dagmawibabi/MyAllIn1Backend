let mongoose = require("mongoose");

let notificationSchema = new mongoose.Schema({
    "source": String,
    "destination": String, 
    "message": String,
    "content": String,
    "isRead": Boolean,
    "time": Number,
});


let notificationModel = new mongoose.model("notifications", notificationSchema);

module.exports = notificationModel;



