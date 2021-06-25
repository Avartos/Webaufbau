const express = require('express');
const router = express.Router();
const subscribedThreadController = require('../controllers/subscribedThreadController');

router.get('/all', subscribedThreadController.findAll);
router.get('/new', subscribedThreadController.findNew);
router.get('/:id', subscribedThreadController.findOne);
router.delete('/:id', subscribedThreadController.deleteOne);
router.post('/:id', subscribedThreadController.add)

module.exports = router;