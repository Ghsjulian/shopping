import React, { useState, useEffect } from "react";
import { getInfo } from "../Cookies";
import { useNavigate, useLocation } from "react-router-dom";

const PrivatePath = ({ children }) => {
    const cookies = getInfo();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!cookies.token && !cookies.userId) {
            navigate("/login");
        }
    }, [cookies]);
    return cookies.token && children;
};
export default PrivatePath;
