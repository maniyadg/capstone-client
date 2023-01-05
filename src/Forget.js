import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import './App.css';


function Forget() {
  const Forgetform = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      let errors = {}
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors
    },
    onSubmit: async (values) => {
      try {
        const user = await axios.post(`http://localhost:3001/admin/user/forget`, values);
        if (user.data.message === "Link Sended") {
          alert('Check Your Mail for Reset Password Link')
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });
  return (
    <div className="container forms">
      <div className="d-lg-flex">
        <div className="card form  border-0 me-lg-4 mb-lg-0 mb-4">
          <div className="backgroundEffect"></div>
          <h2>Login Page</h2>
          <div className="row ">
            <div className="col-lg-12">
              <img className="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQep3pj2g_8IgBBwBSxpz1sL_0qqzw_Torsg&usqp=CAU" />
            </div>
          </div>
          <form onSubmit={Forgetform.handleSubmit}>
            <div className="row">
              <div className="col-lg-12 form-group">
                <label>E-MAIL</label>
                <input
                  type={"email"}
                  name="email"
                  value={Forgetform.values.email}
                  onBlur={Forgetform.handleBlur}
                  onChange={Forgetform.handleChange} 
                  className={`form-control
                   ${Forgetform.errors.email ? 'error-box' : ''} 
                   ${Forgetform.touched.email && !Forgetform.errors.email ? 'success-box' : ''}`}
                />
                {
                  Forgetform.errors.email ? <span style={{ color: "red" }}>{Forgetform.errors.email}</span> : null
                }
              </div>
              <div className="col-lg-12 ">
                <input
                  type={"submit"}
                  className="btn btn-primary mt-2"
                  value={"Submit"}
                />
              </div>
            </div>
          </form>
          <div className="row content">
            <div className="col-lg-12">
              <h5>If you don't have an account <Link to="/register">
                Click Here
              </Link></h5>
            </div>
          </div>
          <div className="row content">
            <div className="col-lg-12">
              <Link to="/forget">
                Forget Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Forget;
