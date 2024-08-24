import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { setCookie, getInfo } from "../Cookies";
import { useCart } from "../context/useCart";

const ConfirmOrder = () => {
    document.title = "Login To Your Account | Shopping Cart";
    const { getCart, dispatch } = useCart();
    const { userid, price } = useParams();
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const messageRef = useRef(null);
    const btnRef = useRef(null);
    const paymentRef = useRef(null);
    const [address, setAddress] = useState({
        user_name: "",
        user_email: "",
        user_phone: "",
        user_address: "",
        payment_type: "",
        total_price: price,
        payment_status: "paid",
        userId: getInfo().userId,
        token: getInfo().token,
        products: getCart() || [],
        message : `${getCart().length} Order Has Been Placed , Your Product Will Be 
        deleveried With In 12 Hours.`
    });
    const handleChange = event => {
        setAddress({ ...address, [event.target.name]: event.target.value });
    };
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
    const sendToServer = async address => {
        try {
            btnRef.current.textContent = "Please Wait...";
            const response = await fetch(apiUrl + "/confirm-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(address)
            });
            const responseData = await response.json();
            btnRef.current.textContent = "Confirm Order";
            if (responseData.type) {
                showMessage(responseData.type, responseData.success);
                localStorage.setItem("cartList","[]");
                navigate("/notifications")
                dispatch({
                    type: "CLEAR_CART"
                });
            } else {
                showMessage(responseData.type, responseData.error);
            }
        } catch (error) {
            showMessage(false, "Server Error !");
        }
    };
    const submitOrder = () => {
        if (
            !address.user_name &&
            !address.user_email &&
            !address.user_phone &&
            !address.user_address
        ) {
            showMessage(false, "All Fields Are Required !");
        } else if (!address.user_email) {
            showMessage(false, "User Email Is Required !");
        } else if (!address.user_name) {
            showMessage(false, "User Name Is Required !");
        } else if (!address.user_address) {
            showMessage(false, "User Current Address Required !");
        } else if (paymentRef.current.value === "NO_VALUE") {
            showMessage(false, "Payment Method Is Required !");
        } else {
            address.payment_type = paymentRef.current.value;
            sendToServer(address);
            // console.log(address);
        }
    };
    return (
        <section data-aos="zoom-in" className="page one-page">
            <h2>Fill Out Order Form</h2>
            <div className="signup-form">
                <span ref={messageRef} id="message"></span>
                <input
                    type="text"
                    required={true}
                    name="user_name"
                    placeholder="Enter User Name"
                    onChange={handleChange}
                    value={address.user_name}
                />
                <input
                    type="email"
                    required={true}
                    name="user_email"
                    placeholder="Enter User Email"
                    onChange={handleChange}
                    value={address.user_email}
                />
                <input
                    type="number"
                    required={true}
                    name="user_phone"
                    placeholder="Enter User Phone Number"
                    onChange={handleChange}
                    value={address.user_phone}
                />
                <input
                    type="text"
                    required={true}
                    name="user_address"
                    placeholder="Enter Current Address"
                    onChange={handleChange}
                    value={address.user_address}
                />
                <select ref={paymentRef}>
                    <option value="NO_VALUE">Select Payment Method</option>
                    <option value="Cash On">Cash On</option>
                    <option value="Online/Bkash">Online/Bkash</option>
                </select>
                <button ref={btnRef} className="submit" onClick={submitOrder}>
                    Confirm Order
                </button>
            </div>
            <br />
            <br />
            <br />
        </section>
    );
};

export default ConfirmOrder;
