import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import About from "../components/AboutSection";
import Contact from "../components/Contact";
import LatestProducts from "../components/LatestProducts";
import { getInfo, isAdmin } from "../Cookies";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";

const Home = () => {
    document.title =
        "Shopping Cart Official Website - Designed By Web Developer Ghs Julian";
    const { cart, dispatch, getCart } = useCart();
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" }), [];
        // if (isAdmin()) {
//             navigate("/admin/dashboard");
//         }
    }, []);

    return (
        <>
            <HeroSection />
            <LatestProducts />
        </>
    );
};

export default Home;
