import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import './App.css';


function Login() {
  const navigate = useNavigate();
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {}


      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = "Required"
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i.test(values.password)) {
        errors.password = "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character";
      }
      return errors
    },
    onSubmit: async (values) => {
      try {
        const user = await axios.post(`http://localhost:3001/admin/users/login`, values);
        localStorage.setItem("Inventory_billing_app", user.data.token)
        if (user.data.message === "success") {
          alert('login successfully')
          navigate('/portal/product')
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    },
  });
  return (
    <div className="container forms">
      <div className="d-lg-flex">
        <div className="card form border-0 me-lg-4 mb-lg-0 mb-4">
          <div className="backgroundEffect"></div>
          <h2>Login Page</h2>
          <div className="row ">
            <div className="col-lg-12">
              <img className="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQep3pj2g_8IgBBwBSxpz1sL_0qqzw_Torsg&usqp=CAU" />
            </div>
          </div>
          <form onSubmit={loginForm.handleSubmit}>
            <div className="row">
              <div className="col-lg-12 form-group">
                <label>E-MAIL</label>
                <input
                  type={"email"}
                  name="email"
                  value={loginForm.values.email}
                  onBlur={loginForm.handleBlur}
                  onChange={loginForm.handleChange}
                  className={`form-control
                   ${loginForm.errors.email ? 'error-box' : ''} 
                   ${loginForm.touched.email && !loginForm.errors.email ? 'success-box' : ''}`}
                  placeholder="example@gmail.com"
                />
                {
                  loginForm.errors.email ? <span style={{ color: "red" }}>{loginForm.errors.email}</span> : null
                }

              </div>
              <div className="col-lg-12 form-group">
                <label>PASSWORD</label>
                <input
                  type={"password"}
                  name="password"
                  value={loginForm.values.password}
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  className={`form-control
                   ${loginForm.errors.password ? 'error-box' : ''} 
                   ${loginForm.touched.password && !loginForm.errors.password ? 'success-box' : ''}`}
                  placeholder="Enter Valid Password"
                />
                {
                  loginForm.errors.password ? <span style={{ color: "red" }}>{loginForm.errors.password}</span> : null
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


export default Login;
