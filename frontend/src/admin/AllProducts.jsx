import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const AllProducts = () => {
        document.title = "All Products List - Shopping Cart";
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [products, setProducts] = useState(null);
    const [isProducts, setIsProducts] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProduct = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(apiUrl + "/admin/fetch-products");
            if (response.data.products) {
                setProducts(response.data.products);
                setIsLoading(false);
            } else {
                setIsProducts(false);
                console.log("No Products Found");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchProduct();
        if (isLoading) {
            return;
        }
    }, [isLoading]);
    const editProduct = id => {
        navigate(`/admin/edit-product/${id}`);
    };
    const deleteProductById = async id => {
        try {
            const response = await axios.get(
                `${apiUrl}/admin/delete-product/${id}`
            );
            if (response.data.products) {
            } else {
                console.log("No Products Found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = id => {
        deleteProductById(id);
        fetchProduct();
    };

    return (
        <section data-aos="zoom-in" id="view" className="page">
            {products && (
                <>
                    <h2>Added Products List</h2>
                    {/*isLoading && <h2>Loading...</h2>*/}
                    {!isProducts && (
                        <h3
                            style={{
                                color: "red",
                                fontSize: "16px"
                            }}
                        >
                            {" "}
                            No Product Added Yet{" "}
                        </h3>
                    )}
                    {products.map((product, index) => {
                        return (
                            <div className="cart" key={index}>
                                <div id="cart-col" className="cart-col">
                                    <img
                                        src={product.product_img}
                                        alt="Product Image"
                                    />
                                    <div className="price-col">
                                        <span>{product.product_title}</span>
                                        <span>
                                            Price : {product.product_desc.price}
                                        </span>
                                    </div>
                                </div>
                                <div className="cart-col">
                                    <div id="action-btn">
                                        <button
                                            onClick={() => {
                                                editProduct(product._id);
                                            }}
                                        >
                                            <i className="bx bx-pencil"></i>
                                        </button>
                                        <button
                                            onClick={() => {
                                                deleteProduct(product._id);
                                            }}
                                        >
                                            <i className="bx bxs-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
        </section>
    );
};

export default AllProducts;
