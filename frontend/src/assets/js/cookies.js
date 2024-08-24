"use strict";
class API {
    constructor() {
        this.host = "http://localhost:8080";
        this.header = { "Content-Type": "application/json" };
    }
     setCookie(cookieName, cookieValue) {
        const expirationDate = new Date();
        expirationDate.setTime(
            expirationDate.getTime() + 2 * 30 * 24 * 60 * 60 * 1000
        ); // 2 months in milliseconds
        document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
    }
    deleteCookie(cookieName) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() - 1);
        document.cookie = `${cookieName}=; expires=${expirationDate.toUTCString()}; path=/`;
    }
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}
/*

var api = new API();
let url = "http://localhost:8080/products/all-products.php";
let data = {
    product_name: "Fried Chicken And Rice",
    product_img: "update_product_1.jpg",
    product_price: "120TK BDT",
    category: "Fried Rice",
    product_description: "This is fried rice its tasty and so much delicious."
};

api.getData(url, res => {
    console.log(res);
});
*/

var api = new API();

export default api;
