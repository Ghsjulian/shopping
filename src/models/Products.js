//const mongoose = require("../database/db.js");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_title: String,
    product_img: String,
    product_desc: Object,
    product_category: String,
    updated_date: { type: Date, default: Date.now },
    author: { type: String, default: "Ghs Julian" }
});

const Product = mongoose.model("products", productSchema, "products");

module.exports = Product;
