let express = require("express");
let Router = express.Router();
let uploadController = require("../controllers/uploadController")

//! File Uploading Middleware
let path = require("path");
let multer = require("multer");
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "userdata/images")
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
}) 
let upload = multer({storage: storage});


Router.get("/", uploadController.introduction);
Router.post("/images", upload.single("image"), uploadController.uploadImage);

module.exports = Router;