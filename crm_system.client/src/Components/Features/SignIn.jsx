import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleNavigation = (path) => (event) => {
    event.preventDefault();
    navigate(path);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7192/api/Users/login', formData);
      console.log("Response : "+JSON.stringify(response.data));
      
      // Store token
      localStorage.setItem('token', response.data.token);
      
        // Store user data
        localStorage.setItem('user', JSON.stringify(response.data.user));
      
      Swal.fire({
        title: "Sign In Successful",
        text: "Redirecting to Dashboard...",
        icon: "success",
        timer: 500,
        showConfirmButton: false
      }).then(() => {
        navigate('/dashboard');
      });
    } catch (error) {
      console.error('Sign In failed:', error);
      Swal.fire({
        title: "Sign In Failed",
        text: error.response?.data?.message || "Please check your credentials and try again.",
        icon: "error"
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card mt-5">
            <div className="card-body">
              <form className="p-1" onSubmit={handleSubmit}>
                <h3 className="text-center mb-4">Sign In</h3>

                <div className="form-floating mb-3">
                  <input 
                    onChange={handleInputChange}
                    type="email" 
                    className="form-control" 
                    id="floatingEmail" 
                    name="email"
                    placeholder="name@example.com" 
                    required 
                  />
                  <label htmlFor="floatingEmail">Email address <span className="text-danger">*</span></label>
                </div>

                <div className="form-floating mb-3">
                  <input 
                    onChange={handleInputChange}
                    type="password" 
                    className="form-control" 
                    id="floatingPassword" 
                    name="password"
                    placeholder="Password" 
                    required 
                  />
                  <label htmlFor="floatingPassword">Password <span className="text-danger">*</span></label>
                </div>

                <button className="btn btn-primary w-100 mb-3" type="submit">Sign In</button>

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