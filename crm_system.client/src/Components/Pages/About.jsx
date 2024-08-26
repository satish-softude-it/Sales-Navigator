import React from "react";
import question from '../../assets/img/faq.jpg'

const About = () => {
  return (
    <section id="about" className=" about section m-2">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row align-items-xl-center gy-5">
          <div className="col-xl-5 content m-auto">
            <h3>About Us</h3>
            <h2>Customer Relationship Management System</h2>
            <p>
              A Customer Relationship Management (CRM) system helps manage
              customer data. It supports sales management, delivers actionable
              insights, integrates with social media and facilitates team
              communication. Cloud-based CRM systems offer complete mobility and
              access to an ecosystem of bespoke apps.
            </p>
            <a href="#" className="read-more">
              <span>Read More</span>
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>

          <div
            className="col-lg-4 order-lg-last hero-img"
            data-aos="zoom-out"
            data-aos-delay="100"
          >
            <img src={question} className="img-fluid animated" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
