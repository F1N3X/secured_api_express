const express = require('express');
const router = express.Router();
const { newCommande } = require('../controllers/commandesController');

router.post('/', newCommande);

module.exports = router;
