const express = require('express');
const router = express.Router();
const threadController = require('../controllers/threadController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/search', threadController.findByName)
// get all threads that belong to the given forum
router.get('/all/:forumId', authMiddleware.extractUserFromToken, threadController.findAll);

// get the thread that belongs to the given id
router.get('/:id', authMiddleware.extractUserFromToken, threadController.findOne);

// post a new thread to the given forum
router.post('/:forumId', authMiddleware.validateToken, threadController.add);

// update title or content of an existing thread
router.put('', authMiddleware.validateToken, threadController.update);

module.exports = router;