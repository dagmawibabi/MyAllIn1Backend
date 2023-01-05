let express = require("express");
let Router = express.Router();

let searchController = require("../controllers/searchController");

Router.get("/", searchController.introduction);
Router.get("/:searchTerm", searchController.search);

module.exports = Router;