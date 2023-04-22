const express = require("express");
const URL  = require("../models/url");

const router = express.Router();

// redirect url to home page if user exist
router.get('/',async (req,res)=>{
    if(!req.user) return res.redirect('/login');
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.render('home',{
        urls: allUrls,
    });
})
// rOUTER for signing up
router.get("/signup",(req,res)=>{
    return res.render("signup");
});
// router for logging
router.get("/login",(req,res)=>{
    return res.render("login");
});
// export router
module.exports = router;