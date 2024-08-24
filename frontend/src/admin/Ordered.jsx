import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/useCart";
import { getInfo, isAdmin } from "../Cookies";

const AllOrders = () => {
    document.title = "Admin Order List - See All Order List | Shopping Cart";
    const apiUrl = import.meta.env.VITE_API_URL;
    const { cart, getCart, dispatch } = useCart();
    const navigate = useNavigate();
    const priceRef = useRef(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState(null);
    const [data, setData] = useState([]);
    const viewOrder = id => {
        navigate(`/admin/view-order/${id}`);
    };
    const acceptOrder = async userid => {
        try {
            const response = await axios.get(
                apiUrl + "/admin/accept-order/" + userid
            );
            if (response.data.type) {
                alert("Order Delivered Successfully !");
            } else {
                alert("Error !!!");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAdminNoti = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(apiUrl + "/admin/orders");
            if (response.data) {
                setData(response.data);
            } else {
                setIsLoading(false);
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
            {data.length > 0 && (
                <h2>
                    Total Order List - <span>{data.length}</span>
                </h2>
            )}
            {data == 0 && (
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
                        No Order Yet !
                    </h4>
                </div>
            )}
            {data.length > 0 &&
                data.map((user, index) => {
                    return (
                        <>
                            <div className="cart" key={index + 2}>
                                <div
                                    id="cart-col"
                                    className="cart-col order-info"
                                >
                                    {/*
                                    <img src="/ss_demo/" />*/}
                                    <div className="price-col">
                                        <h3>Index ID : {index + 1}</h3>

                                        <span>
                                            Customer Name : {user.user_name}
                                        </span>
                                        <span>
                                            Customer Email : {user.user_email}
                                        </span>
                                        <span>
                                            Customer Phone : {user.user_phone}
                                        </span>
                                        <span>
                                            Customer Address :{" "}
                                            {user.user_address}
                                        </span>
                                        <span>Customer ID : {user.userId}</span>
                                        <span>Order ID : {user._id}</span>
                                        <span>
                                            Total Products :{" "}
                                            {user.products.length}
                                        </span>
                                        <span>
                                            Order Amount :
                                            <span id="price">
                                                {user.total_price}
                                            </span>
                                        </span>
                                        <span>
                                            Payment Status :{" "}
                                            {user.payment_status}
                                        </span>
                                        <span>Payment ID : {user.userId}</span>

                                        <div className="btn-section">
                                            <NavLink
                                                to={`/admin/view-order/${user.userId}`}
                                            >
                                                View Products
                                            </NavLink>
                                            <NavLink
                                                onClick={e => {
                                                    e.preventDefault();
                                                    acceptOrder(user.userId);
                                                }}
                                                to="#"
                                            >
                                                Confirm Order
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}

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
                            className="ri ri-shopping-bag-line"
                        ></i>
                    </h2>
                    <h4
                        style={{
                            textAlign: "center",
                            margin: ".5rem auto"
                        }}
                    >
                        You Don't Have Any Order !
                    </h4>
                </div>
            )}
        </section>
    );
};

export default AllOrders;
