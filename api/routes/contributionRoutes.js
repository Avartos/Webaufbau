const express = require('express');
const router = express.Router();
const contributionsController = require('../controllers/contributionsController');

router.get('/all/:threadId', contributionsController.findAll);
router.get('/:id', contributionsController.findOne);
router.delete('/:id', contributionsController.deleteOne);
router.put('/:id', contributionsController.update);

module.exports = router;