import React from "react";
import FetchProducts from "./FetchProducts";
import AllProducts from "./AllProducts"

const LatestProducts = () => {
    return (
        <>
            <section data-aos="zoom-in" className="page" id="products">
                <h2>Our Latest Products</h2>
                <p id="desc">
                    Explore our new updated in stock products, Our latest
                    products are available in the stock, for more details or buy
                    one please order or cart now.
                </p>
               <AllProducts /> 
            </section>
        </>
    );
};

export default LatestProducts;
