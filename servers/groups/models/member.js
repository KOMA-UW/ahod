const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const memberSchema = new mongoose.Schema({
    _id:Number,
    username: { type: String, require: true },
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, require:true},
    photo:{type:String, required:true},
    groups: [],
    rounds_won: [],
    paid: { type: Boolean, require: true },
    plea_list:[],
    is_owner: {type:Boolean},
    admin_list:[],
    joinedAt:{type:Date, require:true}
  });
  
module.exports = mongoose.model("Member", memberSchema);