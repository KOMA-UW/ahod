const express = require("express");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
const groupsController = require("../controllers/groups");
 
router.post("", groupsController.createGroup);   // create a group
router.get("/members", checkAuth, groupsController.getMembersOfGroup)  // get all members of a group

router.post("/members", checkAuth, groupsController.)  // add a member
router.get("/members:id", checkAuth, groupsController.getMemberDetail)   // get a specific member

router.get("/groups", checkAuth, groupsController.getUserGroups);    // get all groups of a specific group
router.get("/groups:id", checkAuth, groupsController.getGroupDetail);   // get a specific detail groups detail

module.exports = router;