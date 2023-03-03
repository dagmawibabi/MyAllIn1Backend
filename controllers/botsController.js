let introduction = (req, res) => {
    res.status(200).send("Welcome to Bots route");
}

let allBotsPost = (req, res) => {
    let bot
    res.status(200).send("BOTS POSTED!");
}

let createABotAccount = (req, res) => {
    let subreddits = [];
    res.status(200).send("New Bot Account Created!");
}

module.exports = {
    introduction,
    allBotsPost,
}