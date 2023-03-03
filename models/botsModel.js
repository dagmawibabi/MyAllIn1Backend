let mongoose = require("mongoose");

let botsSchema = new mongoose.Schema({
    botName: String,
    sourceOfContent: String,
})

let botsModel = new mongoose.model("bots", botsSchema);

module.exports = botsModel;
