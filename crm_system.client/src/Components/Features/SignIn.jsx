import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import { FaGoogle } from "react-icons/fa";
import GoogleButton from 'react-google-button';
import GoogleSignUp from "../GoogleSignUp/GoogleSignUp";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignInClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    navigate("/signup"); // Navigate to the SignIn page
  };

  return (
    <form className="form p-4">
      <p className="title">SignIn</p>
      {/* <p className="message">Welcome to CRM System </p> */}

      <div className="">
        <div className=" input-container d-flex justify-content-around">
        <GoogleButton className="rounded-4" />
        <GoogleSignUp/>
        </div>
      </div>

      <div className="text-muted m-1">OR</div>

      <label>
        <input required placeholder="" type="email" className="input" />
        <span>Email</span>
      </label>

      <label>
        <input required placeholder="" type="password" className="input" />
        <span>Password</span>
      </label>

      <button className="submit">Submit</button>
      <button className="submit">Submit</button>

      <p className="signin">
        Already have an account?{" "}
        <a href="" onClick={handleSignInClick}>
          Signin
        </a>
      </p>

      <small>Empower Your Business with Seamless Connections</small>
    </form>
  );
};

export default SignUp;
