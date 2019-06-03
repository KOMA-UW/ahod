"use strict";
const mongoose = require("mongoose");

const seasonSchema = new mongoose.Schema({
    group_id:{type:String, required:true},
    createdAt: {type:Date},
    round_list:[],
    updatedAt:{type:Date},
  });
  
module.exports = mongoose.model("Season", seasonSchema);