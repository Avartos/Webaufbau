const express = require('express');
const router = express.Router();
const threadController = require('../controllers/threadController');

router.get('/:forumId/', threadController.getAllThreads);
router.get('/:id', threadController.getSingleThread);
router.delete('/:id', threadController.deleteSingleThread);
router.post('/:forumId', threadController.addThread);
router.put('/:id', threadController.subscribeThread);

module.exports = router;