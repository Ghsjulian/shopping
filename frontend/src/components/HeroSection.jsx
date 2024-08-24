import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Slider from "../slider/HeroSlide";

const HeroSection = () => {
    return (
        <section data-aos="zoom-in" className="hero section">
           <h2>E Commerce Shopping Store</h2>
                <p>
                    Hey, What's going on find your best products in our store
                    and continue shopping with us
                </p><br/><br/>
        </section>
    );
};

export default HeroSection;
