const express = require('express');
const router = express.Router();
const subscribedThreadController = require('../controllers/subscribedThreadController');
const { validateToken } = require('../middlewares/authMiddleware');

// get all subscribed threads for a given user
router.get('/all', validateToken, subscribedThreadController.findAll);
// get only the subscriptions that have new content
router.get('/new', validateToken, subscribedThreadController.findNew);

//used to mark a subscripotion as read
router.put('/:id', validateToken, subscribedThreadController.updateTimestamp);

// get single subscription by id
router.get('/:id', validateToken, subscribedThreadController.findOne);

// delete subscription by id for the current user
router.delete('/:id', validateToken,subscribedThreadController.deleteOne);

// add a new subscription for the current user
router.post('/:id',validateToken, subscribedThreadController.add);

module.exports = router;