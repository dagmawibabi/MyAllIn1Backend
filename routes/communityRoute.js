let express = require("express");
let Router = express.Router();
let communityController = require("../controllers/communityController");

Router.get("/", communityController.introduction);
Router.get("/getMyCommunities/:username", communityController.getMyCommunities);

Router.post("/createCommunity", communityController.createCommunity);
Router.get("/deleteCommunity/:communityUsername/:ownerUsername", communityController.deleteCommunity);

Router.get("/joinCommunity/:communityUsername/:newMemberUsername", communityController.joinCommunity);
Router.get("/leaveCommunity/:communityUsername/:oldMemberUsername", communityController.leaveCommunity);

Router.post("/sendCommunityChat", communityController.sendCommunityChat);
Router.get("/getCommunityChat/:communityUsername", communityController.getCommunityChat);
Router.get("/clearCommunityChat/:communityUsername/:from", communityController.clearCommunityChat);
Router.get("/clearAllCommunityChat/:communityUsername", communityController.clearAllCommunityChat);

Router.post("/updateCommunityInfo", communityController.updateCommunityInfo);
Router.get("/getCommunityMembers/:communityUsername", communityController.getCommunityMembers);
Router.get("/discoverCommunities", communityController.discoverCommunities);

module.exports = Router;