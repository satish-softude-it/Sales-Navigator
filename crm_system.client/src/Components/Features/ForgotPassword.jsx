import React from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => (event) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card mt-5">
            <div className="card-body">
              <form className="p-1">
                <h3 className="text-center mb-4">Forgot Password</h3>

                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" required />
                  <label htmlFor="floatingEmail">Email address</label>
                </div>

                <button className="btn btn-primary w-100 mb-3" type="submit">Request OTP</button>

                <div className="text-center">
                  <a href="#" onClick={handleNavigation("/signIn")}><span className="text-black" style={{fontSize:'0.8rem'}}>Back to </span><span style={{fontSize:'0.9rem'}}> Sign In?</span></a>
                </div>

                <small className="d-block text-center text-muted mt-3">Empower Your Business with Seamless Connections</small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
