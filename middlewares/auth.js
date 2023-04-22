const {getUser} = require("../service/auth");
// making function to restrict user who have not logged in
async function restrictToLoggedinUserOnly(req,res,next){
    const userUid = req.cookies?.uid;

    if(!userUid) return res.redirect('/login');
    const user = getUser(userUid);

    if(!user) return res.redirect("/login");

    req.user = user;
    next();
};
//  making function to check authentication
async function chechAuth(req,res,next){
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user;
    next();
}
// exporting both the above function
module.exports = {
    restrictToLoggedinUserOnly,
    chechAuth,
}