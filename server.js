const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const secret_key = process.env.SECRET_KEY;

// Databse Configurations
//const uri = `mongodb://localhost:27017/`;
const uri = process.env.URI;
const db = process.env.DB_NAME || "shopping-cart";
// Imported Router
const router = require("./src/routes/route.js");
// Serve images from the 'images' directory
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Set up router middleware
app.use("/api", router);
/*=================================*/
console.clear();
mongoose
    .connect(uri, { dbName: db })
    .then(() => {
        app.listen(PORT, () => {
            console.log(" [+] Database Connected Successfully !");
            console.log(`\n [+] Server is running on port - ${PORT}\n`);
        });
    })
    .catch(error => {
        console.log(" [!] Database Connected Error !");
        console.log("\n [!] Error : ", error);
    });

// Export the Express app
module.exports = app;
