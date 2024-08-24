const myUser = require("../models/Users.js");
const myFunction = require("../auth/functions");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
var apiUrl = process.env.API_URL;
const sendEmail = require("../auth/sendEmail");

class User {
    async register(req, res) {
        const username = req.body.user_name;
        const email = req.body.user_email;
        const password = req.body.user_password;
        const avtar = req.body.user_avtar;
        const token = req.body.user_token;
        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "All Fields Are Required"
            });
        }
        if (username.length < 3) {
            return res.status(400).json({
                code: 403,
                status: "failed",
                type: false,
                error: "Username Must Be At Least 3 Characters"
            });
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(400).json({
                code: 403,
                status: "failed",
                type: false,
                error: "Invalid Email Address"
            });
        }
        if (password.length < 5) {
            return res.status(400).json({
                code: 403,
                status: "failed",
                type: false,
                error: "Password Must Be At Least 8 Characters"
            });
        }
        try {
            const isExist = await myUser.findOne({
                user_name: username,
                user_email: email
            });
            if (isExist) {
                res.status(403).json({
                    code: 403,
                    type: false,
                    status: "failed",
                    error: "User Already Registered!"
                });
            } else {
                const otp = Math.floor(100000 + Math.random() * 900000);
                //  const isSent = await sendEmail(username, email, otp);
                /* 
                If any error occurs, it seems failed to send email.
                In that case you need to hard coding add your email address and app password 
                for sending email , sometimes it showing error from email server .
                open '/auth/sendEmail.js' and add info.
                */
                const encPassword = await myFunction.hashPassword(password);
                const date = new Date();
                const today = date.toDateString();
                const tok = await myFunction.encodeJWT({
                    username,
                    email,
                    today
                });

                const newUser = new myUser({
                    user_name: username,
                    user_email: email,
                    user_password: encPassword,
                    user_avtar: apiUrl + `/images/default_user.png`,
                    user_otp: otp,
                    user_token: tok,
                    user_login: true,
                    user_verified: true,
                    user_type: "User"
                });
                const save = await newUser.save();
                if (save) {
                    const currentUser = await myUser.findOne({
                        user_email: email
                    });
                    return res.status(201).json({
                        code: 201,
                        data: {
                            userId: currentUser._id,
                            isLogin: true,
                            token: tok,
                            date: today
                        },
                        type: true,
                        status: "success",
                        success: "User Registration Successfully"
                    });
                }
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                code: 403,
                type: false,
                error: "Error Registering User"
            });
        }
    }
    async updateUser(req, res) {
        const userId = req.params.id;
        const isExist = await myUser.findOne({ _id: userId });
        if (isExist) {
            const update = await myUser.findOneAndUpdate(
                { _id: userId },
                { user_type: "Admin", user_verified: true }
            );
            if (update) {
                return res.status(201).json({
                    code: 201,
                    type: true,
                    status: "success",
                    success: "User Updated Successfully"
                });
            } else {
                return res.status(403).json({
                    code: 403,
                    type: false,
                    status: "failed",
                    error: "Invalid OTP"
                });
            }
        } else {
            res.status(403).json({
                code: 403,
                type: false,
                status: "failed",
                error: "User Not Registered Yet"
            });
        }
    }
    async verifyEmail(req, res) {
        const userId = req.body.userId;
        const user_email = req.body.user_email;
        const user_otp = req.body.user_otp;
        // Validation
        if (!userId || !user_email || !user_otp) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "All Fields Are Required"
            });
        }
        if (user_otp.length < 5) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "Invalid Length Of OTP"
            });
        }
        if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user_email)
        ) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "Invalid Email Address"
            });
        }
        const isExist = await myUser.findOne({
            _id: userId,
            user_email: user_email
        });
        if (isExist) {
            if (
                isExist.user_email === user_email &&
                isExist.user_otp.toString() === user_otp.toString()
            ) {
                const date = new Date();
                const today = date.toDateString();
                const username = isExist.user_name;
                const token = await myFunction.encodeJWT({
                    username,
                    user_email,
                    today
                });
                const update = await myUser.findOneAndUpdate(
                    { user_email: user_email },
                    { user_token: token, user_verified: true }
                );
                if (update) {
                    return res.status(201).json({
                        code: 201,
                        data: {
                            userId: isExist._id,
                            isLogin: true,
                            token: token,
                            date: today
                        },
                        type: true,
                        status: "success",
                        success: "User Verification Successfully"
                    });
                } else {
                    return res.status(403).json({
                        code: 403,
                        type: false,
                        status: "failed",
                        error: "Invalid OTP"
                    });
                }
            }
        } else {
            res.status(403).json({
                code: 403,
                type: false,
                status: "failed",
                error: "User Not Registered Yet"
            });
        }
    }
    async login(req, res) {
        const email = req.body.user_email.trim();
        const password = req.body.user_password.trim();
        // Validation
        if (!email || !password) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "All Fields Are Required"
            });
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "Invalid Email Address"
            });
        }
        if (password.length < 5) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "Password Must Be At Least 8 Characters"
            });
        }
        try {
            const isExist = await myFunction.findOne({
                user_email: email
            });
            if (isExist) {
                if (isExist.user_email === email) {
                    try {
                        const isMatch = await myFunction.comparePassword(
                            password,
                            isExist.user_password
                        );
                        if (isMatch) {
                            const date = new Date();
                            const today = date.toDateString();
                            const username = isExist.user_name;
                            const token = await myFunction.encodeJWT({
                                username,
                                email,
                                today
                            });
                            const update = await myUser.findOneAndUpdate(
                                { user_email: email },
                                { user_token: token }
                            );
                            if (update) {
                                return res.status(201).json({
                                    code: 201,
                                    type: true,
                                    data: {
                                        userId: isExist._id,
                                        isLogin: true,
                                        token: token,
                                        date: today
                                    },
                                    status: "success",
                                    success: "User Logged In Successfully"
                                });
                            } else {
                                return res.status(403).json({
                                    code: 403,
                                    type: false,
                                    status: "failed",
                                    error: "Invalid Username Or Password"
                                });
                            }
                        } else {
                            return res.status(403).json({
                                code: 403,
                                type: false,
                                status: "failed",
                                error: "Invalid User Credentials !"
                            });
                        }
                    } catch (err) {
                        return res.status(500).json({
                            code: 403,
                            type: false,
                            error: "Error User Login"
                        });
                    }
                }
            } else {
                res.status(403).json({
                    code: 403,
                    type: false,
                    status: "failed",
                    error: "Invalid Credentials , Please Try Again"
                });
            }
        } catch (err) {
            return res
                .status(500)
                .json({ code: 403, type: false, error: "Error User Login" });
        }
    }
    async logout(req, res) {
        const token = req.body.token.trim();
        const userId = req.body.userId.trim();
        // Validation
        if (!token || !userId) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "All Fields Are Required"
            });
        }
        try {
            const isExist = await myFunction.findOne({
                user_token: token,
                _id: userId
            });
            if (isExist) {
                if (isExist.user_token === token && isExist._id == userId) {
                    const date = new Date();
                    const today = date.toDateString();
                    const username = isExist.user_name;
                    const email = isExist.user_email;
                    const token = await myFunction.encodeJWT({
                        username,
                        email,
                        today
                    });
                    const update = await myUser.findOneAndUpdate(
                        { user_email: email },
                        { user_token: "" }
                    );
                    if (update) {
                        return res.status(201).json({
                            code: 201,
                            type: true,
                            status: "success",
                            success: "User Logged Out Successfully"
                        });
                    } else {
                        return res.status(403).json({
                            code: 403,
                            type: false,
                            status: "failed",
                            error: "Invalid Logout"
                        });
                    }
                } else {
                    res.status(403).json({
                        code: 403,
                        type: false,
                        status: "failed",
                        error: "Invalid Logout !"
                    });
                }
            } else {
                res.status(403).json({
                    code: 403,
                    type: false,
                    status: "failed",
                    error: "ghs Invalid Logout !"
                });
            }
        } catch (err) {
            res.status(403).json({
                code: 403,
                type: false,
                status: "failed",
                error: "Invalid Logout !"
            });
        }
    }
    async users(req, res) {
        try {
            const users = await myUser.find().exec();
            // console.log(users);
            return res.status(200).json(users);
        } catch (err) {
            console.log(err);
            return res.status(404).json({
                code: 404,
                status: "failed",
                error: "No User Found!"
            });
        }
    }
    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const isExist = await myFunction.findOne({ _id: userId });
            if (isExist) {
                const isDelete = await myUser.findByIdAndDelete(userId);
                return res.status(204).json({
                    code: 204,
                    status: "success",
                    success: "User Deleted Successfully"
                });
            } else {
                return res.status(404).json({
                    code: 404,
                    status: "failed",
                    error: "User Doesn't Exist"
                });
            }
        } catch (err) {
            return res.status(403).json({
                code: 403,
                status: "failed",
                error: "User Deleted Failed"
            });
        }
    }
}

let user = new User();
module.exports = user;
