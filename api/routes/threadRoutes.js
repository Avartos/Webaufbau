const express = require('express');
const router = express.Router();
const threadController = require('../controllers/threadController');

// get all threads that belong to the given forum
router.get('/all/:forumId', threadController.findAll);
// get the thread that belongs to the given id
router.get('/:id', threadController.findOne);
// delete the thread by a given id
router.delete('/:id', threadController.deleteOne);
// post a new thread to the given forum
router.post('/:forumId', threadController.add);

module.exports = router;