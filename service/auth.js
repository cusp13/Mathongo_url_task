// importing jsonweb token
const jwt = require("jsonwebtoken");''
const secret = "Divyansh"
// Settin up authentication for user using json web token
function setUser(user){
      return jwt.sign({
        _id: user._id,
        email: user.email,
      },secret);
}
// verify the user if it login 
function getUser(token){
    try{
        return jwt.verify(token,secret);
    }catch(error){
        return null;
    }
}
// export both getUser , setuser
module.exports = {
    setUser,
    getUser
}