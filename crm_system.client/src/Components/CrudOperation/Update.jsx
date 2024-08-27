import React, { useState } from "react";

const UpdateCustomerDetails = () => {
  // Assume we have the customer's current details
  const [customer, setCustomer] = useState({

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated customer data to your backend
    console.log("Updated customer details:", customer);
  };

  return (
    <form className="container my-4" onSubmit={handleSubmit}>
      <h3 className="mb-4">Update Customer Details</h3>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={customer.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Company:</label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={customer.company}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={customer.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone:</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={customer.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Address:</label>
        <textarea
          className="form-control"
          rows="3"
          name="address"
          value={customer.address}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
        <button type="submit" className="btn btn-primary mb-2 mb-md-0">
          Update Customer
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            setCustomer({
              name: "John Doe",
              company: "ABC Corp",
              email: "john.doe@abccorp.com",
              phone: "123-456-7890",
              address: "123 Main St, Anytown, USA",
            })
          }
        >
          Reset to Original
        </button>
      </div>
    </form>
  );
};

export default UpdateCustomerDetails;
