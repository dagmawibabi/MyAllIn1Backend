let communityModel = require("../models/communityModel");
let accountModel = require("../models/accountModel");
let communityChatsModel = require("../models/communityChatModel");

let introduction = (req, res) => {
    res.status(200).send("Welcome to Community Route");
}

let getMyCommunities = async (req, res) => {
    let username = req.params.username.toString().toLowerCase();
    let userAccount = await accountModel.findOne({username: username});
    let userCommunities = userAccount["communities"];
    let communities = await communityModel.find({username: {$in: userCommunities}});
    res.status(200).send(communities);
}

let createCommunity = async (req, res) => {
    let reqBody = req.body;
    let communityObject = {
        name: reqBody["name"],
        username: reqBody["username"].toString().toLowerCase(),
        members: [reqBody["owner"]],
        profilePic: "https://i.pinimg.com/564x/47/d8/67/47d86708f7999e03b8b2668412da1592.jpg",
        bannerPic: "https://i.pinimg.com/564x/55/76/22/5576227d98fd1f39766045e053607cf5.jpg",
        bio: reqBody["bio"] || "Awesome new community",
        introduction: reqBody["introduction"] || "Welcome to our community!",
        rules: reqBody["rules"] || "Be nice to one another!",
        faq: reqBody["faq"] || "No frequently asked questions",
        private: reqBody["private"] || false,
        owner: reqBody["owner"],
        admins: [reqBody["owner"]],
    }
    let result = await communityModel.findOne({username: reqBody["username"].toString().toLowerCase()});
    if (result == null) {
        let community = await communityModel.create(communityObject);
        await accountModel.updateOne({username: reqBody["owner"]}, {$push: {communities: reqBody["username"].toString().toLowerCase()}});
        res.status(200).send(community);
    } else {
        res.status(200).send("Community username already exists");
    }
}

let deleteCommunity = async (req, res) => {
    let ownerUsername = req.params.ownerUsername.toString().toLowerCase();
    let communityUsername = req.params.communityUsername.toString().toLowerCase();
    let community = await communityModel.findOne({username: communityUsername});
    let communityMembers = community["members"];
    if(community["owner"].toString().toLowerCase() == ownerUsername) {
        await communityModel.deleteOne({username: communityUsername});
        await communityChatsModel.deleteMany({community: communityUsername});
        await accountModel.updateMany({username: {$in: communityMembers}}, {$pull: {communities: communityUsername}})
        res.status(200).send("Deleted Community");
    } else {
        res.status(200).send("You can't delete the community cause you are not it's owner");
    }
}

let joinCommunity = async (req, res) => {
    let communityUsername = req.params.communityUsername.toString().toLowerCase();
    let newMemberUsername = req.params.newMemberUsername.toString().toLowerCase();
    let community = await communityModel.findOne({username: communityUsername});
    if (community["members"].includes(newMemberUsername) == false) {
        await communityModel.updateOne({username: communityUsername}, {$push: {members: newMemberUsername}});
        await accountModel.updateOne({username: newMemberUsername}, {$push: {communities: communityUsername}})
        res.status(200).send(community);
    } else {
        res.status(200).send("You are already part of the community");
    }
}

let leaveCommunity = async (req, res) => {
    let communityUsername = req.params.communityUsername.toString().toLowerCase();
    let oldMemberUsername = req.params.oldMemberUsername.toString().toLowerCase();
    let community = await communityModel.findOne({username: communityUsername});
    if (community["members"].includes(oldMemberUsername) == true) {
        await communityModel.updateOne({username: communityUsername}, {$pull: {members: oldMemberUsername}});
        await accountModel.updateOne({username: oldMemberUsername}, {$pull: {communities: communityUsername}})
            res.status(200).send(community);
    } else {
        res.status(200).send("You are not part of the community");
    }
}

let sendCommunityChat = async (req, res) => {
    let reqBody = req.body;
    let from = reqBody["from"].toString().toLowerCase();
    let community = reqBody["community"].toString().toLowerCase();
    let forwardedFrom = reqBody["forwardedFrom"].toString().toLowerCase();
    let content = reqBody["content"];
    // let media = reqBody["media"];
    // let reactions = reqBody["reactions"];

    let newCommunityChat = {
        "from": from,
        "community": community,
        "forwardedFrom": forwardedFrom,
        "content": content,
        "media": "",
        "reactions": [],
        "seen": [from],
        "dateTime": Date.now(),
    };

    let newChat = await communityChatsModel.create(newCommunityChat);

    res.status(200).send(newChat);
}

let getCommunityChat = async (req, res) => {
    // let from = req.params.from.toString().toLowerCase();
    // Only your texts in the community
    // let chats = await communityChatsModel.find({$and: [{from: {$in: [from, community]}}, {community: {$in: [from, community]}}]});
    // Set the seen value
    // await privateChatsModel.updateMany({$and: [{from: {$in: [from, community]}}, {community: {$in: [from, community]}}]}, {$push: {seen: from}});
    // let chats2 = await privateChatsModel.find({$and: [{from: {$in: [from, to]}}, {to: {$in: [from, to]}}, {$or: [{seen: {$eq: [from, to]}}, {seen: {$eq: [to, from]}}] }]});

    let community = req.params.communityUsername.toString().toLowerCase();
    // Everyone's texts
    let chats = await communityChatsModel.find({community: community});
    res.status(200).send(chats);
}

let getCommunityMembers = async (req, res) => {
    let communityUsername = req.params.communityUsername;
    let community = await communityModel.findOne({username: communityUsername});
    let members = community["members"];
    let membersProfile = await accountModel.find({"username": {$in: members}});
    res.status(200).send(membersProfile);
}

// Clear only your texts
let clearCommunityChat = async (req, res) => {
    let from = req.params.from.toString().toLowerCase();
    let community = req.params.communityUsername.toString().toLowerCase();
    
    await communityChatsModel.deleteMany({community: community, from: from});
    let chats = await communityChatsModel.find({community: community});

    res.status(200).send(chats);
}

// Clear all community chats
let clearAllCommunityChat = async (req, res) => {
    let community = req.params.communityUsername.toString().toLowerCase();
    await communityChatsModel.deleteMany({community: community});

    let chats = await communityChatsModel.find({community: community});
    
    res.status(200).send(chats);
}

let updateCommunityInfo = async (req, res) => {
    let reqBody = req.body;
    let owner = reqBody["owner"].toString().toLowerCase();
    let username = reqBody["username"];
    let bio = reqBody["bio"].toString();
    let introduction = reqBody["introduction"].toString();
    let rules = reqBody["rules"].toString();
    let faq = reqBody["faq"].toString();

    let community = await communityModel.findOne({username: username});
    if (community["owner"].toString().toLowerCase() == owner) {
        await communityModel.updateOne({username: username}, {bio: bio, introduction: introduction, rules: rules, faq: faq});
        res.status(200).send("Community info updated");
    } else {
        res.status(200).send("Community info can only be changed by the owner or the admins");
    }


}

let discoverCommunities = async (req, res) => {
    let discoveredCommunities = await communityModel.find({private: false});
    res.status(200).send(discoveredCommunities);
}

module.exports = {
    introduction,
    getMyCommunities,
    createCommunity,
    deleteCommunity,
    joinCommunity,
    leaveCommunity,
    sendCommunityChat,
    getCommunityChat,
    clearCommunityChat,
    clearAllCommunityChat,
    updateCommunityInfo,
    getCommunityMembers,
    discoverCommunities,
}