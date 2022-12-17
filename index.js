let express = require("express");
let app = express();
let mongoose = require("mongoose");
mongoose.set("strictQuery", false);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//! File Imports
let postsRoute = require("./routes/postsRoute");


//! Env
let appName = process.env.APP_NAME || "Philomena";
let portNum = process.env.PORT || 7000;
let mongoAtlastUrl = process.env.DB_URL || "mongodb+srv://BobRoss:BobRoss1234@cluster0.fivp4.mongodb.net/TheUnityProjectMural?retryWrites=true&w=majority";

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
app.get(`/philomena`,(req, res) => {
    res.send(`Welcome to ${appName} API`);
});

app.use(`/philomena/posts`, postsRoute);

connectToDB();


