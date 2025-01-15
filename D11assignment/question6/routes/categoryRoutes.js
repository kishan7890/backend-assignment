const express = require('express');
const { addCategory,updateCategoryDescription } = require('../controllers/categoryController');
const router = express.Router();

router.post('/add', addCategory);
router.put('/update/:id', updateCategoryDescription);

module.exports = router;
