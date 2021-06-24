const express = require('express');
const router = express.Router();
const threadController = require('../controllers/threadController');

router.get('/all/:forumId', threadController.findAll);
router.get('/:id', threadController.findOne);
router.delete('/:id', threadController.deleteOne);
router.post('/:forumId', threadController.add);
router.put('/:id', threadController.subscribeThread);

module.exports = router;