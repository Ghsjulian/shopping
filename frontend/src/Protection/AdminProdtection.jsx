import React, { useState, useEffect } from "react";
import { getInfo, isAdmin } from "../Cookies";
import { useNavigate, useLocation } from "react-router-dom";

const AdminProdtection = ({children}) => {
    const cookies = getInfo();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!isAdmin()) {
            navigate("/");
        }
    }, [cookies, isAdmin()]);
    return cookies.token && isAdmin() && children;
};

export default AdminProdtection;
