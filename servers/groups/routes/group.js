const express = require("express");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
const groupsController = require("../controllers/groups");

router.get("v1/groups", function(req, res) {
  res.send("Hello Groups");
});

router.post("v1/groups", groupsController.createGroup); // create a group
router.get("v1/members", checkAuth, groupsController.getMembersOfGroup); // get all members of a group

router.post("v1/members", checkAuth, groupsController.addMember); // add a member
router.get("v1/members:id", checkAuth, groupsController.getMemberDetail); // get a specific member

// router.get("v1/groups", checkAuth, groupsController.getUserGroups); // get all groups of a specific group
router.get("v1/groups:id", checkAuth, groupsController.getGroupDetail); // get a specific detail groups detail

module.exports = router;
