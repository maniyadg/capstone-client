import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { config } from "./Config";
import "./css/sb_admin-2.css";

function Createproduct() {
    const navigate = useNavigate();
    const CreateProduct = useFormik({
        initialValues: {
            name: '',
            brand: "",
            price: "",
            img: '',
            qty:'',
            des:''
        },
        validate: (values) => {
            let errors = {}
            if (!values.name) {
              errors.name = 'Required';
            }
            if (!values.brand) {
                errors.brand = 'Required';
              }
              if (!values.qty) {
                errors.qty = 'Required';
              }

              if (!values.price) {
                errors.price = 'Required';
              } else if (values.price < 499) {
                errors.price = 'Product name must be between 3 to 15 characters';
              }

              if (!values.des) {
                errors.des = 'Required';
              } else if (values.des.length <= 15 || values.name.length > 500) {
                errors.des = 'Product Description must be between 15 to 500 Words';
              }
      

            return errors
          },
        onSubmit: async (values) => {
            try {
                const product = await axios.post(`${config}/admin/items/product`, values, {
                    headers: {
                        Authorization: localStorage.getItem("Inventory_billing_app"),
                    },
                });
                CreateProduct.resetForm();
                if (product.data.message === "product created") {
                    alert('product created successfully')
                    navigate('/portal/product')
                }else{
                    alert('Please re-login')
                }
            } catch (error) {
                alert(error.response.data.message);
            }
        },
    });

    return (
        <div class="container">
            <form onSubmit={CreateProduct.handleSubmit}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Product Name</label>
                            <input
                                type={"name"}
                                name="name"
                                value={CreateProduct.values.name}
                                onChange={CreateProduct.handleChange}
                                onBlur={CreateProduct.handleBlur}
                                className={`form-control
                                ${CreateProduct.errors.name ? 'error-box' : ''} 
                                ${CreateProduct.touched.name && !CreateProduct.errors.name ? 'success-box' : ''}`}
                             />
                             {
                               CreateProduct.errors.name ? <span style={{ color: "red" }}>{CreateProduct.errors.name}</span> : null
                             }
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Brand</label>
                            <input
                                type={"text"}
                                name="brand"
                                value={CreateProduct.values.brand}
                                onChange={CreateProduct.handleChange}
                                onBlur={CreateProduct.handleBlur}
                                className={`form-control
                                ${CreateProduct.errors.brand ? 'error-box' : ''} 
                                ${CreateProduct.touched.brand && !CreateProduct.errors.brand ? 'success-box' : ''}`}
                             />
                             {
                               CreateProduct.errors.brand ? <span style={{ color: "red" }}>{CreateProduct.errors.brand}</span> : null
                             }
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                type={"text"}
                                name="qty"
                                value={CreateProduct.values.qty}
                                onChange={CreateProduct.handleChange}
                                onBlur={CreateProduct.handleBlur}
                                className={`form-control
                                ${CreateProduct.errors.qty ? 'error-box' : ''} 
                                ${CreateProduct.touched.qty && !CreateProduct.errors.qty ? 'success-box' : ''}`}
                             />
                             {
                               CreateProduct.errors.qty ? <span style={{ color: "red" }}>{CreateProduct.errors.qty}</span> : null
                             }
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type={"text"}
                                name="price"
                                value={CreateProduct.values.price}
                                onChange={CreateProduct.handleChange}
                                className={`form-control
                                ${CreateProduct.errors.price ? 'error-box' : ''} 
                                ${CreateProduct.touched.price && !CreateProduct.errors.price ? 'success-box' : ''}`}
                             />
                             {
                               CreateProduct.errors.price ? <span style={{ color: "red" }}>{CreateProduct.errors.price}</span> : null
                             }
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <label>Image</label>
                            <input
                                type={"text"}
                                name="img"
                                value={CreateProduct.values.img}
                                onChange={CreateProduct.handleChange}
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
                                value={CreateProduct.values.des}
                                onChange={CreateProduct.handleChange}
                                className={`form-control
                                ${CreateProduct.errors.des ? 'error-box' : ''} 
                                ${CreateProduct.touched.des && !CreateProduct.errors.des ? 'success-box' : ''}`}
                             />
                             {
                               CreateProduct.errors.des ? <span style={{ color: "red" }}>{CreateProduct.errors.des}</span> : null
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

export default Createproduct;