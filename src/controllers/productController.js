const Product = require("../models/Products");
const User = require("../models/Users");
const mongoose = require("mongoose");
const multer = require("multer");
const myFunction = require("../auth/functions");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
var apiUrl = process.env.API_URL;

class Products {
    async addProduct(req, res) {
        const data = JSON.parse(req.body.data);
        const productImg = req.file.filename;
        const product_obj = data.product_obj;
        const category = data.product_category;
        const title = data.product_title;
        // Validation

        if (!data || !productImg) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "All Fields Are Required"
            });
        }
        if (data && productImg) {
            const newProduct = new Product({
                product_title: title,
                product_img: apiUrl + "/uploads/" + productImg,
                product_desc: product_obj,
                product_category: category
            });
            const save = await newProduct.save();
            if (save) {
                res.status(201).json({
                    code: 201,
                    type: true,
                    status: "success",
                    success: "Product Added Successfully"
                });
            } else {
                res.status(403).json({
                    code: 403,
                    type: false,
                    status: "failed",
                    error: "Error Adding Products"
                });
            }
        }
    }
    async updateProduct(req, res) {
        const isImage = req.body.isImage === "YES" ? true : false;
        var productImg = "";
        const oldImg = req.body.img;
        const product_desc = JSON.parse(req.body.product_desc);
        const product_category = req.body.product_category;
        const product_title = req.body.product_title;
        if (isImage) {
            productImg = req.file.filename;
        }
        const obj = {
            product_desc,
            product_category,
            product_title,
            product_img: isImage ? apiUrl + "/uploads/" + productImg : oldImg
        };
        try {
            const update = await Product.findByIdAndUpdate(req.params.id, obj);
            if (update) {
                res.status(200).json({
                    code: 200,
                    type: true,
                    status: "success",
                    success: "Product Updated Successfully"
                });
            } else {
                res.status(500).json({
                    code: 500,
                    type: false,
                    status: "error",
                    error: "Product Updated Failed"
                });
            }
        } catch (error) {
            res.status(500).json({
                code: 500,
                type: false,
                status: "error",
                error: error
            });
        }
    }
    async fetchProduct(req, res) {
        const products = await Product.find().exec();
        res.status(200).json({
            code: 200,
            products,
            type: true,
            status: "success",
            success: "Everything Is okay"
        });
    }
    async categoryProduct(req, res) {
        const products = await Product.find({
            product_category: req.params.category
        });
        res.status(200).json({
            code: 200,
            products,
            type: true,
            status: "success",
            success: "Everything Is okay"
        });
    }
    /*
    async viewProduct(req, res) {
        console.log(req.params.id);
        const products = await Product.findfindById(req.params.id).exec();
        console.log(products);
        res.status(200).json({
            code: 200,
            products,
            type: true,
            status: "success",
            success: "Everything Is okay"
        });
    }
    */

    async viewProduct(req, res) {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId).exec();
            console.log(product);
            if (!product) {
                return res.status(404).json({
                    code: 404,
                    message: "Product not found",
                    type: false,
                    status: "error",
                    error: "Product not found"
                });
            }
            res.status(200).json({
                code: 200,
                product,
                type: true,
                status: "success",
                success: "Product fetched successfully"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async allProduct(req, res) {
        const products = await Product.find().exec();
        res.status(200).json({
            code: 200,
            products,
            type: true,
            status: "success",
            success: "Everything Is okay"
        });
    }
    async editProduct(req, res) {
        const products = await Product.findOne({ _id: req.params.id });
        res.status(200).json({
            code: 200,
            products,
            type: true,
            status: "success",
            success: "Everything Is okay"
        });
    }
    async deleteProduct(req, res) {
        const products = await Product.deleteOne({ _id: req.params.id });
        res.status(200).json({
            code: 200,
            products,
            type: true,
            status: "success",
            success: "Everything Is okay"
        });
    }
}
let product = new Products();
module.exports = product;
