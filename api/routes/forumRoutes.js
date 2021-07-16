const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const authMiddleware = require('../middlewares/authMiddleware');

// get all forums with relevant information
router.get('/', authMiddleware.extractUserFromToken, forumController.findAll);

// get the requested entry objects
router.get('/search', forumController.findByName);

// get a forum with a given id
router.get('/:id', authMiddleware.extractUserFromToken, forumController.findOne);


module.exports = router;