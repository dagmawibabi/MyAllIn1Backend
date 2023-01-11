let express = require("express");
let app = new express();
let mongoose = require("mongoose");
let cors = require('cors');

mongoose.set("strictQuery", false);

//! File Imports
let postsRoute = require("./routes/postsRoute");
let interactionsRoute = require("./routes/interactionsRoute");
let authenticationRoute = require("./routes/authenticationRoute");
let notificationsRoute = require("./routes/notificationsRoute");
let searchRoute = require("./routes/searchRoute");
let profileRoute = require("./routes/profileRoute");

//! Middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//! Env
let appName = process.env.APP_NAME || "Philomena";
let portNum = process.env.PORT || 7000;
let mongoAtlastUrl = process.env.DBURL || "mongodb+srv://BobRoss:BobRoss1234@cluster0.fivp4.mongodb.net/Philomena?retryWrites=true&w=majority";

//! SERVER
app.listen(portNum, ()=>{
    console.log(`Server listening on port ${portNum}`);
});

//! Database
// Connect To DB - MongoDB Atlas - 500mbs
async function connectToDB(){
    console.log("Connecting...");
    await mongoose.connect(mongoAtlastUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("MDBA Connected!")).catch(err => console.log("ERROR"));
    console.log("connected!");
}


// Routes
app.get("/philomena/", async (req, res) => {
    res.send(`Welcome to ${appName} API`);
});

app.use("/philomena/posts/", postsRoute);
app.use("/philomena/interactions/", interactionsRoute);
app.use("/philomena/authentication/", authenticationRoute);
app.use("/philomena/notifications/", notificationsRoute);
app.use("/philomena/search/", searchRoute);
app.use("/philomena/profile/", profileRoute);


connectToDB();


