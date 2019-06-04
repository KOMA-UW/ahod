"use strict";
const mongoose = require("mongoose");

const pleaSchema = new mongoose.Schema({
    text: { type: String, require: true },
    groupID: {type:String, require:true}, 
    createdAt: {type:Date},
    likes:{type:Number, required:false},
    voters: [],
    creator: { type:Number, ref: "Creator", required: false } 
  });
  
module.exports = mongoose.model("Plea", pleaSchema);