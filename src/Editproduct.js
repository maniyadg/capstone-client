import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import "./css/sb_admin-2.css";

function EditProduct() {
    const { _id } = useParams()
    const navigate = useNavigate();
    const EditProduct = useFormik({
        initialValues: {
            name: '',
            category: "",
            price: "",
            img: ''
        },
        onSubmit: async (values) => {
            try {
                const product = await axios.put(`http://localhost:3001/admin/items/product/${_id}`, values, {
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


    const editProduct = async (_id) => {
        try {
            const product = await axios.get(`http://localhost:3000/admin/items/product/${_id}`, {
                headers: {
                    Authorization: localStorage.getItem("Inventory_billing_app"),
                },
            });
            EditProduct.setValues(product.data);
        } catch (error) {
            alert("Something went wrong");
        }
    };

    return (
        <div class="container">
            <form onSubmit={EditProduct.handleSubmit}>
                <div className="row">
                    <div className="col-lg-4">
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
                    <div className="col-lg-4">
                        <div className="form-group">
                            <label>Category</label>
                            <input
                                type={"text"}
                                name="category"
                                value={EditProduct.values.category}
                                onChange={EditProduct.handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type={"text"}
                                name="price"
                                value={EditProduct.values.price}
                                onChange={EditProduct.handleChange}
                                className="form-control"
                            />
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