const { Product } = require('../models/product.model');
const { Category } = require('../models/category.model');

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, price, categoryId, stock } = req.body;

    // Validate input
    if (!name || price == null || price <= 0) {
      return res.status(400).json({ message: 'Invalid product data. Name and positive price are required.' });
    }

    // Create the product
    const product = new Product({ name, price, category: categoryId, stock });
    await product.save();

    // If a category ID is provided, associate the product with the category
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
      }
      category.products.push(product._id);
      await category.save();
    }

    res.status(201).json({ message: 'Product added successfully.', product });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product.', error: error.message });
  }
};

// List all products in a specific category
const listProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Validate category existence
    const category = await Category.findById(categoryId).populate('products');
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    res.status(200).json({ products: category.products });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products.', error: error.message });
  }
};

// Get details of a specific product
const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find product with category details
    const product = await Product.findById(productId).populate('category', 'name description');
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product details.', error: error.message });
  }
};

// Update product details
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, categoryId, stock } = req.body;

    // Validate price if provided
    if (price != null && price <= 0) {
      return res.status(400).json({ message: 'Price must be a positive number.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Update product fields
    if (name) product.name = name;
    if (price != null) product.price = price;
    if (stock != null) product.stock = stock;

    // Handle category reassignment
    if (categoryId && categoryId !== product.category) {
      // Remove product from old category
      if (product.category) {
        const oldCategory = await Category.findById(product.category);
        oldCategory.products.pull(product._id);
        await oldCategory.save();
      }

      // Add product to new category
      const newCategory = await Category.findById(categoryId);
      if (!newCategory) {
        return res.status(404).json({ message: 'New category not found.' });
      }
      newCategory.products.push(product._id);
      await newCategory.save();

      product.category = categoryId;
    }

    await product.save();
    res.status(200).json({ message: 'Product updated successfully.', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product.', error: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Remove product from its category
    if (product.category) {
      const category = await Category.findById(product.category);
      category.products.pull(product._id);
      await category.save();
    }

    await product.remove();
    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product.', error: error.message });
  }
};

module.exports = {
  addProduct,
  listProductsByCategory,
  getProductDetails,
  updateProduct,
  deleteProduct,
};
