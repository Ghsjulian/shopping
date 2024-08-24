import React from "react";
import FetchProducts from "./FetchProducts";
import { useNavigate, NavLink, useParams } from "react-router-dom";

const SearchView = () => {
    const { query } = useParams();
    document.title = "Search Results For - " + query;
    return (
        <section data-aos="zoom-in" className="page" id="products">
            <h2>Matched Products </h2>
            <FetchProducts category={query} />
        </section>
    );
};

export default SearchView;
