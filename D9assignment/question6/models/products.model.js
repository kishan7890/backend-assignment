const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    ratings:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model("Product", productSchema);