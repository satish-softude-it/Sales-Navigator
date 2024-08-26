import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#home">
        <img
          className="mx-2"
          src="../../../public/images/crm.png"
          width={30}
          alt=""
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse  d-flex justify-content-around"
        id="navbarNav"
      >
        <ul className="navbar-nav mr-auto text-primary">
          <strong>Sales Navigator</strong>
        </ul>
        <form
          className="form-inline my-2 my-lg-0 d-flex justify-content-end"
        >
          <button className="btn btn-outline-primary mx-4" type="submit">
            <Link to={"/signup"}>SignUp</Link>
          </button>{" "}
          <button className="btn btn-outline-success" type="submit">
            <Link to={"/signin"}>Login</Link>
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
