// const mongoose = require("mongoose");
const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    username: { type: String, require: true },
    bio: { type: String, require: true },
    groups: [{
        groupId: {type:String},
        admin : {type:Boolean, require:true} ,
        dateJoinedGroup:{type:Date, require:true},
    }],
    paid: { type: Boolean, require: true },
    comments:[ 
        {
            type:String
        }
    ],
    pleas:[
        {
            type:String
        }
    ],
    joinedAt:{type:Date, require:true}
  });
  
module.exports = mongoose.model("Member", memberSchema);

/*
"use strict";

module.exports = class Member {
    constructor(id, name, admin, description, dateJoined) {
        this.id = id;
        this.name = title;
        this.groups = [];
        this.admin = create.id,
        this.pleas = [];
        this.paid = boolean;
        this.dateJoined= ""
    }

    setID(id) {
        this.id = id;
    }
}*/