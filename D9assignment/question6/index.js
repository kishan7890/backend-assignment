const express = require("express");
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productsRoutes");


const app = express();


app.use(express.json());

app.use("/users",userRoutes);
app.use("/products",productRoutes);


app.listen(8080, async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/users-products-management");
        console.log("connected to db")
        console.log("server is running at http://localhost:8080");
    } catch (error) {
        console.log(error);
    }
})