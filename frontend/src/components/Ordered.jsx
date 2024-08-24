import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import { useCart } from "../context/useCart";
import { getInfo } from "../Cookies";

const Ordered = () => {
    document.title = "Your Order List - See Your Order List | Shopping Cart";
    const apiUrl = import.meta.env.VITE_API_URL;
    const { cart, getCart, dispatch } = useCart();
    const navigate = useNavigate();
    const priceRef = useRef(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState(null);
    const [data, setData] = useState(null);
    const viewProduct = id => {
        navigate(`/view-product/${id}`);
    };
    const fetchOrder = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                apiUrl + "/get-order/" + getInfo().userId
            );
            if (response.data) {
                setProducts(response.data.products);
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
        fetchOrder();
        if (isLoading) {
            return;
        }
    }, []);

    return (
        <section data-aos="zoom-in" id="view" className="page">
            {products && (
                <h2>
                    Your Order - <span>List</span>
                </h2>
            )}
            {products &&
                products.map((product, index) => {
                    return (
                        <>
                            <div className="cart" key={index+5}>
                                <div id="cart-col" className="cart-col">
                                    <img src={product.product_img} />
                                    <div className="price-col">
                                        <span>{product.product_title}</span>
                                        <span>
                                            Price :
                                            <span id="price">
                                                {product.price}
                                            </span>
                                        </span>
                                        <span>
                                            Your Quantity : {product.quantity}
                                        </span>
                                    </div>
                                </div>
                                <div className="cart-col">
                                    <div id="action-btn">
                                        <button
                                            onClick={() =>
                                                viewProduct(product.product_id)
                                            }
                                        >
                                            <i className="bx bx-show"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}

            {!products && (
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

            {data && (
                <div className="total"
                style={{flexDirection : "column"}}
                >
                    <h4
                        style={{
                            fontSize: "18px",
                            textAlign: "center",
                            margin: ".5rem auto"
                        }}
                    >
                        Total Price : <span>{data.total_price}</span>
                    </h4>
                    <h4
                        style={{
                            fontSize: "18px",
                            textAlign: "center",
                            margin: ".5rem auto"
                        }}
                    >
                        Payment Status : <span>{data.payment_status}</span>
                    </h4>
                </div>
            )}
        </section>
    );
};

export default Ordered;
