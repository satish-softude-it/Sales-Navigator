import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import SignUp from "./Components/Features/SignUp";
import SignIn from "./Components/Features/SignIn";

import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import Dashboard from "./Components/Pages/Dashboard";
import PrivateRoute from "./Components/PrivateRoute"; // Import the PrivateRoute component

function App() {
  return (
    <Router>
      <Routes>
        {/* ---------------- Page ------------------- */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />

        {/*---------------- Features --------------------*/}
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
