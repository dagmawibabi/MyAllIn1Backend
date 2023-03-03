const { json } = require("express");
let accountModel = require("../models/accountModel");

let introduction = (req, res) => {
    res.status(200).send("Welcome to the authentication route");
}

let signup = async (req, res) => {
    let reqBody = req.body;
    let username = reqBody["username"];
    let emailDomain = process.env.APP_NAME || "philomena";
    let result = await accountModel.findOne({"username": username});
    if(result == null) {
        let newAccount = {
            "verified": false,
            "fullname": reqBody["fullname"],
            "username": reqBody["username"],
            "password": reqBody["password"],        
            "profilepic": "https://i.pinimg.com/564x/e0/ab/3a/e0ab3a820b9e6cb0553605314cf02717.jpg",
            "posts": 0,
            "followers": [],
            "following": [],
            "phone": "+1234567890",
            "email": reqBody["username"] + "@" + emailDomain + ".com",
            "bio": "Build, Break and Rebuild",
            "communities": [],
        };
        let newAccountObj = await accountModel.create(newAccount);
        res.status(200).send(newAccountObj);
    } else {
        res.status(200).send("Username already exists");
    }
}

let signupAnonymous = async (req, res) => {
    let names = [];
    let usernames = [];

    let reqBody = req.body;
    let username = reqBody["username"];
    let emailDomain = process.env.APP_NAME || "philomena";
    let result = await accountModel.findOne({}, {username});
    if(result == null) {
        let newAccount = {
            "verified": false,
            "fullname": reqBody["fullname"],
            "username": reqBody["username"],
            "password": reqBody["password"],        
            "profilepic": "https://i.pinimg.com/564x/e0/ab/3a/e0ab3a820b9e6cb0553605314cf02717.jpg",
            "posts": 0,
            "followers": [],
            "following": [],
            "phone": "+1234567890",
            "email": reqBody["username"] + "@" + emailDomain + ".com",
            "bio": "Build, Break and Rebuild",
            "communities": [],
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
    login,
    signupAnonymous
}

