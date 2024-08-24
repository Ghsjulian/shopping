import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { setCookie } from "../Cookies";

const Signup = () => {
    document.title = "Sign Up And Create An Account | Shopping Cart";
    const navigate = useNavigate();
    const messageRef = useRef(null);
    const otpMessage = useRef(null);
    const btnRef = useRef(null);
    const otpRef = useRef(null);
    const otpbtnRef = useRef(null);
    const signupRef = useRef(null);
    const [otp, setOtp] = useState("");
    const [users, setUsers] = useState({
        user_name: "",
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
    const openOtPForm = () => {
        signupRef.current.style.display = "none";
        otpRef.current.style.display = "flex";
    };
    const closeOtPForm = () => {
        signupRef.current.style.display = "flex";
        otpRef.current.style.display = "none";
    };

    const verifyEmail = async () => {
        let info = JSON.parse(localStorage.getItem("user"));
        const url = import.meta.env.VITE_API_URL;
        if (otp && otp.length > 5 && info.user_otp.toString() === otp) {
            setOtp("");
            try {
                otpbtnRef.current.textContent = "Please Wait...";
                const response = await fetch(url + "/user/verification", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(info)
                });
                const responseData = await response.json();
                otpbtnRef.current.textContent = "Verify Now";
                if (responseData.type) {
                    const data = JSON.stringify(responseData.data);
                    setCookie("e-comUser", data);
                    otpbtnRef.current.textContent = "Veried";
                    otpMessage.current.classList.remove("error");
                    otpMessage.current.classList.add("success");
                    otpMessage.current.textContent = responseData.success;
                    setTimeout(() => {
                        localStorage.removeItem("user");
                        navigate("/");
                    }, 2000);
                } else {
                    otpMessage.current.classList.remove("success");
                    otpMessage.current.classList.add("error");
                    otpMessage.current.textContent = responseData.error;
                }
            } catch (error) {
                otpMessage.current.classList.remove("success");
                otpMessage.current.classList.add("error");
                otpMessage.current.textContent = "Server Timeout";
            }
        } else {
            otpMessage.current.classList.remove("success");
            otpMessage.current.classList.add("error");
            otpMessage.current.textContent = "Invalid OTP Please Check Email";
        }
        setTimeout(() => {
            otpMessage.current.classList.remove("success");
            otpMessage.current.classList.remove("error");
            otpMessage.current.textContent = "";
        }, 3000);
        console.clear();
    };
    const handleChange = event => {
        setUsers({ ...users, [event.target.name]: event.target.value });
    };
    const sendToServer = async users => {
        const url = import.meta.env.VITE_API_URL;
        try {
            btnRef.current.textContent = "Please Wait...";
            const response = await fetch(url + "/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(users)
            });
            const responseData = await response.json();
            btnRef.current.textContent = "Signup";
            if (responseData.type) {
                const data = JSON.stringify(responseData.data);
                setCookie("e-comUser", data);
                showMessage(responseData.type, responseData.success);
                navigate("/")
            } else {
                showMessage(responseData.type, responseData.error);
            }
        } catch (error) {
            showMessage(false, "Server Error !");
        }
    };
    const submitUser = () => {
        if (!users.user_name && !users.user_email && !users.user_password) {
            showMessage(false, "All Fields Are Required !");
        } else if (!users.user_name) {
            showMessage(false, "User Name Is Required !");
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
            <h2>Create An Account</h2>
            <div ref={signupRef} className="signup-form">
                <span ref={messageRef} id="message"></span>
                <input
                    type="text"
                    name="user_name"
                    placeholder="Enter User Name"
                    onChange={handleChange}
                    value={users.user_name}
                />
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
                    Already Have An Account ?{" "}
                    <NavLink to="/login">Login</NavLink>
                </strong>
                <button ref={btnRef} className="submit" onClick={submitUser}>
                    Signup
                </button>
            </div>
            <div
                id="otp-verify"
                style={{ display: "none" }}
                className="signup-form"
                ref={otpRef}
            >
                <span id="skip" onClick={closeOtPForm}>
                    Skip Now
                </span>
                <h3> Please Check Your Email</h3>
                <span ref={otpMessage} id="message"></span>
                <input
                    type="number"
                    placeholder="Enter OTP"
                    onChange={e => {
                        setOtp(e.target.value.trim());
                    }}
                    value={otp}
                />
                <button
                    ref={otpbtnRef}
                    onClick={verifyEmail}
                    className="submit"
                >
                    Verify Now
                </button>
            </div>
        </section>
    );
};

export default Signup;
