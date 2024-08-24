const Product = require("../models/Products");
const User = require("../models/Users");
const Order = require("../models/Order");
const multer = require("multer");
const myFunction = require("../auth/functions");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
var apiUrl = process.env.API_URL;

class Confirmorder {
    async AcceptOrder(req, res) {
        try {
            const newOrder = new Order(req.body);
            const save = await newOrder.save();
            if (save) {
                res.status(200).json({
                    code: 200,
                    type: true,
                    status: "success",
                    success: "Order Has Been Placed Successfully"
                });
            } else {
                res.status(403).json({
                    code: 403,
                    type: false,
                    status: "failed",
                    error: "Order Failed"
                });
            }
        } catch (error) {
            res.status(403).json({
                code: 403,
                type: false,
                status: "failed",
                error
            });
        }
    }
    async getOrderById(req, res) {
        try {
            const order = await Order.findOne({
                userId: req.params.id
            });
            res.json(order);
        } catch (error) {
            console.log(error);
        }
    }
    async AllOrders(req, res) {
        const order = await Order.find().exec();
        res.json(order);
    }
    async saveOrder(req, res) {
        try {
            const order = await Order.deleteOne({
                userId: req.params.id
            });
            if(order){
                res.json({type:true})
            }
        } catch (error) {
            console.log(error);
        }
    }
}

let confirmOrder = new Confirmorder();
module.exports = confirmOrder;
