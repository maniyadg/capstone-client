import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/sb_admin-2.css";

function Product() {
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        productData()
    }, []);


    const productData = async () => {
        try {
            const products = await axios.get(`http://localhost:3001/admin/items/products`, {
                headers: {
                    Authorization: localStorage.getItem("Inventory_billing_app"),
                },
            });
            setProductList(products.data);
        } catch (error) {
            alert("Some thing went wrong");
        }
    };
    const deleteProduct = async (_id) => {
        try {
            await axios.delete(`http://localhost:3001/admin/items/product/${_id}`, {
                headers: {
                    Authorization: localStorage.getItem("Inventory_billing_app"),
                },
            });
            const pIndex = productList.findIndex((p) => p.id == _id);
            productList.splice(pIndex, 1);
            setProductList([...productList]);
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.response.data.message);
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
                            <table
                                class="table table-bordered"
                                id="dataTable"
                                width="100%"
                                cellspacing="0"
                            >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Quantity</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Quantity</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {productList.map((products) => {
                                        return <tr>
                                            <td>{products._id}</td>
                                            <td>{products.name}</td>
                                            <td>{products.brand}</td>
                                            <td>{products.qty}</td>
                                            <td>
                                                <img src={products.img} width={50} height={50} />
                                            </td>
                                            <td>{products.price} </td>
                                            <td>
                                                <Link to={`/portal/view-product/${products._id}`} className="btn btn-warning mr-1">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Link>
                                                <Link to={`/portal/edit-product/${products._id}`} className="btn btn-primary mr-1">
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Link>
                                                <button onClick={() => deleteProduct(products._id)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>






        </div>
    );
}

export default Product;