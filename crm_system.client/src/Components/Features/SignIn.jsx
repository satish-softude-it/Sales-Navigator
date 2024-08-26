import { useNavigate } from "react-router-dom";

const SignIn = () => {
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
                <h3 className="text-center mb-4">Sign In</h3>

                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" required />
                  <label htmlFor="floatingEmail">Email address</label>
                </div>

                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="btn btn-primary w-100 mb-3" type="submit">Submit</button>

                <div className="d-flex justify-content-between mb-3" style={{fontSize:'0.9rem'}}>
                  <a href="#" onClick={handleNavigation("/forgotPassword")}>Forgot Password?</a>
                  <a href="#" onClick={handleNavigation("/signUp")}> <small className="text-black">New User?</small> Sign Up</a>
                </div>

                <small className="d-block text-center text-muted">Empower Your Business with Seamless Connections</small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;