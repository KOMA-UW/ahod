"use strict";
const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
    emailTo:{type:String, required:true},
    group_code:{type:Number, required:true},
    createdAt: {type:Date, default: Date.now()},
    groupID:{type:String, required:true},
    token:{type:String},
    password:{type:String}
});


invitationSchema.methods.hasExpired = function(){
    var now = Date.now();
    return (now - Date.parse(createDate)) > 300000; // 5 minutes
    // return (now - Date.parse(createDate)) > 604800000; // Date is converted to milliseconds to calculate 7 days it > one day = 24 hours * 60 minutes * 60 seconds *1000 milliseconds * 7 days = 604800000
};

module.exports = mongoose.model("Invitation", invitationSchema);