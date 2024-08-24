import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/useCart";
import { getInfo, isAdmin } from "../Cookies";

const AdminNotifications = () => {
    document.title = "Notifications - User Push Messages | Shopping Cart";
    const apiUrl = import.meta.env.VITE_API_URL;
    const { cart, getCart, dispatch } = useCart();
    const navigate = useNavigate();
    const priceRef = useRef(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const viewProduct = id => {
        navigate(`/view-product/${id}`);
    };
    const fetchAdminNoti = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(apiUrl + "/admin/orders");
            if (response.data) {
                setData(response.data);
            } else {
                setIsLoading(false);
                console.log("No Products Found");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (isAdmin()) {
            fetchAdminNoti();
            if (isLoading) {
                return;
            }
        }
        if (isLoading) {
            return;
        }
    }, []);

    return (
        <section data-aos="zoom-in" id="view" className="page">
            {!data && (
                <div
                    className="signup-form"
                    style={{
                        width: "90%",
                        maxWidth: "650px",
                        boxShadow: "none"
                    }}
                >
                    <h2>
                        <i
                            style={{
                                color: "#25d7ff",
                                textAlign: "center",
                                fontSize: "5rem",
                                margin: ".5rem auto"
                            }}
                            className="ri ri-notification-off-line"
                        ></i>
                    </h2>
                    <h4
                        style={{
                            textAlign: "center",
                            margin: ".5rem auto"
                        }}
                    >
                        No Notification Found !
                    </h4>
                </div>
            )}
            {
                data && <h2>Admin Notifications</h2>
            }
            {data &&
                data.map((user, index) => {
                    return (
                        <>
                            <div className="total" key={index}>
                                <NavLink
                                    id="msg"
                                    to="/admin/orders"
                                    style={{
                                        display: "flex",
                                        textDecoration: "none",
                                        textAlign: "justify",
                                        margin: ".5rem auto",
                                        padding: ".5rem .6rem",
                                        color: "#3e3e3e",
                                        fontWeight: "700"
                                    }}
                                >
                                    <i
                                        style={{
                                            fontSize: "30px",
                                            textAlign: "justify",
                                            margin: "0 .3rem",
                                            color: "#13aa00",
                                            fontWeight: "300"
                                        }}
                                        className="ri ri-checkbox-circle-line"
                                    ></i>
                                    {user.user_name} Ordered{" "}
                                    {user.products.length} Product, Accept The
                                    Order Or Reject It.
                                </NavLink>
                            </div>
                        </>
                    );
                })}
        </section>
    );
};

export default AdminNotifications;
