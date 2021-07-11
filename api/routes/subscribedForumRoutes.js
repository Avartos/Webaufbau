const express = require('express');
const router = express.Router();
const subscribedForumController = require('../controllers/subscribedForumController');
const { validateToken } = require('../middlewares/authMiddleware');


// get all subscribed forums for the current user
router.get('/', validateToken, subscribedForumController.findAll);

// add subscription by the id of the forum
router.get('/new', validateToken, subscribedForumController.findNew);

// mark a notification as read by updating its timestamp
router.put('/:id', validateToken,  subscribedForumController.updateTimestamp);

// get one specific subscribed forum by a given id
router.get('/:id', validateToken, subscribedForumController.findOne);

// delete subscription by id of the forum
router.delete('/:id', validateToken,subscribedForumController.deleteOne);

// add a new subscription for the current user
router.post('/:id',validateToken, subscribedForumController.add)



module.exports = router;