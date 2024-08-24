import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getInfo, isAdmin, deleteCookie } from "../Cookies";
import { useCart } from "../context/useCart";
import axios from "axios";

const Header = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { cart, getCart, dispatch } = useCart();
    const navigate = useNavigate();
    const priceRef = useRef(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState(null);
    const [noti, setNoti] = useState(null);
    const [adminNoti, setAdminNoti] = useState(null);
    const flashRef = useRef(null);
    const flashMessage = useRef(null);
    const headerRef = useRef(null);
    const [query, setQuery] = useState(null);
    const [isOpen, setisOpen] = useState(false);
    const openHeader = () => {
        headerRef.current.classList.toggle("show-header");
        setisOpen(!isOpen);
    };
    const closeHeader = () => {
        headerRef.current.classList.remove("show-header");
        setisOpen(!isOpen);
    };
    const location = useLocation();
    const [path, setPath] = useState("");

    const logout = async () => {
        closeHeader();
        const info = getInfo();
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            flashRef.current.classList.add("flash");
            const response = await fetch(apiUrl + "/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            });
            const responseData = await response.json();
            if (responseData.type) {
                deleteCookie("e-comUser");
                // flashMessage.current.textContent = responseData.success;
                //window.location.reload()
                setTimeout(() => {
                    navigate("/login");
                }, 2500);
            } else {
                flashMessage.current.textContent = responseData.error;
            }
        } catch (error) {
            flashMessage.current.textContent = error;
        }
    };

    const goToHome = () => {
        navigate("/");
    };
    const fetchOrder = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                apiUrl + "/get-order/" + getInfo().userId
            );
            if (response.data) {
                setProducts(response.data.products);
                setNoti(response.data.message);
            } else {
                setIsLoading(false);
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
                setAdminNoti(response.data);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchOrder();
        if (isAdmin()) {
            fetchAdminNoti();
            if (isLoading) {
                return;
            }
        }
        if (isLoading) {
            return;
        }
        setPath(location.pathname);
    }, [location]);

    return (
        <>
            <header ref={headerRef} className="header" data-aos="zoom-in">
                <div className="nav-menu" data-aos="zoom-in">
                    <h2>Main Menu </h2>
                    <div className="search-container">
                        <input
                            type="text"
                            onChange={e => {
                                setQuery(e.target.value);
                            }}
                            value={query}
                            placeholder="Search..."
                        />
                        <NavLink
                            onClick={() => {
                                query && closeHeader();
                            }}
                            to={query && `/search/${query.toLocaleLowerCase()}`}
                        >
                            <i className="bx bx-search-alt-2"></i>
                        </NavLink>
                    </div>
                    <ul>
                        <li>
                            <NavLink
                                onClick={closeHeader}
                                to="/"
                                className={path == "/" ? "active" : ""}
                            >
                                <i className="bx bx-home"></i>Home
                            </NavLink>
                        </li>

                        {isAdmin() && getInfo().token && (
                            <>
                                <li>
                                    <NavLink
                                        onClick={closeHeader}
                                        to="/admin/dashboard"
                                        className={
                                            path == "/admin/dashboard"
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <i className="bx bx-grid-alt"></i>
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        onClick={closeHeader}
                                        to="/profile"
                                        className={
                                            path == "/profile" ? "active" : ""
                                        }
                                    >
                                        <i className="bx bx-shield"></i>
                                        Profile
                                    </NavLink>
                                </li>
                                <li id="mobile-cart">
                                    <NavLink
                                        onClick={closeHeader}
                                        to="/admin/orders"
                                        className={
                                            path == "/admin/orders"
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <i className="bx bx-bell"></i>
                                        Notifications
                                        {adminNoti && adminNoti.length > 0 && (
                                            <span
                                                style={{
                                                    backgroundColor: "#0bc900"
                                                }}
                                                id="noti"
                                            >
                                                {adminNoti.length}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        onClick={closeHeader}
                                        to="/admin/add-product"
                                        className={
                                            path == "/admin/add-product"
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <i className="bx bx-plus-circle"></i>
                                        Add Product
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        onClick={closeHeader}
                                        to="/admin/products"
                                        className={
                                            path == "/admin/products"
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <i className="bx bx-task"></i>
                                        All Products
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {!isAdmin() && getInfo().token && (
                            <>
                                <li>
                                    <NavLink
                                        onClick={closeHeader}
                                        to="/profile"
                                        className={
                                            path == "/profile" ? "active" : ""
                                        }
                                    >
                                        <i className="bx bx-user-circle"></i>
                                        Profile
                                    </NavLink>
                                </li>
                                <li id="mobile-cart">
                                    <NavLink
                                        onClick={closeHeader}
                                        to="/notifications"
                                        className={
                                            path == "/notifications"
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <i className="bx bx-bell"></i>
                                        Notifications
                                        {noti && (
                                            <span
                                                style={{
                                                    backgroundColor: "#0bc900"
                                                }}
                                                id="noti"
                                            >
                                                1
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                                <li id="mobile-cart">
                                    <NavLink
                                        onClick={closeHeader}
                                        to="/cart"
                                        className={
                                            path == "/cart" ? "active" : ""
                                        }
                                    >
                                        <i className="bx bx-cart"></i> Cart
                                        {cart.length > 0 && (
                                            <span id="noti">{cart.length}</span>
                                        )}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        onClick={closeHeader}
                                        to="/orders"
                                        className={
                                            path == "/orders" ? "active" : ""
                                        }
                                    >
                                        <i className="bx bx-shopping-bag"></i>
                                        Orders
                                        {products && products.length > 0 && (
                                            <span
                                                style={{
                                                    backgroundColor: "#bb00d2"
                                                }}
                                                id="noti"
                                            >
                                                {products.length}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                            </>
                        )}
                        <li>
                            <NavLink
                                onClick={closeHeader}
                                to="/categories"
                                className={
                                    path == "/categories" ? "active" : ""
                                }
                            >
                                <i className="bx bx-sitemap"></i>
                                Categories
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={closeHeader}
                                to="/latest-products"
                                className={
                                    path == "/latest-products" ? "active" : ""
                                }
                            >
                                <i className="bx bx-customize"></i>Latest
                                Products
                            </NavLink>
                        </li>
                        {/* If User Not Login */}
                        {!getInfo().token && (
                            <>
                                <li>
                                    <NavLink
                                        onClick={closeHeader}
                                        to="/login"
                                        className={
                                            path == "/login" ? "active" : ""
                                        }
                                    >
                                        <i className="bx bx-log-in-circle"></i>
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        onClick={closeHeader}
                                        to="/signup"
                                        className={
                                            path == "/signup" ? "active" : ""
                                        }
                                    >
                                        <i className="bx bx-user-plus"></i>
                                        Signup
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {/* If User Not Login */}
                        {!isAdmin() && (
                            <>
                                <li>
                                    <NavLink
                                        onClick={closeHeader}
                                        to="/about"
                                        className={
                                            path == "/about" ? "active" : ""
                                        }
                                    >
                                        <i className="bx bx-info-circle"></i>{" "}
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        onClick={closeHeader}
                                        to="/contact"
                                        className={
                                            path == "/contact" ? "active" : ""
                                        }
                                    >
                                        <i className="bx  bxl-whatsapp"></i>{" "}
                                        Contact
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {/*If User Logged In */}
                        {getInfo().token && (
                            <>
                                <li>
                                    <NavLink
                                        style={{
                                            backgroundColor: "transparent"
                                        }}
                                        onClick={() => {
                                            logout();
                                        }}
                                        to="#"
                                        className={
                                            path == "/logout" ? "active" : ""
                                        }
                                    >
                                        <i className="bx bx-log-out-circle"></i>
                                        Logout
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {/*If User Logged In */}
                    </ul>
                </div>
            </header>
            <nav className="top-bar">
                <h3 style={{cursor:"pointer"}} onClick={goToHome}>Shopping-Cart</h3>
                <button onClick={openHeader}>
                    <i className={`bx bx-${isOpen ? "x" : "menu"}`}></i>
                </button>
                <div className="top-bar-links">
                    <div className="search">
                        <input
                            type="search"
                            onChange={e => {
                                setQuery(e.target.value);
                            }}
                            value={query}
                            placeholder="Search..."
                        />
                    </div>
                    <NavLink
                        to={query && `/search/${query.toLocaleLowerCase()}`}
                    >
                        <i className="bx bx-search-alt-2"></i>
                    </NavLink>
                    {!isAdmin() && getInfo().token && (
                        <>
                            <NavLink to="/notifications">
                                <i className="bx bx-bell"></i>
                                {noti && (
                                    <span
                                        style={{
                                            backgroundColor: "#0bc900"
                                        }}
                                        id="noti"
                                    >
                                        1
                                    </span>
                                )}
                            </NavLink>
                            {!isAdmin() && getInfo().token && (
                                <NavLink to="/cart">
                                    <i className="bx bx-cart"></i>
                                    {cart.length > 0 && (
                                        <span id="noti">{cart.length}</span>
                                    )}
                                </NavLink>
                            )}
                        </>
                    )}
                    {isAdmin() && getInfo().token && (
                        <>
                            <NavLink to="/admin/orders">
                                <i className="bx bx-bell"></i>
                                {adminNoti && adminNoti.length > 0 && (
                                    <span
                                        style={{
                                            backgroundColor: "#0bc900"
                                        }}
                                        id="noti"
                                    >
                                        {adminNoti.length}
                                    </span>
                                )}
                            </NavLink>
                            <NavLink to="/about">
                                <img
                                    src="/icons/android-chrome-512x512.png"
                                    alt="Admin Avtar"
                                />
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
            <div ref={flashRef}>
                <h2 ref={flashMessage}>Please Wait...</h2>
            </div>
        </>
    );
};

export default Header;
