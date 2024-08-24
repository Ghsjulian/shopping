import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <p>Powered By - Shopping-Cart LTD.</p>
            <p>
                © <span>Copyright</span>
                <span> All Rights Reserved</span>
            </p>
            <p>
                Designed by -
                <NavLink
                    style={{ textDecoration: "none", margin: "0 .3rem" }}
                    target="_blank"
                    to="https://ghsresume.netlify.app"
                >
                    Ghs Julian
                </NavLink>
            </p>
        </footer>
    );
};

export default Footer;
