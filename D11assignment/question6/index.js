const express = require("express");
const mongoose = require("mongoose")
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");


const app = express();


app.use(express.json());

app.use("/products",productRoutes);
app.use("/categories",categoryRoutes);


app.listen(8080, async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/products-management");
        console.log("connected to db")
        console.log("server is running at http://localhost:8080");
    } catch (error) {
        console.log(error);
    }
})