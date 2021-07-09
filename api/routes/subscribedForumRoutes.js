const express = require('express');
const router = express.Router();
const subscribedForumController = require('../controllers/subscribedForumController');
const { validateToken } = require('../middlewares/authMiddleware');


// get all subscribed forums for the current user
router.get('/', subscribedForumController.findAll);

router.get('/new', subscribedForumController.findNew);

// get one specific subscribed forum by a given id
router.get('/:id', subscribedForumController.findOne);

// delete subscription by id for the current user
router.delete('/:id', validateToken,subscribedForumController.deleteOne);
// add a new subscription for the current user
router.post('/:id',validateToken, subscribedForumController.add)



module.exports = router;