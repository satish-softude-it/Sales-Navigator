import React from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSignInClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    navigate("/signIn"); // Navigate to the SignIn page
  };

  return (
    <form className="form p-4">
      <p className="title">SignIn</p>
      {/* <p className="message">Welcome to CRM System </p> */}

      <div className="text-muted m-1">OR</div>

      <label>
        <input required placeholder="" type="email" className="input" />
        <span>Email</span>
      </label>

      <button className="submit">Submit</button>

      <p className="signin">
        {" "}
        <a href="" onClick={handleSignInClick}>
          Back to Sign In?
        </a>
      </p>

      <small>Empower Your Business with Seamless Connections</small>
    </form>
  );
};

export default ForgotPassword;
