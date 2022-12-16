let express = require("express");
let app = express();
let mongoose = require("mongoose");
mongoose.set("strictQuery", false);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//! File Imports
let postsRoute = require("./routes/postsRoute");


//! Env
let appName = "Philomena";
let portNum = process.env.PORT || 7000;
let mongoAtlastUrl = "mongodb+srv://BobRoss:BobRoss1234@cluster0.fivp4.mongodb.net/Philomena?retryWrites=true&w=majority";

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
app.get("/",(req, res) => {
    res.send(`Welcome to ${appName} API`);
});

app.use("/posts", postsRoute);

connectToDB();


