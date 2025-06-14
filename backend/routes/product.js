const express = require('express');
const { getproducts, getsingleproduct } = require('../controllers/productcontrollers');
const router = express.Router();

router.route('/products').get(getproducts);
router.route('/product/:id').get(getsingleproduct);

module.exports = router;