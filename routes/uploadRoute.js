let express = require("express");
let Router = express.Router();
let uploadController = require("../controllers/uploadController")

//! File Uploading Middleware
let path = require("path");
let multer = require("multer");
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../public_html/userdata/media")
    },
    filename: (req, file, cb) => {
        let imageFileName = Date.now() + path.extname(file.originalname);
        req.imageName = imageFileName;
        cb(null, imageFileName);
    }
}) 
let upload = multer({storage: storage});


Router.get("/", uploadController.introduction);
Router.post("/images", upload.single("image"), uploadController.uploadImage);
Router.post("/videos", upload.single("video"), uploadController.uploadVideo);

module.exports = Router;