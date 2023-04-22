// importing shortid
const shortid = require("shortid")
const URL = require('../models/url')

// making function to generate new short url
async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"url is required"})
   const shortID = shortid();

   await URL.create({
    shortId: shortID,
    redirectURL : body.url,
    visitHistory: [],
    createdBy: req.user._id,
   });

   return res.render("home",{
      id: shortID,
   });
//    return res.json({id: shortID});
} 

//  get anayltics about the number of the number of clicks is visited with particulat url short id
async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});

    return res.json({totalClicks:result.visitHistory.length, 
        analytics:result.visitHistory,
    });
}
module.exports={
    handleGenerateNewShortURL,handleGetAnalytics
}