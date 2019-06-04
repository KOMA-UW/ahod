const Member = require("../models/member");
const Group = require("../models/group");
const error = require('util').error;

// calculate payment consistency
// and calculate their social credit through their consistency and 
// store it with members.

// let temp_user = {
//    id: 7,
//    userName: "some",
//    firstName: "some",
//    lastName: "some",
//    photoURL: "https://www.gravatar.com/avatar/ddf2d077f3e3aadc78a244cd08e169a7"
// };

const contentTypeHeader = "Content-Type"
const contentTypeText = "text/plain"
const contentTypeJSON = "application/json"


function checkAuth(req, res) {
   var currUser = req.get("X-User");
   if (currUser) {
      return JSON.parse(currUser)
   }
   writeResponseText(res, 401, "User Not Authenticated")
   return null
}

function writeResponseText(res, statusCode, statusText) {
   res.setHeader(contentTypeHeader, contentTypeText);
   res.status(statusCode).send(statusText);
}

exports.getOneMember = (req, res, next) => {

   let temp_user = checkAuth(req,res);

   if(temp_user) {
      Member.find(req.params.id)
            .lean()
            .exec((err, result) => {
            if (err) {
                  res.status(500).send(err);
            } else {
                  res.set('Content-Type', 'application/json');
                  res.status(200).send(result);
                  return;
            }
      });
      }
}


exports.getMembersGroups = (req, res, next) => {
   let temp_user = checkAuth(req,res);

   if(temp_user) {
      Member.findById(req.params.id)
            .lean()
            .exec((err, result) => {
            if (err) {
                  res.status(500)
                  .send(err);
            } else {
                  res.set('Content-Type', 'application/json');
                  if (result !== null) {
                  res.status(200).send(result.groups);
                  return;
                  }
            }
            });
      }
}

// update members information
exports.updateMembersInfo = (req, res, next) => {
    let user = checkAuth(req,res);

    if(user) {

      const newInfo = new Member({
            username: req.body.username,
            email: req.body.email,
            bio: req.body.bio,
            paid: false,
            plea_list: [],
            round: 0,
            is_admin: [],
            updatedAt: Date.now()
      });

      Member.updateOne({
            _id: req.params.id,
            creator: req.params.id
            }, newInfo)
            .then(result => {
                  if (result.n > 0) {
                        res.status(200).json({ members: "Updated Successful!" })
                  } else {
                        res.status(401).json({ members: "Not Authorized" })
                  }
            })
            .catch(error => {
                  res.status(500).json({ members: "Updating a member's details failed!" });
            });
      }
}
