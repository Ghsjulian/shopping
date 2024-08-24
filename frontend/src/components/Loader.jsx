import React from "react";

const Loader = ({ text }) => {
    return (
        <div className="grid-row">
            <div className="load-container">
                <div className="loader"></div>
                <h3>{text ?? "Loading..."}</h3>
            </div>
        </div>
    );
};

export default Loader;
