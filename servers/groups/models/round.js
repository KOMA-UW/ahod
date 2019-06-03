const mongoose = require("mongoose");
const member = require("../models/member");
const Group = require("./group")

const roundSchema = new mongoose.Schema({
    candidates:[Object],   // current candidates
    group_id:{type:String, required:true},
    beginDate: {type:Date, require:true},
    winner: {type:Object, require:true}
});

module.exports = mongoose.model("Round", roundSchema);