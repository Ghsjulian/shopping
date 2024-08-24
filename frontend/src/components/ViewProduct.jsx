import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { getInfo, isAdmin } from "../Cookies";
import FetchProducts from "./FetchProducts";
import { useCart } from "../context/useCart";

const ViewProduct = () => {
    const { state, dispatch, cart, addToCart, isCart } = useCart();
    const { id } = useParams();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [products, setProducts] = useState(null);
    const [isProducts, setIsProducts] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    var [quantity, setQuantitiy] = useState(1);
    var [currentPrice, setCurrentPrice] = useState(null);

    const fetchProduct = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                apiUrl + "/products/view-products/" + id
            );
            if (response.data.products) {
                setProducts(response.data.products);
                setIsLoading(false);
            } else {
                setIsProducts(false);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const makeCount = str => {
        const position = str.search("TK BDT");
        var newStr = "";
        for (let i = 0; i < position; i++) {
            newStr += str[i];
        }
        return parseInt(newStr);
    };

    const increaseQuantity = () => {
        let price = makeCount(currentPrice);
        products.product_desc.price =
            makeCount(products.product_desc.price) + price + "TK BDT";
    };
    const decreaseQuantity = () => {
        let price = makeCount(currentPrice);
        products.product_desc.price =
            makeCount(products.product_desc.price) - price + "TK BDT";
    };
    useEffect(() => {
        fetchProduct();
        if (isLoading) {
            return;
        }
        window.scrollTo({ top: 0, behavior: "smooth" }), [];
    }, [id, cart]);
    return (
        <>
            {products && (
                <>
                    {
                        (document.title =
                            "View Products - " + products.product_title)
                    }
                    <section data-aos="zoom-in" id="view" className="page">
                        <img
                            id="product-img"
                            src={products.product_img}
                            alt="Product Image"
                        />
                        <h2>{products.product_title}</h2>

                        <h4>
                            Products Price :{" "}
                            <span>{products.product_desc.price}</span>
                        </h4>
                        <div className="product-flex">
                            <div className="flex-col">
                                <h2>Product Descriptions : </h2>
                                <li>
                                    <i className="bx bx-check-circle"></i>
                                    <span>
                                        Price : {products.product_desc.price}
                                    </span>
                                </li>
                                <li>
                                    <i className="bx bx-check-circle"></i>
                                    <span>
                                        Size : {products.product_desc.size}
                                    </span>
                                </li>
                                <li>
                                    <i className="bx bx-check-circle"></i>
                                    <span>
                                        Width : {products.product_desc.width}
                                    </span>
                                </li>
                                <li>
                                    <i className="bx bx-check-circle"></i>
                                    <span>
                                        Color : {products.product_desc.color}
                                    </span>
                                </li>
                            </div>
                            {!isAdmin() && (
                                <div className="flex-col">
                                    <div className="flex-btn btn-flex">
                                        <button
                                            onClick={() => {
                                                if (!currentPrice) {
                                                    setCurrentPrice(
                                                        products.product_desc
                                                            .price
                                                    );
                                                    increaseQuantity();
                                                }
                                                if (quantity == 5) {
                                                    return;
                                                } else {
                                                    setQuantitiy(quantity + 1);
                                                    increaseQuantity();
                                                }
                                            }}
                                        >
                                            +
                                        </button>
                                        <span>Quantity : {quantity}</span>
                                        <button
                                            onClick={() => {
                                                if (quantity == 1) {
                                                    return;
                                                } else {
                                                    setQuantitiy(quantity - 1);
                                                    decreaseQuantity();
                                                }
                                            }}
                                        >
                                            -
                                        </button>
                                    </div>
                                    <div className="flex-btn">
                                        {isCart(products._id) == 0 && (
                                            <a
                                                onClick={() => {
                                                    if (
                                                    getInfo().userId &&
                                                    getInfo().token
                                                ){
                                                    addToCart(
                                                        products,
                                                        currentPrice
                                                            ? currentPrice
                                                            : products
                                                                  .product_desc
                                                                  .price,
                                                        quantity ? quantity : 1
                                                    );
                                                } else {
                                                    navigate("/login")
                                                }
                                                }}
                                                id="cart"
                                                href="#"
                                            >
                                                <i className="bx bx-cart-add"></i>
                                                <span>Add Cart</span>
                                            </a>
                                        )}
                                        {isCart(products._id).length > 0 && (
                                            <NavLink id="cart" to="/cart">
                                                <i className="ri ri-checkbox-circle-line"></i>
                                                <span>Added</span>
                                            </NavLink>
                                        )}
                                        <a id="fav" href="#">
                                            <i className="bx bx-heart"></i>
                                            <span>Add Favorites</span>
                                        </a>
                                        <NavLink id="call" to="/contact">
                                            <i className="bx bx-phone"></i>
                                            <span>Contact Now</span>
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                            {isAdmin() && (
                                <div className="flex-col">
                                    <div className="flex-btn">
                                        <NavLink
                                            id="cart"
                                            to={`/admin/edit-product/${products._id}`}
                                        >
                                            <i className="ri ri-edit-line"></i>
                                            <span>Edit Product</span>
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                    <section data-aos="zoom-in" className="page" id="products">
                        <h2>Related Products</h2>
                        <FetchProducts category={products.product_category} />
                    </section>
                </>
            )}
        </>
    );
};

export default ViewProduct;
