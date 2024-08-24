const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" }); // Load environment variables from the root directory

const serverEmail = "ghsjulian@gmail.com";
const emailPass = "XXXXXX XXXXX XXXXX"

const sendEmail = async (userName, userEmail, otp) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: serverEmail,
      pass: emailPass
    }
  });

  let mailOptions = {
    from: serverEmail,
    to: userEmail,
    subject: "Please Verify Your Email Address",
    text: "OTP Verification Code",
    html: `<p>Hello, <b style="color:red">${userName}</b> Congratulations!</p><br/>
            <p>Please Verify Your Email , The Verification Link Will Be Expired In 5 Minutes.<br/>
            To Verify The Email Address And Complete Your Registration.</p><br><br>
            <center><strong style="padding:0.5rem 0.8rem;text-decoration:none; background:blue;color:#ffffff;border-radius:8px">${otp}</strong></center>`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email Send Error : ", error);
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = sendEmail