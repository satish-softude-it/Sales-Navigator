import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import SignUp from "./Components/Features/SignUp";
import SignIn from "./Components/Features/SignIn";
import ForgotPassword from "./Components/Features/ForgotPassword";

import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import Dashboard from "./Components/Pages/Dashboard";
import GoogleSignIn from "./Components/Features/GoogleSignUp";
import OTPVerification from "./Components/Features/OTPVerification";

function App() {
  return (
    <>
      <Router>
        <Routes>
          --------------- Page -------------------
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />


          {/*---------------- Features --------------------*/}
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/forgotPassword" element={<OTPVerification />} />
          <Route path="/googlesignin" element={<GoogleSignIn/>}/>
        </Routes>
      </Router>
    </>
  );
}
export default App;
