// DEFINITING SCHEMA FOR GENERATIG URL...
const mongoose = require("mongoose");
// making schema for storing in database
const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    redirectURL:{
        type: String,
        required: true,
    },
    visitHistory: [{timestamp:{
        type: Number
    }}],
    createdBy:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'users',
    }
},{
    timestamps: true
})
// mongoose model..
const URL = mongoose.model("url",urlSchema);
// exporting the the URL model
module.exports = URL;