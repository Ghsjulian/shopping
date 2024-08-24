const express = require("express");
const user = require("../controllers/userController");
const product = require("../controllers/productController");
const order = require("../controllers/orderController");
const myFunction = require("../auth/functions");
const isAuth = require("../auth/isAuth");
const createUpload = require("../auth/multerConfig");
const router = express.Router();

/* Define The File Uploading */
const upload = createUpload("./public/uploads/");
/* Users And Clients Access Routes */
router.post("/signup", user.register);
router.post("/login", user.login);
router.post("/logout", user.logout);
router.post("/user/verification", user.verifyEmail);
router.get("/users", user.users);
router.get("/users/delete/:id", user.deleteUser);
router.get("/users/update/:id", user.updateUser);

/* Admin Access Routes */
router.post(
    "/admin/add-product",
    upload.single("product_img"),
    product.addProduct
);
router.put(
    "/admin/update-product/:id",
    upload.single("product_img"),
    product.updateProduct
);
router.get("/admin/fetch-products", product.fetchProduct);
router.get("/admin/edit-product/:id", product.editProduct);
router.get("/admin/delete-product/:id", product.deleteProduct);

/* Products Routes */
router.get("/products/category-product/:category", product.categoryProduct);
router.get("/products/all-products", product.allProduct);
router.get("/products/view-products/:id", product.viewProduct);

/* Order Routes Here */
router.post("/confirm-order", order.AcceptOrder);
router.get("/get-order/:id", order.getOrderById);
router.get("/admin/orders", order.AllOrders);
router.get("/admin/accept-order/:id", order.saveOrder);

module.exports = router;
