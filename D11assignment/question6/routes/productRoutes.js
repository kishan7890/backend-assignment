const express = require('express');
const { addProduct, updateProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/add', addProduct);
router.put('/update/:id', updateProduct);

module.exports = router;
