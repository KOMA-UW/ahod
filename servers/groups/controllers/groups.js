const Group = require("../models/group");
const Member = require("../models/member");

exports.createGroup = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log("Group Route Hit");
  const group = new Group({
    name: "some name",
    bio: "some bio",
    imagePath: "image",
    createdAt: Date.now(),
    comments: ["comments"],
    admin: "me",
    members: [],
    creator: "req.userData.userId"
  });

  group
    .save()
    .then(createdGroup => {
      res.status(201).json({
        message: "Group Created successfully",
        group: {
          ...createdGroup,
          id: createdGroup._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a group failed"
      });
    });
};

exports.getUserGroups = (req, res, next) => {
  Group.find({})
    .lean()
    .exec((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      } else {
        console.log(result);
        res.set("Content-Type", "application/json");
        res.status(200).send(result);
        return;
      }
    });
};

exports.getGroupDetail = (req, res, next) => {
  Group.findById(req.params.id)
    .lean()
    .exec((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      } else {
        console.log(result);
        res.set("Content-Type", "application/json");
        res.status(200).send(result);
        return;
      }
    });
};

exports.getMembersOfGroup = (req, res, next) => {
  var userID = JSON.parse(req.get("X-User")).id;
  var gId = req.params.groupId;

  Group.findOne({ _id: ObjectId(gId) })
    .then(group => {
      console.log(group);
      if (group.members.indexOf(userID) < 0) {
        res.status(403).send();
        return;
      }
      res.set("Content-Type", "application/json");
      var filter = { groupID: ObjectId(gId) };
      console.log(filter);
      Member.find(filter)
        .sort({ createdAt: -1 })
        .limit(100)
        .lean()
        .exec((err, members) => {
          if (err) {
            throw err;
          }
          console.log(members);
          if (members && members.length > 100) {
            res.status(200).send(members.slice(0, 100));
            return;
          }
          res.status(200).send(members);
          return;
        });
    })
    .catch(e => {
      console.log(e);
      res.status(400).send(e);
      return;
    });
};

exports.getMemberDetail = (req, res, next) => {
  Member.findById(req.params.id)
    .lean()
    .exec((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      } else {
        console.log(result);
        res.set("Content-Type", "application/json");
        res.status(200).send(result);
        return;
      }
    });
};

exports.addMember = (req, res, next) => {
  const group = this.getGroupDetail;
  const member = new Member({
    username: "some name",
    bio: "some bio",
    groups: [],
    paid: false,
    comments: [],
    pleas: [],
    joinedAt: Date.now()
  });

  group.members
    .push()
    .then(member => {
      res.status(201).json({
        message: "Group Created successfully",
        group: {
          ...createdGroup,
          id: createdGroup._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a group failed"
      });
    });
};
