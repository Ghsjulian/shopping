const dotenv = require("dotenv");

dotenv.config({ path: "../.env" }); // Load environment variables from the root directory

module.exports = {
    secretKey: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRES_IN,
    email_key: process.env.EMAIL_KEY,
    email_address: process.env.EMAIL
};

