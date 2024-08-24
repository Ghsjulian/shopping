import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { setCookie } from "../Cookies";

const Login = () => {
    document.title = "Login To Your Account | Shopping Cart";
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const messageRef = useRef(null);
    const btnRef = useRef(null);
    const [users, setUsers] = useState({
        user_email: "",
        user_password: ""
    });
    const showMessage = (isTrue, text) => {
        if (isTrue) {
            messageRef.current.classList.remove("error");
            messageRef.current.classList.add("success");
            messageRef.current.textContent = text;
        } else {
            messageRef.current.classList.remove("success");
            messageRef.current.classList.add("error");
            messageRef.current.textContent = text;
        }
        setTimeout(() => {
            if (messageRef.current.classList.contains("success")) {
                messageRef.current.classList.remove("success");
            } else {
                messageRef.current.classList.remove("error");
            }
            messageRef.current.textContent = "";
        }, 3000);
        console.clear();
    };
    const handleChange = event => {
        setUsers({ ...users, [event.target.name]: event.target.value });
    };
    const sendToServer = async users => {
        try {
            btnRef.current.textContent = "Please Wait...";
            const response = await fetch(apiUrl + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(users)
            });
            const responseData = await response.json();
            btnRef.current.textContent = "Login";
            if (responseData.type) {
                const info = JSON.stringify(responseData.data);
                setCookie("e-comUser", info);
                showMessage(responseData.type, responseData.success);
                // When We Will Admin Access This Code Will Be Executed
                if (responseData.user_type === "Admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }
            } else {
                showMessage(responseData.type, responseData.error);
            }
        } catch (error) {
            showMessage(false, "Server Error !");
        }
        console.clear();
    };
    const submitUser = () => {
        if (!users.user_email && !users.user_password) {
            showMessage(false, "All Fields Are Required !");
        } else if (!users.user_email) {
            showMessage(false, "User Email Is Required !");
        } else if (!users.user_password) {
            showMessage(false, "User Password Is Required !");
        } else if (users.user_password.length < 6) {
            showMessage(false, "User Password Will Be At Least 8 Characters !");
        } else {
            sendToServer(users);
        }
    };
    return (
        <section data-aos="zoom-in" className="page one-page">
            <h2>Login To Your Account</h2>
            <div className="signup-form">
                <span ref={messageRef} id="message"></span>
                <input
                    type="email"
                    required={true}
                    name="user_email"
                    placeholder="Enter User Email"
                    onChange={handleChange}
                    value={users.user_email}
                />
                <input
                    type="password"
                    name="user_password"
                    placeholder="Enter User Password"
                    onChange={handleChange}
                    value={users.user_password}
                />
                <strong>
                    Don't Have An Account ?{" "}
                    <NavLink to="/signup">Signup</NavLink>
                </strong>
                <button ref={btnRef} className="submit" onClick={submitUser}>
                    Login
                </button>
            </div>
        </section>
    );
};

export default Login;
