const express = require('express');
const router = express.Router();
const { getAllUsers, getMyUser } = require('../controllers/userController');
const authorizer = require('../middlewares/authorizer');
const checkPermission = require('../middlewares/checkPermission');

router.get('/users', authorizer, checkPermission('can_get_users'), getAllUsers);
router.get('/my-user', authorizer, checkPermission('can_get_my_user'), getMyUser);

module.exports = router;
