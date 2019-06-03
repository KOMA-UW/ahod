const express = require("express");
const router = express.Router();
const memberController = require("../controllers/members");

router.get("/:id/groups", memberController.getMembersGroups)   // get a specific member ** WORKS ** Add auth later
router.get("/:id", memberController.getOneMember)      // get a specific member ** WORKS ** Add auth later
router.put("/:id", memberController.updateMembersInfo)   // update Member's info **WORKS** add check authenthications

module.exports = router;