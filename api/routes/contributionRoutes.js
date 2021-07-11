const express = require('express');
const router = express.Router();
const contributionsController = require('../controllers/contributionController');
const authMiddleware = require('../middlewares/authMiddleware');

//get all contributions that belong to a given thread
router.get('/all/:threadId', authMiddleware.extractUserFromToken, contributionsController.findAll);
// get one specific contribution by a given id
router.get('/:id', contributionsController.findOne);
// delete the contribution with the given id
router.delete('/:id', contributionsController.deleteOne);
//add the contribution with the given id
router.post('/:threadId', authMiddleware.validateToken, contributionsController.add)
// update the contribution with the given id
router.put('/:id', contributionsController.update);

module.exports = router;