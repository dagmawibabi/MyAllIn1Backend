let privateChatsModel = require("../models/privateChatsModel");

let introduction = async (req, res) => {
    res.status(200).send("Welcome to private chats route");
}

let sendPrivateMessage = async (req, res) => {
    let reqBody = req.body;
    let from = reqBody["from"].toString().toLowerCase();
    let to = reqBody["to"].toString().toLowerCase();
    let forwardedFrom = reqBody["forwardedFrom"].toString().toLowerCase();
    let content = reqBody["content"];
    // let media = reqBody["media"];
    // let reactions = reqBody["reactions"];

    let newPrivateChat = {
        "from": from,
        "to": to,
        "forwardedFrom": forwardedFrom,
        "content": content,
        "media": "",
        "reactions": [],
        "seen": [from],
        "dateTime": Date.now(),
    };

    await privateChatsModel.create(newPrivateChat);

    res.status(200).send("Sent Message");
}

let getPrivateChat = async (req, res) => {
    let from = req.params.from.toString().toLowerCase();
    let to = req.params.to.toString().toLowerCase();
    
    let chats = await privateChatsModel.find({$and: [{from: {$in: [from, to]}}, {to: {$in: [from, to]}}]});

    // Set the seen value
    await privateChatsModel.updateMany({$and: [{from: {$in: [from, to]}}, {to: {$in: [from, to]}}]}, {$push: {seen: from}});

    res.status(200).send(chats);
}

let clearPrivateChat = async (req, res) => {
    let from = req.params.from.toString().toLowerCase();
    let to = req.params.to.toString().toLowerCase();
    
    await privateChatsModel.deleteMany({$and: [{from: {$in: [from, to]}}, {to: {$in: [from, to]}}]});

    res.status(200).send("Chat Cleared");
}

module.exports = {
    introduction,
    sendPrivateMessage,
    getPrivateChat,
    clearPrivateChat,
}