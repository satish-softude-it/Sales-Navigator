import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import GoogleButton from "react-google-button";
import GoogleSignUp from "../GoogleSignUp/GoogleSignUp";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignInClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    navigate("/signin"); // Navigate to the SignIn page
  };

  return (
    <form className="form p-4">
      <p className="title">Registration</p>
      <p className="message">Signup now and get full access to our app.</p>
      <div className="">
        <div className=" input-container d-flex justify-content-around">
        <GoogleButton className="rounded-4" />
        <GoogleSignUp/>
        </div>
      </div>

      
      <div className="text-muted m-1">OR</div>

      <label className="form-label">
        <select required className="input">
          <option value="" disabled>
            Select a role
          </option>
          <option value="admin">Admin</option>
          <option value="sales_manager">Sales Manager</option>
          <option value="sales_representative">Sales Representative</option>
          <option value="sales_support">Sales Support</option>
        </select>
        <span className="form-label-text m-1">Role</span>
      </label>

      <label>
        <input required placeholder="" type="text" className="input" />
        <span>Full Name</span>
      </label>

      <label>
        <input required placeholder="" type="email" className="input" />
        <span>Email</span>
      </label>

      <label>
        <input required placeholder="" type="password" className="input" />
        <span>Password</span>
      </label>

      <label>
        <input required placeholder="" type="password" className="input" />
        <span>Confirm password</span>
      </label>

      <button className="submit">Submit</button>

      <p className="signin">
        Already have an account?{" "}
        <a href="" onClick={handleSignInClick}>
          Signin
        </a>
      </p>
      <small>
        By signing up you agree to our{" "}
        <a href="https://crmservice.com/privacy-policy/#:~:text=Customers%20of%20CRM%2Dservice%20may,may%20be%20required%20by%20law.">
          Terms of Service and Privacy Policy
        </a>
      </small>
    </form>
  );
};

export default SignUp;
