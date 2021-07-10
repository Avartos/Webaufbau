const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// get all users
router.get('/all', userController.findAll);

// get one specific user by a given id
router.get('/', authMiddleware.validateToken, userController.findOne);

router.put('/', authMiddleware.validateToken, userController.updatePassword);

router.put('/image/:id', authMiddleware.validateToken, userController.updateImage);

router.post('/login', userController.findOneByName);

router.post('/', userController.add);

module.exports = router;