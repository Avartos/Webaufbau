const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// get all users
router.get('/', userController.findAll);
// get one specific user by a given id
router.get('/:id', userController.findOne);

router.post('/login', userController.findOneByName);

router.post('/', userController.add);

module.exports = router;