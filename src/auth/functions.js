const myUser = require("../models/Users");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { secretKey, expiresIn } = require("./config");

class myFunction {
    async findOne(key) {
        try {
            const user = await myUser.findOne(key);
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
        }
    }
    async hashPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }
    async comparePassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
    async encodeJWT(payload) {
        return jwt.sign(payload, secretKey, { expiresIn });
    }
    async decodeJWT(token) {
        try {
            return jwt.verify(token, secretKey);
        } catch (err) {
            return null;
        }
    }
    async getUrlParams(url) {
        const params = {};
        const query = url.split("?")[1];
        if (query) {
            const pairs = query.split("&");
            for (let i = 0; i < pairs.length; i++) {
                const pair = pairs[i].split("=");
                params[decodeURIComponent(pair[0])] = decodeURIComponent(
                    pair[1]
                );
            }
        }
        return params;
    }
    /*
    async sendEmail(userName, userEmail, otp) {
        const nodemailer = require("nodemailer");
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: email_address,
                pass: email_key
            }
        });

        // Define the email options
        let mailOptions = {
            from: email_address,
            to: userEmail,
            subject: "Please Verify Your Email Address",
            text: "OTP Verification Code",
            html: `<p>Hello, <b style="color:red">${userName}</b> Congratulations!</p><br/>
            <p>Please Verify Your Email , The Verification Link Will Be Expired In 5 Minutes.<br/>
            To Verify The Email Address And Complete Your Registration.</p><br><br>
            <center><strong style="padding:0.5rem 0.8rem;text-decoration:none; background:blue;color:#ffffff;border-radius:8px">${otp}</strong></center>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return false;
            } else {
                console.log(info);
                return true;
            }
        });
    }
    */
}

module.exports = new myFunction();
