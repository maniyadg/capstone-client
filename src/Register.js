import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import './App.css';
function Register() {
  const navigate = useNavigate();
  const registerForn = useFormik({
    initialValues: {
      name: '',
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {}
      if (!values.name) {
        errors.name = 'Required';
      } else if (values.name.length <= 2 || values.name.length > 15) {
        errors.name = 'User name must be between 3 to 15 characters';
      }

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
        const user = await axios.post(`http://localhost:3001/admin/users/register`, values);
        if (user.data.message === "user created") {
          alert('successfully registered')
          navigate('/login')
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
          <h2>Registration Page</h2>
          <div className="row ">
            <div className="col-lg-12">
              <img className="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQep3pj2g_8IgBBwBSxpz1sL_0qqzw_Torsg&usqp=CAU" />
            </div>
          </div>
          <form onSubmit={registerForn.handleSubmit}>
            <div className="row">
              <div className="col-lg-12 form-group">
                <label>Name</label>
                <input
                  type={"text"}
                  name="name"
                  value={registerForn.values.name}
                  onBlur={registerForn.handleBlur}
                  onChange={registerForn.handleChange}
                  className={`form-control
                   ${registerForn.errors.name ? 'error-box' : ''} 
                   ${registerForn.touched.name && !registerForn.errors.name ? 'success-box' : ''}`}
                  placeholder="Enter Your Full Name"
                />
                {
                  registerForn.errors.name ? <span style={{ color: "red" }}>{registerForn.errors.name}</span> : null
                }
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 form-group">
                <label>E-MAIL</label>
                <input
                  type={"email"}
                  name="email"
                  value={registerForn.values.email}
                  onBlur={registerForn.handleBlur}
                  onChange={registerForn.handleChange}
                  className={`form-control
                   ${registerForn.errors.email ? 'error-box' : ''} 
                   ${registerForn.touched.email && !registerForn.errors.email ? 'success-box' : ''}`}
                  placeholder="example@gmail.com"
                />
                {
                  registerForn.errors.email ? <span style={{ color: "red" }}>{registerForn.errors.email}</span> : null
                }

              </div>
              <div className="col-lg-12 form-group">
                <label>PASSWORD</label>
                <input
                  type={"password"}
                  name="password"
                  value={registerForn.values.password}
                  onBlur={registerForn.handleBlur}
                  onChange={registerForn.handleChange}
                  className={`form-control
                   ${registerForn.errors.password ? 'error-box' : ''} 
                   ${registerForn.touched.password && !registerForn.errors.password ? 'success-box' : ''}`}
                  placeholder="Enter Valid Password"
                />
                {
                  registerForn.errors.password ? <span style={{ color: "red" }}>{registerForn.errors.password}</span> : null
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
              <h5>If you  have an account <Link to="/login">
                Click Here
              </Link></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Register;
