import React from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import './App.css';


function Resetpass() {
    const { id, token } = useParams()
  const navigate = useNavigate();
  const resetpass = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      let errors = {}

      if (!values.password) {
        errors.password = "Required"
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i.test(values.password)) {
        errors.password = "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character";
      }
      return errors
    },
    onSubmit: async (values) => {
      try {
        const user = await axios.put(`http://localhost:3000/admin/user/reset-password/${id}/${token}`, values);
        if (user.data.message === "Password Updated Successfully") {
          alert('Password Updated Successfully')
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
          <h2>Login Page</h2>
          <div className="row ">
            <div className="col-lg-12">
              <img className="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQep3pj2g_8IgBBwBSxpz1sL_0qqzw_Torsg&usqp=CAU" />
            </div>
          </div>
          <form onSubmit={resetpass.handleSubmit}>
            <div className="row">
              <div className="col-lg-12 form-group">
                <label>New Password</label>
                <input
                  type={"password"}
                  name="password"
                  value={resetpass.values.password}
                  onBlur={resetpass.handleBlur}
                  onChange={resetpass.handleChange} 
                  className={`form-control
                   ${resetpass.errors.password ? 'error-box' : ''} 
                   ${resetpass.touched.password && !resetpass.errors.password ? 'success-box' : ''}`}
                  placeholder="Enter Valid Password"
                />
                {
                  resetpass.errors.password ? <span style={{ color: "red" }}>{resetpass.errors.password}</span> : null
                }
              </div>
              <div className="col-lg-12 form-group">
                <label>Confirm Password</label>
                <input
                  type={"password"}
                  name="confirmPassword"
                  value={resetpass.values.confirmPassword}
                  onChange={resetpass.handleChange}
                  onBlur={resetpass.handleBlur}
                  className={`form-control
                   ${resetpass.errors.password ? 'error-box' : ''} 
                   ${resetpass.touched.password && !resetpass.errors.password ? 'success-box' : ''}`}
                  placeholder="Enter Valid Password"
                />
                {
                  resetpass.errors.password ? <span style={{ color: "red" }}>{resetpass.errors.password}</span> : null
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


export default Resetpass;
