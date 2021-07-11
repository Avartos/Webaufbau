const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const {validateToken, validateAdminStatus} = require('../middlewares/authMiddleware');

// get all users
router.get('/all', validateToken, validateAdminStatus, userController.findAll);

// get one specific user by a given id
router.get('/', validateToken, userController.findOne);

//change the password of the currently logged in user
router.put('/', validateToken, userController.updatePassword);

//change the profile picture that is associated with the currently logged in user account
router.put('/image/:id', validateToken, userController.updateImage);

//updates the whole login of the currently logged in user
router.put('/update/:id', validateToken, validateAdminStatus, userController.updateLogin);

//returns one user by its name
router.post('/login', userController.findOneByName);

//add a new user
router.post('/', userController.add);

module.exports = router;