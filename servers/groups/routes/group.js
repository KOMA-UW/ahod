const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/groups');
const fileProcessor = require('../middleware/file_processor');

// ** Group APIs **
router.post('', fileProcessor, groupsController.createGroup); // create a group  **WORKS** add check-auth later
router.get('/:id/members', groupsController.getAllMembersOfGroup); // get all members of a group [{}]
router.get('/:id', groupsController.getGroupDetail); // get a specific detail of a group **"WORKS"** add check-auth latter
router.put('/:id', groupsController.updateGroupDetails); // update a group details
router.post('/:id/invite', groupsController.inviteNewMembers);
router.post('/:id/members', groupsController.joinAGroup);

// ** PLEA APIs **
router.post('/:id/plea', groupsController.addPlea); // Add a plea to the group  **WORKS**
router.get('/:id/plea', groupsController.getAllPleaOfGroup); // get all pleas ** WORKS **
router.get('/:id/plea/:pleaId', groupsController.getPleaByID); // get a plea by id  **WORKS**
router.post('/:id/plea/:pleaId', groupsController.vote); // vote up, works for now, test with UI ****

// ** Winner Selection APIs **
router.post('/:id/round', groupsController.chooseWinnerOfRound); // choose a winner of a round
router.get('/:id/round', groupsController.getGroupRounds); // get all rounds of a group

module.exports = router;
