import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./css/sb_admin-2.css";

function Viweproduct() {
    const navigate = useNavigate()
    const { _id } = useParams()
    const [productList, setProductList] = useState([]);
    const Viweproduct = useFormik({
        initialValues: {
            name: '',
            category: "",
            price: "",
            img: '',
            des: ""
        }
    })
    useEffect(() => {
        productData()
    }, []);


    const productData = async () => {
        try {
            const products = await axios.get(`http://localhost:3001/admin/items/product/${_id}`, {
                headers: {
                    Authorization: localStorage.getItem("Inventory_billing_app"),
                },
            });
            setProductList(products.data);
        } catch (error) {
            alert("Some thing went wrong");
        }
    };


    const logout = () => {
        localStorage.removeItem("Inventory_billing_app");
        navigate("/");
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 align-right">
                    <button className="btn btn-danger" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
            <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 class="h3 mb-0 text-gray-800">Product</h1>
                    <Link to={"/portal/create-product"} class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                        <i class="fas fa-download fa-sm text-white-50"></i>Create Product
                    </Link>
                </div>
                <div class="card shadow mb-4" width={2000}>
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
                    </div>

                    <div class="card-body">
                        <div class="table-responsive">
                            <form>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input
                                                type={"name"}
                                                name="name"
                                                value={productList.name}
                                                onChange={Viweproduct.handleChange}
                                                className="form-control"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <input
                                                type={"text"}
                                                name="category"
                                                value={productList.category}
                                                onChange={Viweproduct.handleChange}
                                                className="form-control"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input
                                                type={"text"}
                                                name="price"
                                                value={productList.price}
                                                onChange={Viweproduct.handleChange}
                                                className="form-control"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea 
                                                type={"text"}
                                                name="des"
                                                value={productList.des}
                                                onChange={Viweproduct.handleChange}
                                                className="form-control"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Image</label>
                                            <br />
                                            <img src={productList.img} width={100} height={100} />
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>






        </div>
    );
}

export default Viweproduct;