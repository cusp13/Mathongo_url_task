const User = require('../models/user')
const {v4: uuidv4} = require('uuid')
const {setUser} = require("../service/auth");
// making function for user Sign up
async function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/");
}
// making function for user login
async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user)
    return res.render("login",{
        error: "Invalid Username or Password",
    });
    const token = setUser(user);
    res.cookie('uid',token);
    return res.redirect("/");
}
// exporting sign up and login function
module.exports = {
    handleUserSignup,
    handleUserLogin
}
