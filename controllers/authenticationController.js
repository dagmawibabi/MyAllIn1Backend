const { json } = require("express");
let accountModel = require("../models/accountModel");

let introduction = (req, res) => {
    res.status(200).send("Welcome to the authentication route");
}

let signup = async (req, res) => {
    let reqBody = req.body;
    let username = reqBody["username"];
    let result = await accountModel.findOne({"username": username});
    if(result == null) {
        let newAccount = {
            "fullname": reqBody["fullname"],
            "username": reqBody["username"],
            "password": reqBody["password"],        
            "profilepic": "assets/images/me.jpg",
            "posts": 0,
            "followers": 0,
            "following": 0,
            "phone": "",
            "email": "",
            "bio": "",
        };
        let newAccountObj = await accountModel.create(newAccount);
        res.status(200).send(newAccountObj);
    } else {
        res.status(200).send("Username already exists");
    }


}

let login = async (req, res) => {
    let reqBody = req.body;
    let username = reqBody["username"];
    let password = reqBody["password"];

    let result = await accountModel.findOne({"username": username});
    if(result != null){
        if (result["password"] == password){
            res.status(200).send(result);
        } else {
            res.status(200).send("Wrong Account Password");
        }
    } else {
        res.status(200).send("Username Not Found");
    }
}

module.exports = {
    introduction,
    signup,
    login
}

