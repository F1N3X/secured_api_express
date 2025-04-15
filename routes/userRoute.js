const express = require('express');
const router = express.Router();
const { getAllUsers, getMyUser } = require('../controllers/userController');
const authorizer = require('../middlewares/authorizer');

router.get('/users', authorizer, getAllUsers);
router.get('/my-user', authorizer, getMyUser);

module.exports = router;
