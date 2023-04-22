const express  = require('express'); 
// importing signup and sign in
const {handleUserSignup,handleUserLogin} = require("../controllers/user")
const router = express.Router();

// post router for usersingup and user sign in
router.post('/', handleUserSignup);
router.post('/login', handleUserLogin);
module.exports = router;