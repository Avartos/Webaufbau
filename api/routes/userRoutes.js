const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.findAll);
router.get('/:id', userController.findOne);

module.exports = router;