import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
    .sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID, // Use VITE_EMAILJS_ prefix
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Use VITE_EMAILJS_ prefix
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_ID // Use VITE_EMAILJS_ prefix
    )
    .then(
      (result) => {
        alert("Message sent successfully!");
        console.log("SUCCESS!", result.text);
        // Reset form after success
        form.current.reset();
      },
      (error) => {
        alert("Failed to send message, please try again.");
        console.log("FAILED...", error.text);
      }
    );
  };

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
            <div className="info-item" data-aos="fade-up" data-aos-delay="200">
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

            <div className="info-item" data-aos="fade-up" data-aos-delay="400">
              <div>
                <h3>Email Us</h3>
                <p>crm@sales.navigator.com</p>
              </div>
            </div>
            {/* End Info Item */}
          </div>

          <div className="col-lg-8">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="user_name"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    name="user_email"
                    className="form-control"
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
