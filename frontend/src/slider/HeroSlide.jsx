import { useState, useEffect } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";

const Slider = () => {
    return (
        <Carousel style={{ width: "100%" }}>
            <Carousel.Item>
                <img
                    className="carousel-image"
                    src="/images/Ecom.png"
                    alt="Hero images"
                />
                <Carousel.Caption>
                    <h2>E Commerce Shopping Store</h2>
                    <p>
                        Hey, What's going on find your best products in our
                        store and continue shopping with us
                    </p>
                    <div className="btn-area">
                        <a href="#products" id="see-more">
                            Continue Shopping
                        </a>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="carousel-image"
                    src="/images/Ecom.png"
                    alt="Hero Image"
                />
                <Carousel.Caption>
                    <h2>E Commerce Shopping Store</h2>
                    <p>
                        Hey, What's going on find your best products in our
                        store and continue shopping with us
                    </p>
                   <div className="btn-area">
                        <a href="#products" id="see-more">
                            Continue Shopping
                        </a>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="carousel-image"
                    alt="Hero images"
                    src="/images/d0b285fe2f9d435c9d1d45cc468c2a96.png"
                />
                <Carousel.Caption>
                    <h2>E Commerce Shopping Store</h2>
                    <p>
                        Hey, What's going on find your best products in our
                        store and continue shopping with us
                    </p>
                   <div className="btn-area">
                        <a href="#products" id="see-more">
                            Continue Shopping
                        </a>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Slider;
