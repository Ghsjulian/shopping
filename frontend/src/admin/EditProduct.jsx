import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
        document.title = "Edit And Update Existing Product - Shopping Cart";
    const param = useParams();
    const [isProducts, setIsProducts] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const messageRef = useRef(null);
    const btnRef = useRef(null);
    const [file, setFile] = useState(null);
    const [fileData, setFileDataURL] = useState(null);
    const [desc, setDesc] = useState("");
    const initialProduct = {
        product_title: "",
        product_desc: "",
        product_obj: null,
        product_category: ""
    };
    const [products, setProduct] = useState(initialProduct);
    const createStr = data => {
        let str = data
            .trim()
            .replaceAll('"', "")
            .replace("{", "")
            .replace("}", "");
        return str;
    };
    const createObject = string => {
        const strings = string.split(",");
        const obj = {};
        for (let i = 0; i < strings.length; i++) {
            let [key, value] = strings[i].split(":");
            key = key.trim();
            value = value.trim();
            obj[key] = value;
        }
        return obj;
    };
    const handleChange = event => {
        setProduct({ ...products, [event.target.name]: event.target.value });
    };
    const handleFileChange = event => {
        const imgfile = event.target.files[0];
        setFile(imgfile);
    };

    const AddProduct = async () => {
        const obj = createObject(desc);
        products.product_obj = obj;
        const formData = new FormData();
        if (!file) {
            formData.append("isImage", "NO");
            formData.append("img", products.product_img);
        } else {
            formData.append("isImage", "YES");
        }
        formData.append("product_img", file);
        formData.append("id", products._id);
        formData.append("product_title", products.product_title);
        formData.append("product_category", products.product_category);
        formData.append("product_desc", JSON.stringify(obj));
        if (
            products.product_title &&
            products.product_category &&
            products.product_obj
        ) {
            try {
                btnRef.current.textContent = "Processing...";
                const response = await axios.put(
                    apiUrl + "/admin/update-product/" + param.id,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                btnRef.current.textContent = "Edit Product";
                if (response.data.type) {
                    messageRef.current.classList.add("success");
                    messageRef.current.textContent = response.data.success;
                    navigate("/admin/products");
                } else {
                    messageRef.current.classList.add("error");
                    messageRef.current.textContent = response.data.error;
                }
            } catch (error) {
                messageRef.current.classList.add("error");
                messageRef.current.textContent = error;
            }
        } else {
            messageRef.current.classList.add("error");
            messageRef.current.textContent = "All Fields Are Required";
        }
        setTimeout(() => {
            messageRef.current.classList.remove("error");
            messageRef.current.textContent = "";
        }, 3000);
    };
    const fetchProduct = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `${apiUrl}/admin/edit-product/${param.id}`
            );
            if (response.data.products) {
                setProduct(response.data.products);
                setDesc(
                    createStr(
                        JSON.stringify(response.data.products.product_desc)
                    )
                );
                setIsLoading(false);
            } else {
                setIsProducts(false);
                console.log("No Products Found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProduct();
        if (isLoading) {
            return;
        }
    }, [param.id]);

    useEffect(() => {
        let fileReader,
            isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = e => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result);
                }
            };
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        };
    }, [file]);
    return (
        <section data-aos="zoom-in" id="view" className="page one-page">
            <h2>Edit Product</h2>
            <div id="add-product" className="signup-form">
                {fileData && <img src={fileData} alt="File For Uploading" />}
                <label htmlFor="product_img">Upload Product Image</label>
                <span ref={messageRef} id="message"></span>
                <input
                    type="file"
                    id="product_img"
                    hidden={true}
                    onChange={handleFileChange}
                />
                <input
                    name="product_title"
                    type="text"
                    placeholder="Enter Product Title"
                    onChange={handleChange}
                    value={products.product_title}
                />
                <input
                    name="product_category"
                    type="text"
                    placeholder="Enter Product Category"
                    onChange={handleChange}
                    value={products.product_category}
                />
                <textarea
                    name="product_desc"
                    placeholder="Enter Products Descriptions"
                    onChange={e => {
                        setDesc(e.target.value);
                    }}
                    value={desc}
                ></textarea>
                <button ref={btnRef} onClick={AddProduct} className="submit">
                    Add Product
                </button>
            </div>
            <br />
            <br />
            <br />
        </section>
    );
};

export default EditProduct;
