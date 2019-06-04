"use strict";
const mongoose = require("mongoose");
const Plea = require("./plea")

const groupSchema = new mongoose.Schema({
    name: { type: String, require: true },
    group_code:{type:Number, required:true},
    bio: { type: String, require: false },
    imagePath: { type: String,require: false },
    location: {type:String, required:true},
    createdAt: {type:Date},
    plea_list:[],
    capital:{type:Number, require:false}, // total of IMC
    IMC:{type:Number, require:false}, // Individual Monthly/Round Contribution
    updatedAt:{type:Date},
    admin:{type:Number, ref:"Admin", require:false},
    invitedEmails:[],
    members:[],
    rounds:[],
    seasons:[],
    creator: { type:Number, ref: "Creator", required: false }, // make required to True later
  });
  
module.exports = mongoose.model("Group", groupSchema);