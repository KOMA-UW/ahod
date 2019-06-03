const error = require('util').error;
const Group = require("../models/group");
const Member = require("../models/member");
const Plea = require("../models/plea");
const Invitation = require("../models/invitation");
const Round = require('../models/round');

const crypto = require('crypto');

const generator = require('generate-password');
const sgMail = require('@sendgrid/mail')

// for voting like/dislike
let Pusher = require('pusher');

let pusher = new Pusher({
   appId: process.env.PUSHER_APP_ID,
   key: process.env.PUSHER_APP_KEY,
   secret: process.env.PUSHER_APP_SECRET,
   cluster: 'us3'
});

// let temp_user = { // for testing purposes
//    id: 43,
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
   res.status(statusCode)
      .send(statusText);
}

// creat a group
exports.createGroup = (req, res, next) => {

  let temp_user = checkAuth(req,res);

  if(temp_user) {

    const url = req.protocol + "://" + req.get("host");
    const imgPath = (req.file != null) ? (url + "/images/" + req.file.filename) : "";


    let group = new Group({
        name: req.body.name,
        bio: req.body.bio,
        group_code: Math.floor(1000 + Math.random() * 9000),
        imagePath: imgPath,
        location: "Seattle, WA",
        createdAt: Date.now(),
        plea_list: [],
        capital: req.body.capital,
        IMC: req.body.IMC,
        updatedAt: null,
        admin: temp_user.id,
        members: [temp_user.id],
        invitedEmails: req.body.invitedEmails,
        creator: temp_user.id
    });

    group.save()
        .then(createdGroup => {
          createdGroup.invitedEmails.forEach((email) => {

              // send invitation to a list of emails that the creator wants to invite
              sendInvite(email, createdGroup.id, createdGroup.name,
                    temp_user.firstName, req.headers.host,
                    createdGroup.group_code)
                .then((list) => {
                    return list;
                })
                .catch(error => {
                    return error;
                });
          });

          Member.findById(temp_user.id)
              .then((member) => {
                if (!member) {
                    const newMember = new Member({
                      _id: temp_user.id,
                      username: temp_user.userName,
                      firstname: temp_user.firstName,
                      lastname: temp_user.lastName,
                      email: temp_user.email,
                      photo: temp_user.photoURL,
                      groups: [createdGroup._id],
                      paid: false,
                      is_owner: true,
                      admin_list: [createdGroup._id],
                      pleas: [],
                      joinedAt: Date.now()
                    });

                    group.members.push(
                      newMember); // add new member to the group

                    // addding member to the group
                    group.save()
                      .then(newMemb => {
                          res.status(200)
                            .json({
                                message: "member added"
                            });
                      })
                      .catch(error => {
                          res.status(500)
                            .json({
                                message: "adding member failed"
                            });
                      });

                } else {

                    let index = group.members.find(memb => memb._id ===
                      member._id);

                    if (index == undefined && member._id !== group
                      .creator) {

                      group.members.push(
                          member); // add new member to the group
                      member.groups.push(
                          group); // add new group to the member

                      // addding member to the group
                      group.save()
                          .then(newMemb => {
                            res.status(200)
                                .json({
                                  message: "member added"
                                });
                          })
                          .catch(error => {
                            res.status(500)
                                .json({
                                  message: "adding member failed"
                                });
                          });

                      // adding group to member
                      member.save()
                          .then(newMemb => {
                            res.status(200)
                                .json({
                                  message: "group added"
                                });
                          })
                          .catch(error => {
                            res.status(500)
                                .json({
                                  message: "adding group failed"
                                });
                          });
                    } else {
                      res.status(400)
                          .json({
                            message: "member already exists"
                          });
                    }
                }
              })
              .catch((error) => {
                res.status(500)
                    .json({
                      message: "No member"
                    });
                return;
              });

          res.status(201)
              .json({
                message: "Group Created successfully",
                group: createdGroup
              });
        })
        .catch(error => {
          res.status(500)
              .json({
                message: "Creating a group failed"
              })
        });
    }
}


exports.inviteNewMembers = async (req, res, next) => {
  let temp_user = checkAuth(req,res);

  if(temp_user) {
    Group.findById(req.params.id)
        .then((group) => {
          req.body.invitedEmails.forEach((email) => {

              group.invitedEmails.push(email);

              group.save()
                .then((grp) => {
                    return grp
                })
                .catch(error => {
                    return error;
                });
              // send invitation to a list of emails that the creator wants to invite
              sendInvite(email, req.params.id, group.name,
                    temp_user.firstName, req.headers.host, group
                    .group_code)
                .then((list) => {
                    pusher.trigger('notifications', 'Invitation sent', email, req.headers['x-socket-id']); // notify
                    return list;
                })
                .catch(error => {
                    return error;
                });
          });
        })
        .catch((error) => {
          res.status(500)
              .json({
                message: "inviting new members failed."
              });
        });
    }
}


async function sendInvite(email, groupID, groupName, creatorName, host,
   group_code) {

   sgMail.setApiKey(process.env.SENDGRID_API_KEY);

   let temp_token = crypto.randomBytes(10)
      .toString('base64');
   let temp_password = generator.generate({
      length: 10,
      numbers: true
   });

  //  let url = 'https://' + host + '/group/' + groupID + '/join/' + temp_token;
   let url = "https://"+host+'onboarding' + 'https://payinpayout.tech/onboarding'

   const inviteMessage = {
      to: email,
      from: 'invite@clique.tech',
      subject: `Invitation to join ${groupName}`,
      html: `<strong> Hello ${email}, this is ${creatorName} from ${groupName}. <br> We want you to join our clique and save money. '\n
       Use the following link to join out clique: '\n` + url + `'\n\n </strong>
       Here is the group code you could use to joing our group: <i>${group_code}</i>. 
      <br>
       <strong>Instructions: </strong>
       <ol>
          <li>Follow the link to a new tab</li>
          <li>Log-in or sign-up</li>
          <li>you will be redirected to join page</li>
          <li>Insert the group code.</li>
          <li>Join and start saving money.</li>
       </ol>
       `
   };

   // add the emails in which an invitation has been sent for
   let newInvitation = new Invitation({
      emailTo: email,
      group_code: group_code,
      createdAt: Date.now(),
      groupID: groupID,
      token: temp_token,
      password: temp_password,
   });

   sgMail.send(inviteMessage)
      .then(() => {

         newInvitation.save()
            .then(invite => {
               return invite;
            })
            .catch(error => {
               return error;
            });

      })
      .catch((error) => {
         return error;
      });
}

exports.joinAGroup = (req, res, next) => {

  let temp_user = checkAuth(req,res);

  if(temp_user) {
    let invitedUserEmail = temp_user.email;
    let inputPass = req.body.code;
    let member = temp_user;

    Group.findOne({
          group_code: req.body.group_code
        })
        .then((group) => {
          if (!group) {
              res.status(403)
                .json({
                    message: "No group with this code"
                });
          }

          Member.findById(temp_user.id)
              .then((member) => {

                let index = group.members.find(memb => memb._id ===
                    member._id);

                if (index == undefined && member._id !== group.creator) {
                    group.members.push(member); // add new member to the group
                    member.groups.push(group); // add new group to the member

                    // addding member to the group
                    group.save()
                      .then(newMemb => {
                          res.status(200)
                            .json({
                                message: "member added"
                            });
                      })
                      .catch(error => {
                          res.status(500)
                            .json({
                                message: "adding member failed"
                            });
                      });

                    // adding group to member
                    member.save()
                      .then(newMemb => {
                          res.status(200)
                            .json({
                                message: "group added"
                            });
                      })
                      .catch(error => {
                          res.status(500)
                            .json({
                                message: "adding group failed"
                            });
                      });
                } else {
                    res.status(400)
                      .json({
                          message: "member already exists"
                      });
                }

              })
              .catch((error) => {
                res.status(500)
                    .json({
                      message: "No member"
                    });
              });
        })
        .catch((error) => {
          res.status(500)
              .json({
                message: "finding group failed"
              });
        });
    }
}


// update a group details
exports.updateGroupDetails = (req, res, next) => {

  let temp_user = checkAuth(req,res);

   if(temp_user) {

      let imagePath = req.body.imagePath;

      if (req.file) {
          const url = req.protocol + "://" + req.get("host");
          imagePath = url + "/images/" + req.file.filename;
      }

      Member.findById(temp_user.id).then((member)=>{
        const newGroup = new Group({
          name: req.body.name,
          bio: req.body.bio,
          imagePath: imagePath,
          updatedAt: Date.now(),
          admin: temp_user.id,
          capital: req.body.capital,
          IMC: req.body.IMC,
          creator: temp_user.id
      });

      Group.updateOne({_id: req.params.id, admin: temp_user.id}, newGroup)
          .then(result => {
            if (result.n > 0) {
                res.status(200).json({  members: "Updated Successful!" })
            } else {
                res.status(401).json({ members: "Not Authorized" });
            }
          })
          .catch(error => {
            res.status(500).json({ members: "Updating a group details failed!" });
          });
      }).catch((error)=>{
        res.status(500).json({members: "Updating a group details failed!"});
      });
        
    }
};

// get the detail of one group
exports.getGroupDetail = (req, res, next) => {
  let temp_user = checkAuth(req,res);

   if(temp_user) {
      Group.findById(req.params.id)
          .lean()
          .exec((err, result) => {
            if (err) {
                res.status(500)
                  .send(err);
                return;
            } else {
                res.set('Content-Type', 'application/json');
                res.status(200)
                  .send(result);
                return;
            }
          });
    }
}

exports.getPleaByID = (req, res, next) => {

  let temp_user = checkAuth(req,res);

   if(temp_user) {
    Plea.findById(req.params.pleaId)
        .lean()
        .exec((err, result) => {
          if (err) {
              return res.status(500)
                .send(err);
          } else {
              res.set('Content-Type', 'application/json');
              return res.status(200)
                .send(result);
          }
      });
  }
}

exports.getAllPleaOfGroup = (req, res, next) => {

  let temp_user = checkAuth(req,res);

   if(temp_user) {
     Group.findById(req.params.id)
          .lean()
          .exec((err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.set('Content-Type', 'application/json');
                res.status(200).send(result.plea_list);
                return;
            }
      });
  }
}

exports.getAllMembersOfGroup = (req, res, next) => {
  let temp_user = checkAuth(req,res);

   if(temp_user) {
      Group.findById(req.params.id)
          .lean()
          .exec((err, result) => {
            if (err) {
                res.status(500)
                  .send(err);
            } else {
                res.set('Content-Type', 'application/json');
                res.status(200)
                  .send(result.members);
                return;
            }
      });
    }
}

// adding plea for the group
exports.addPlea = (req, res, next) => {
   let temp_user = checkAuth(req,res);

   if(temp_user) {
      let plea = new Plea({
          text: req.body.text,
          groupID: req.params.id,
          likes: 0,
          createdAt: Date.now(),
          voters: [],
          creator: temp_user.id,
      });

      plea
          .save()
          .then(createdPlea => {

            // add it to the groups plea list
            Group.findById(req.params.id)
            .updateOne({
              $push: {
                  plea_list: {
                    $each: [plea]
                  }
              }
            })
            .lean()
            .exec((err, result) => {
              if (err) {
                  res.status(500)
                    .send(err);
                  return;
              } else {
                  res.set('Content-Type', 'application/json');
                  res.status(200)
                    .send(result);
                  return;
              }
            });

            // add it to the user's plea list
            Member.findById(temp_user.id)
          .updateOne({
            $push: {
                plea_list: {
                  $each: [plea]
                }
            }
          })
          .lean()
          .exec((err, result) => {
            if (err) {
                res.status(500)
                  .send(err);
                return;
            } else {
                res.set('Content-Type', 'application/json');
                res.status(200)
                  .send(result);
                return;
            }
          });

            res.status(201)
                .json({
                  message: "Plea Created successfully",
                  createdPlea,
                });
          })
          .catch(error => {
            res.status(500)
                .json({
                  message: "Creating a plea failed"
                });
          });
      }   
}

// like and like a plea
exports.vote = (req, res, next) => {
  let temp_user = checkAuth(req,res);

  if(temp_user) {
      const action = req.body.action;
      const counter = action === 'Like' ? 1 : -1;

      Plea.update({
          _id: req.params.pleaId
      }, {
          $inc: {
            likes: counter
          }
      }, {}, (err, numberAffected) => {
          pusher.trigger('plea-events', 'pleaAction', {
            action: action,
            pleaId: req.params.pleaId
          }, req.body.socketId);
          res.send('' + action);
      });
  }
}

// choose a winner
exports.chooseWinnerOfRound = (req, res, next) => {
  let temp_user = checkAuth(req,res);

   if(temp_user) {
      Group.findById(req.params.id).then((group) => {
        let candidates = req.body.candidates; // [{}]
            if (group.rounds.length < group.members.length) { // check if everyone has got a chance to win or not
                if (candidates.length > 0) {
                  if (candidates.length < group.members.length) { // first round of the group

                    let randomNumber = Math.floor(Math.random() * (candidates.length));
                    let index = group.rounds.find(memb => memb._id === candidates[randomNumber]._id);

                    if(index === undefined) {// if the current winner did not win last time. 
                        const round = new Round({
                            candidates: candidates,
                            group_id: group._id,
                            times: candidates.length,
                            beginDate: Date.now(),
                            winner: candidates[randomNumber]
                        });

                        // round is save here
                          round.save().then((rnd)=>{return rnd;}).catch((error) => {
                              if (error) {
                                res.status(500).json({  message: "saving the round failed" });
                                return;
                              }
                          });

                          group.rounds.push(round);
                          group.save().then((grp)=>{return grp;}).catch((error) =>{
                              res.status(500).json({  message: "saving the group failed" });
                              return;
                          });  
                          
                    }
                  } else if (candidates.length == 1) {

                    let index = group.rounds.find(memb => memb._id === candidates[randomNumber]._id);
                    
                    if(index === undefined) { // if the current winner did not win last time. 
                          const  round = new Round({
                              candidates: candidates,
                              group_id: group._id,
                              times: candidates.length,
                              beginDate: Date.now(),
                              winner: candidates[0] // the first/last one is the winner
                            });

                            // round is save here
                          round.save().then((rnd)=>{}).catch((error) => {
                            if (error) {
                              res.status(500).json({  message: "saving the round failed" });
                              return;
                            }
                        });

                        group.rounds.push(round);
                        group.save().then((grp)=>{}).catch((error) =>{
                          if (error) {
                            res.status(500).json({  message: "saving the group failed" });
                            return;
                          }
                        });
                     }                
                  }
                }
            } else if (group.rounds.length === group.members.length && candidates.length > 0 && group.members.length > 0) { //everyone got a chance to win.
                if(group.rounds.length == group.members.length){
                  group.seasons.push(group.rounds);
                  group.rounds = [] // once everyone has participated, empty out the rounds of each group
                  group.save().then((grp)=>{return;}).catch((error) =>{
                    if (error) {
                      res.status(500).json({  message: "saving the group failed" });
                      return;
                    }
                  });
                }  
            }
            res.status(200).json({  message: "Selecting the winner success", winner:group.rounds.pop().winner});
          }).catch((error) => {
              res.status(500).json({  message: "Selecting the winner failed" });
              return;
        });
    }
};

exports.getGroupRounds = (req,res,next) =>{
  let temp_user = checkAuth(req,res);

   if(temp_user) {
      Group.findById(req.params.id).then((group) =>{
        res.status(200).json({  message: "Getting all rounds success", rounds:group.rounds });
      }).catch((error)=>{
          res.status(500).json({ message: "Error getting the rounds" });
      });
  }
}

// make a payment
