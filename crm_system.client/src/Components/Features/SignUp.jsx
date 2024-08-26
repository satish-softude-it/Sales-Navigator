import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import GoogleButton from "react-google-button";
import GoogleSignUp from "../GoogleSignUp/GoogleSignUp";

const SignUp = () => {
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
                <h3 className="text-center mb-4">Sign Up</h3>

                <div className="d-flex justify-content-around mb-3">
                  <GoogleButton className="rounded" />
                  <GoogleSignUp />
                </div>

                <div className="text-center text-muted mb-3">OR</div>

                <div className="form-floating mb-3">
                  <select required className="form-select" id="floatingRole">
                    <option value="" disabled selected>Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="sales_manager">Sales Manager</option>
                    <option value="sales_representative">Sales Representative</option>
                    <option value="sales_support">Sales Support</option>
                  </select>
                  <label htmlFor="floatingRole">Role</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingName" placeholder="Full Name" required />
                  <label htmlFor="floatingName">Full Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" required />
                  <label htmlFor="floatingEmail">Email address</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingConfirmPassword" placeholder="Confirm Password" required />
                  <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                </div>

                <button className="btn btn-primary w-100 mb-3" type="submit">Submit</button>

                <div className="text-center" style={{fontSize:'0.7rem'}}>
                  Already have an account?{" "}
                  <a href="#" onClick={handleNavigation("/signIn")} style={{fontSize:'0.9rem'}}>Sign In</a>
                </div>

                <small className="d-block text-center text-muted mt-3" style={{fontSize:'0.8rem'}}>
                  By signing up, you agree to our{" "}
                  <a href="https://crmservice.com/privacy-policy/">Terms of Service and Privacy Policy</a>.
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
