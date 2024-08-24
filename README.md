<center>
<br><br>
<img align="center" src="public/icons/android-chrome-512x512.png" width="250" height="250"><br>
<br>
<h4 align="center">Web Developer & Designer - Ghs Julian</h4>
</br>
</center>

<br>
<h4>Project Name  :  Shopping-Cart API</h4>
<h4>Live Demo     :  <a href="[https://bakdif.com](https://shopping-app-one-sooty.vercel.app/)" target="_blank"> Clik Here</a>
<h4> Developed By :  Ghs Julian</h4>

--- 
--- 

<br><br>


<h3>API Descriptions : </h3>


---

**This is a rest api for shipping-cart e-commerce website. It has full security and there's no any bugs. It has design for my educational self learning project. I'll use this API in my react e-commerce website which will be connected with this api. Anyway but it has all functionality. It has created using my mobile phone. For more about this api please see below.**

---

<br>

<h3>Language And Technologies : </h3>

---
1. Termux Terminal
2. Acode Editor
3. MongoDB Atlas
4. Nodejs 
5. Express
6. MongoDB
7. HTML5
8. CSS3
9. JAVASCRIPT
10. PNG/IMAGES
---

<br>

<h3> Live Server API Endpoints </h3>
<br>

<h5>Home Page     :  <a href="https://ghs-shopping-cart.vercel.app/" target="_blank">home</a><br><br>
<h5>User Registration     :  <a href="https://ghs-shopping-cart.vercel.app/api/signup" target="_blank">https://ghs-shopping-cart.vercel.app/api/signup</a><br><br>
<h5>User Email Verification    :  <a href="https://ghs-shopping-cart.vercel.app/api/user/verification" target="_blank">https://ghs-shopping-cart.vercel.app/api/user/verification</a><br><br>
<h5>User Login     :  <a href="https://ghs-shopping-cart.vercel.app/api/login" target="_blank">https://ghs-shopping-cart.vercel.app/api/login</a><br><br>
<h5>View All Users    :  <a href="https://ghs-shopping-cart.vercel.app/api/users" target="_blank">https://ghs-shopping-cart.vercel.app/api/users</a><br><br>
<h5>Delete An Users     :  <a href="https://ghs-shopping-cart.vercel.app/api/users/delete/userID" target="_blank">https://ghs-shopping-cart.vercel.app/api/users/delete/userID</a><br><br>


--- 

<br>


<h3>API Endpoint URL : </h3>

---


**Here's the endpoints of this api. It's very simple you must installed nodej on your system. So let's see all the endpoints of this API.**

##### Note : **At first edit the '.env' file and the information in it. See the example below. Copy this code and create '.env' file in the root directory open the env file and paste this save and close the env file**

```bash
PORT=5000
API_URL=http://localhost:5000
DB_NAME=shopping-cart
URI=your_mongodb_atlas_uri
USERNAME=your_mongodb_atlas_username
PASSWORD=your_mongodb_atlas_password
SECRET_KEY=your_secret_key
EXPIRES_IN=1d
EMAI=your_email_address
EMAIL_KEY=your_gmail_app_passkey

```

---

<br>
<h3> User Signup API : </h3>
<br>

**For registration user i used vanilla JavaScript fetch methods , it also works on axios. See the demo code for registration.**

```javascript
async function signup() {
    let url = "http://localhost:5000/api/signup";
    const data = {
        user_name: "Ghs Julian",
        user_email: "example@gmail.com",
        user_password: "123456"
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error("Error : ", error);
    }
}
signup();
```
---

<br>
<h3> User Email Verification API : </h3>
<br>

**After complete the user registration , the server will send an otp to the users gmail after that the gmail,userid and otp will be send to your response when the registration success . And now you need to catch those data and send it to the verification api endpoint , so let's do it . We have complete our registration and and we got the data from the server.**

```javascript
async function verifyEmail() {
    let url = "http://localhost:5000/api/user/verification";
    const data = {
        user_id : "668ff7a73e5734521c1fbfef",
        user_email: "example@gmail.com",
        user_otp: "758973"
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error("Error:", error);
    }
}
verifyEmail();
```

--- 

<br>
<h3> User Login API : </h3>
<br>

**Now we have successfully created our account and we have verified our email address. Now we can login to our account. The login code has given below . If the valid credentials it will returna object and inside that you'll see JWT , userId , isLogin etc. See The Request Demo below.**

```javascript
async function login() {
    let url = "http://localhost:5000/api/login";
    const data = {
        user_email: "example@gmail.com",
        user_password: "123456" 
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error("Error:", error);
    }
}
login();
```

--- 

<h3>SCREENSHOT AND DEMO : </h3><br>

<img align="center" src="src/assets/screenshots/screenshot4.png" width="330" height="300"><br><br>

---


<br><br>
<center>
<h2> Thank You !!! </h2>
</center>
