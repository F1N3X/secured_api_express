const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productsController');

router.get('/', getProducts);
router.post('/', createProduct);

module.exports = router;
