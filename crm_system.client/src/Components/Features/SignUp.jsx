import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import GoogleButton from "react-google-button";
import GoogleSignUp from "../GoogleSignUp/GoogleSignUp";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SignUp = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => (event) => {
    event.preventDefault();
    navigate(path);
  };

  const [formState, setFormState] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formState.role) errors.role = "Role is required";
    if (!formState.name.trim()) errors.name = "Name is required";
    if (!formState.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formState.email)) errors.email = "Email is invalid";
    if (!formState.password) errors.password = "Password is required";
    else if (formState.password.length < 8) errors.password = "Password must be at least 8 characters";
    if (formState.password !== formState.confirmPassword) errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const { confirmPassword, ...dataToSubmit } = formState;
      const response = await axios.post('https://localhost:7192/api/Users/register', dataToSubmit);
      console.log(response.data);
      Swal.fire({
        title: "Sign Up!",
        text: "User created successfully! Redirecting to Sign In page....",
        icon: "success"
      }).then(() => {
        navigate('/signIn');
      });
    } catch (error) {
      console.error('Registration failed:', error);
      Swal.fire({
        title: "Oops!",
        text: "Registration failed. Please try again.",
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
                <h3 className="text-center mb-4">Sign Up</h3>

                <div className="d-flex justify-content-around mb-3">
                  <GoogleButton className="rounded" />
                  <GoogleSignUp />
                </div>

                <div className="text-center text-muted mb-3">OR</div>

                <div className="form-floating mb-3">
                  <select name="role" value={formState.role} onChange={handleChange} required className="form-select" id="floatingRole">
                    <option value="" disabled>Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="sales manager">Sales Manager</option>
                    <option value="sales representative">Sales Representative</option>
                    <option value="sales support">Sales Support</option>
                  </select>
                  <label htmlFor="floatingRole">Role</label>
                  {errors.role && <div className="text-danger">{errors.role}</div>}
                </div>

                <div className="form-floating mb-3">
                  <input name="name" value={formState.name} onChange={handleChange} type="text" className="form-control" id="floatingName" placeholder="Full Name" required />
                  <label htmlFor="floatingName">Full Name</label>
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>

                <div className="form-floating mb-3">
                  <input name="email" value={formState.email} onChange={handleChange} type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" required />
                  <label htmlFor="floatingEmail">Email address</label>
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>

                <div className="form-floating mb-3">
                  <input name="password" value={formState.password} onChange={handleChange} type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
                  <label htmlFor="floatingPassword">Password</label>
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>

                <div className="form-floating mb-3">
                  <input name="confirmPassword" value={formState.confirmPassword} onChange={handleChange} type="password" className="form-control" id="floatingConfirmPassword" placeholder="Confirm Password" required />
                  <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                  {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
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