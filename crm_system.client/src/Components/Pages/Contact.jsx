import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="contact section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <div>
          <span>Check Our</span>
          <span className="description-title">Contact</span>
        </div>
      </div>
      {/* End Section Title */}

      <div className="container" data-aos="fade" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-4">
            <div
              className="info-item    "
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div>
                <h3>Address</h3>
                <p>B2C, Software Guru, Indore, India</p>
              </div>
            </div>
            {/* End Info Item */}

            <div className="info-item" data-aos="fade-up" data-aos-delay="300">
              <div>
                <h3>Call Us</h3>
                <p>+91 73545 60597</p>
              </div>
            </div>
            {/* End Info Item */}

            <div className="info-item " data-aos="fade-up" data-aos-delay="400">
              <div>
                <h3>Email Us</h3>
                <p>crm@sales.navigator.com</p>
              </div>
            </div>
            {/* End Info Item */}
          </div>

          <div className="col-lg-8">
            <form
              action="forms/contact.php"
              method="post"
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="6"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">
                    Your message has been sent. Thank you!
                  </div>

                  <button type="submit">Send Message</button>
                </div>
              </div>
            </form>
          </div>
          {/* End Contact Form */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
