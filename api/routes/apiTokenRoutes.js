const express = require('express');
const router = express.Router();
const apiTokenController = require('../controllers/apiTokenController')
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.validateToken,  apiTokenController.add);


module.exports = router;