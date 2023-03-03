let express = require("express");
let Router = express.Router();
let authenticationController = require("../controllers/authenticationController");

Router.get("/", authenticationController.introduction);
Router.post("/signup", authenticationController.signup);
Router.post("/login", authenticationController.login);
Router.post("/signupAnonymous", authenticationController.signupAnonymous);

module.exports = Router;
