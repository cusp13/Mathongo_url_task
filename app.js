// importing dotenv files
require("dotenv").config();
// importing express
const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const {connectToMongoDB} = require('./connect');
const {restrictToLoggedinUserOnly,chechAuth} = require('./middlewares/auth')

const URL =require('./models/url');

// setting routing pages
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user')

// mongodb://localhost:27017
 const app = express();
 const PORT = process.env.PORT || 8001;
 connectToMongoDB(process.env.MONGO_URL).then(()=>console.log("DataBase connected"));
// setting  up of ejs engines
app.set("view engine", "ejs");
app.set("views",path.resolve('./views'));

//middlewares
 app.use(express.json());
 app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

// routers
 app.use("/url",restrictToLoggedinUserOnly,urlRoute);
 app.use("/user",userRoute);
 app.use("/",chechAuth,staticRoute);
 
// get request
 app.get('/url/:shortId',async(req,res)=>{
     const shortId = req.params.shortId;
  const entry =  await URL.findOneAndUpdate({
        shortId
     },{
        $push:{
            visitHistory : {
                timestamp: Date.now()
            },
        }
     });
     res.redirect(entry.redirectURL)
 })

//  listening to run server at given port
 app.listen(PORT,()=> console.log("Server is connected"));
