const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:[true,"product name is required"],
        maxlength:[50,"Product name cannot exceed 50 characters"],
        trim:true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
          values: ['Electronics', 'Clothing', 'Books', 'Home Appliances'],
          message: 'Category must be one of Electronics, Clothing, Books, or Home Appliances',
        },
    },
    stock:{
        type:Number,
        required:[true,"a stock quantity is required"],
        min:[0,"stock cannot be negative"],
        validate:{
            validator:Number.isInteger,
            message:"stock must be a integer"
        }
    },
    SKU: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true,
        match: [/^PROD-[A-Za-z0-9]{4}$/, 'SKU must follow the format PROD-XXXX'],
    },
    tags: {
        type: [String],
        validate: {
          validator: function (tags) {
            if (!tags || tags.length === 0) return true; // Optional field
            const regex = /^[a-zA-Z0-9]+$/;
            const uniqueTags = new Set(tags);
            return tags.every(tag => regex.test(tag)) && tags.length === uniqueTags.size;
          },
          message: 'Tags must be non-empty alphanumeric strings without duplicates',
        },
      }
});

module.exports = mongoose.model('Product', productSchema);