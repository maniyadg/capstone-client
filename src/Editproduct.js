import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./css/sb_admin-2.css";
import { config } from "./Config";

function EditProduct() {
    const { _id } = useParams()
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);

    const EditProduct = useFormik({
        initialValues: {
            name: '',
            brand: "",
            qty:'',
            price: "",
            img: '',
            des: ""
        },

        onSubmit: async (values) => {
            try {
                const product = await axios.put(`${config.api}/admin/items/product/${_id}`, values, {
                    headers: {
                        Authorization: localStorage.getItem("Inventory_billing_app"),
                    },
                });
                EditProduct.resetForm();
                if (product.data.message === "updated successfully") {
                    alert('product updated successfully')
                    navigate('/portal/product')
                }
            } catch (error) {
                alert(error.response.data.message);
            }
        },
    });
    useEffect(() => {
        editProduct()
    }, []);

    const editProduct = async (_id) => {
        try {
            const product = await axios.get(`${config.api}/admin/items/product/${_id}`, {
                headers: {
                    Authorization: localStorage.getItem("Inventory_billing_app"),
                },
            });
            setProductList(product.data);
        } catch (error) {
            alert("Something went wrong");
        }
    };

    return (
        <div class="container">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Edit Product</h1>
                <Link to={"/portal/product"} class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                    <i class="fas fa-download fa-sm text-white-50"></i>Back
                </Link>
            </div>
            <form onSubmit={EditProduct.handleSubmit}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input
                                type={"name"}
                                name="name"
                                value={EditProduct.values.name}
                                onChange={EditProduct.handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Brand</label>
                            <input
                                type={"text"}
                                name="brand"
                                value={EditProduct.values.brand}
                                onChange={EditProduct.handleChange}
                                onBlur={EditProduct.handleBlur}
                                className={`form-control
                                ${EditProduct.errors.brand ? 'error-box' : ''} 
                                ${EditProduct.touched.brand && !EditProduct.errors.brand ? 'success-box' : ''}`}
                             />
                             {
                               EditProduct.errors.brand ? <span style={{ color: "red" }}>{EditProduct.errors.brand}</span> : null
                             }
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                type={"text"}
                                name="qty"
                                value={EditProduct.values.qty}
                                onChange={EditProduct.handleChange}
                                onBlur={EditProduct.handleBlur}
                                className={`form-control
                                ${EditProduct.errors.qty ? 'error-box' : ''} 
                                ${EditProduct.touched.qty && !EditProduct.errors.qty ? 'success-box' : ''}`}
                             />
                             {
                               EditProduct.errors.qty ? <span style={{ color: "red" }}>{EditProduct.errors.qty}</span> : null
                             }
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type={"text"}
                                name="price"
                                value={EditProduct.values.price}
                                onChange={EditProduct.handleChange}
                                className={`form-control
                                ${EditProduct.errors.price ? 'error-box' : ''} 
                                ${EditProduct.touched.price && !EditProduct.errors.price ? 'success-box' : ''}`}
                             />
                             {
                               EditProduct.errors.price ? <span style={{ color: "red" }}>{EditProduct.errors.price}</span> : null
                             }
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>Image</label>
                            <input
                                type={"text"}
                                name="img"
                                value={EditProduct.values.img}
                                onChange={EditProduct.handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type={"text"}
                                name="des"
                                value={EditProduct.values.des}
                                onChange={EditProduct.handleChange}
                                className={`form-control
                                ${EditProduct.errors.des ? 'error-box' : ''} 
                                ${EditProduct.touched.des && !EditProduct.errors.des ? 'success-box' : ''}`}
                             />
                             {
                               EditProduct.errors.des ? <span style={{ color: "red" }}>{EditProduct.errors.des}</span> : null
                             }
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-group">
                            <input type={"submit"} value={'Submit'} className="btn btn-primary" />
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default EditProduct;