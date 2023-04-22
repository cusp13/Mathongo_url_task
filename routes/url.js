const express = require('express');
const {handleGenerateNewShortURL,handleGetAnalytics} = require("../controllers/url");
const router = express.Router();

// router to home after generating url
router.post("/",handleGenerateNewShortURL);
// router for analytics for url
router.get("/analytics/:shortId",handleGetAnalytics)
// exporting the router
module.exports = router;