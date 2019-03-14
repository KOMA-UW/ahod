"use strict";
const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
    name: { type: String, require: true },
    bio: { type: String, require: true },
    imagePath: { type: String, require: true },
    createdAt: {type:Date},
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
    admin:{type:mongoose.Schema.Types.ObjectId, ref:"admin", require:true},
    members:{type:[mongoose.Schema.Types.ObjectId], ref: "Users", required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  });
  
module.exports = mongoose.model("Group", groupSchema);


// module.exports = class Group {
//     constructor(id, name, description, createdAt, creator) {
//         this.id = id;
//         this.name = title;
//         this.description = description;
        // this.admin = create.id,
//         this.createdAt = createdAt;
//         this.creator = creator;
//         this.comments = [];
//         this.members = [];
//         this.pleas = [];
//     }

//     setID(id) {
//         this.id = id;
//     }

//     setCreator(creator) {
//         this.creator = creator;
//     }

//     addComment(comment){
//         this.comments.push(comment)
//     }
// }