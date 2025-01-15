const { Category } = require('../models/category.model');
const { Product } = require('../models/product.model');

// Add a new category
const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate input
    if (!name) {
      return res.status(400).json({ message: 'Category name is required.' });
    }

    // Create a new category
    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({ message: 'Category added successfully.', category });
  } catch (error) {
    res.status(500).json({ message: 'Error adding category.', error: error.message });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('products', 'name price stock');
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories.', error: error.message });
  }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId).populate('products', 'name price stock');
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving category.', error: error.message });
  }
};

// Update category description
const updateCategoryDescription = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: 'Description is required.' });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    category.description = description;
    await category.save();

    res.status(200).json({ message: 'Category updated successfully.', category });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category.', error: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { moveToUncategorized } = req.query;

    const category = await Category.findById(categoryId).populate('products');
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    if (moveToUncategorized === 'true') {
      // Find or create "Uncategorized" category
      let uncategorized = await Category.findOne({ name: 'Uncategorized' });
      if (!uncategorized) {
        uncategorized = new Category({ name: 'Uncategorized', description: 'Default category for uncategorized products.' });
        await uncategorized.save();
      }

      // Move products to "Uncategorized"
      await Product.updateMany(
        { _id: { $in: category.products.map((p) => p._id) } },
        { $set: { category: uncategorized._id } }
      );

      uncategorized.products.push(...category.products.map((p) => p._id));
      await uncategorized.save();
    } else {
      // Delete all products in the category
      await Product.deleteMany({ _id: { $in: category.products.map((p) => p._id) } });
    }

    await category.remove();
    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category.', error: error.message });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryDescription,
  deleteCategory,
};
