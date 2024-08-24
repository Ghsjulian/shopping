import { Outlet } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";

/* LOAD CSS STYLING FILES */
import "../assets/css/layouts.css";
import "../assets/css/page.css";
import "../assets/css/responsive.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/remixicon/remixicon.css";

const Layouts = ({ children }) => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
        window.scrollTo({ top: 0, behavior: "smooth" }), [];
    });
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layouts;
