const express = require('express');
const router = express.Router();
const { getMyProducts, getProducts, createProduct } = require('../controllers/productsController');

const authorizer = require('../middlewares/authorizer');
const checkPermission = require('../middlewares/checkPermission');

router.get('/my-products', authorizer, checkPermission('can_get_my_products'), getMyProducts);
router.get('/products', authorizer, checkPermission('can_get_products'), getProducts);
router.post('/products',authorizer, checkPermission('can_post_products'), createProduct);

module.exports = router;
