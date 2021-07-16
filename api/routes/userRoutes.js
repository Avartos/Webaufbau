const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// get all users
router.get('/all', authMiddleware.validateToken, authMiddleware.validateAdminStatus, userController.findAll);

// get one specific user by a given id
router.get('/', authMiddleware.validateToken, userController.findOne);

//change the password of the currently logged in user
router.put('/', authMiddleware.validateToken, userController.updatePassword);

//change the profile picture that is associated with the currently logged in user account
router.put('/image/:id', authMiddleware.validateToken, userController.updateImage);

//updates the whole login of the currently logged in user
router.put('/update/:id', authMiddleware.validateToken, authMiddleware.validateAdminStatus, userController.updateLogin);

//returns one user by its name
router.post('/login', userController.login);

//add a new user
router.post('/', userController.add);

module.exports = router;