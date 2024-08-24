//const mongoose = require("../database/db.js");
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    user_name: String,
    user_email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    user_password: String,
    user_avtar: String,
    user_otp : String,
    user_token: String,
    user_login: Boolean,
    user_verified: Boolean,
    user_type : String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
