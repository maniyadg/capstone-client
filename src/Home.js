import React from "react";
import { Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="container forms">
      <div className="d-lg-flex">
      <div className="card form homecard border-0 me-lg-4 mb-lg-0 mb-4">
      <div className="backgroundEffect"></div>
        <div className="row ">
          <div className="col-lg-12">
            <img className='w-100' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Rqkr7x0-e4Zzp88szISuOepgLJ90dytHQg&usqp=CAU" />
            <h2>Investory Billing  <br/> App</h2>
          </div>
        </div>
        <div className="row content">
          <div className="col-lg-12">
            <Link to="login" className="btn btn-primary">
              Login
            </Link>
            <br/>
            <Link to="register" className="btn btn-warning mt-2">
              Register
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Home;



