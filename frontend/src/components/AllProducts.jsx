import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { useCart } from "../context/useCart";
import { getInfo, isAdmin } from "../Cookies";

const AllProducts = () => {
    const navigate = useNavigate();
    const { state, dispatch, cart, addToCart, isCart } = useCart();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [products, setProducts] = useState([]);
    const [isProducts, setIsProducts] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const loadiSize = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const fetchProduct = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(apiUrl + "/products/all-products");
            const data = await response.json();
            setProducts(data.products);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchProduct();
        if (isLoading) {
            return;
        }
    }, []);

    return (
        <>
            <div className="grid-area">
                {isLoading &&
                    loadiSize.map((num, index) => {
                        return (
                            <div
                                data-aos="zoom-in"
                                className="grid-col-load"
                                key={index}
                            >
                                <div className="img"></div>
                                <div className="price"></div>
                                <h5></h5>
                                <div className="btn-area">
                                    <NavLink to="#"></NavLink>
                                    <NavLink to="#"></NavLink>
                                </div>
                            </div>
                        );
                    })}
                {!isProducts && <h2> No Product Found </h2>}
                {!isLoading &&
                    products !== 0 &&
                    products.map((product, index) => {
                        return (
                            <div
                                data-aos="zoom-in"
                                className="grid-col"
                                key={index}
                            >
                                <img src={product.product_img} />
                                <span>{product.product_desc.price}</span>
                                <h5>{product.product_title}</h5>
                                <div className="btn-area">
                                    <NavLink
                                        to={`/view-product/${product._id}`}
                                    >
                                        <i className="bx bx-show"></i>
                                        <span>View Product</span>
                                    </NavLink>

                                    {!isAdmin() && isCart(product._id) == 0 && (
                                        <NavLink
                                            onClick={() => {
                                                if (
                                                    getInfo().userId &&
                                                    getInfo().token
                                                ) {
                                                    addToCart(
                                                        product,
                                                        product.product_desc
                                                            .price,
                                                        1
                                                    );
                                                } else {
                                                    navigate("/login");
                                                }
                                            }}
                                            to="#"
                                        >
                                            <i className="bx bxs-cart-add"></i>
                                            <span>Add Cart</span>
                                        </NavLink>
                                    )}
                                    {isCart(product._id).length > 0 && (
                                        <NavLink
                                            style={{
                                                padding: ".1rem .5rem"
                                            }}
                                            to="/cart"
                                        >
                                            <i className="ri ri-checkbox-circle-line"></i>
                                            <span>Added</span>
                                        </NavLink>
                                    )}

                                    {isAdmin() && (
                                        <NavLink
                                            to={`/admin/edit-product/${product._id}`}
                                        >
                                            <i className="bx bx-pencil"></i>
                                            <span>Edit Product</span>
                                        </NavLink>
                                    )}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default AllProducts;
