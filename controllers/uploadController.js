let introduction = (req, res) => {
    res.status(200).send("Welcome to Upload Route");
}

let uploadImage = async (req, res) => {
    res.status(200).send("Image Uploaded");
}

module.exports = {
    introduction,
    uploadImage,
}