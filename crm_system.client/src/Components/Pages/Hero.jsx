import React from "react";
import bg from "../../assets/img/hero-bg-2.jpg";
import hero from "../../assets/img/details-1.png";
import { Link } from "react-router-dom";
import SignUp from "../Features/SignUp";

const Hero = () => {
  return (
    <section id="hero" className="p-5 mt-5 hero section dark-background">
      <img src={bg} alt="" className="hero-bg" />

      <div className="container">
        <div className="row gy-4 justify-content-between">
          <div
            className="col-lg-4 order-lg-last hero-img"
            data-aos="zoom-out"
            data-aos-delay="100"
          >
            <img src={hero} className="img-fluid animated" alt="" />
          </div>

          <div
            className="col-lg-6 d-flex flex-column justify-content-center"
            data-aos="fade-in"
          >
            <h1>
              Empower Your Business with Seamless Connections{" "}
              <span>Sales Navigator</span>
            </h1>
            <p>
              Helps to manage interactions with customers, track sales, and
              automate various processes.
            </p>
            <div className="d-flex">
              <Link to="/signIn" className="text-white btn-get-started">
                <b>Sign In</b>
              </Link>

              <span className="mx-5 btn-get-going d-flex align-items-center">
                <Link to={"/signUp"} className="text-white">
                  Sign Up
                </Link>
              </span>

            </div>
          </div>
        </div>
      </div>

      <svg
        className="hero-waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="wave-path"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          ></path>
        </defs>
        <g className="wave1">
          <use xlinkHref="#wave-path" x="50" y="3"></use>
        </g>
        <g className="wave2">
          <use xlinkHref="#wave-path" x="50" y="0"></use>
        </g>
        <g className="wave3">
          <use xlinkHref="#wave-path" x="50" y="9"></use>
        </g>
      </svg>
    </section>
  );
};

export default Hero;
