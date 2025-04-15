const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/productsController');

const authorizer = require('../middlewares/authorizer');
const checkPermission = require('../middlewares/checkPermission');

router.get('/', authorizer, checkPermission('can_post_products'), getProducts);
router.post('/',authorizer, checkPermission('can_post_products'), createProduct);

module.exports = router;
