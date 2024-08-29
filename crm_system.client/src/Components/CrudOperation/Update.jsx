import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateCustomerDetails = () => {
  const [customerIdInput, setCustomerIdInput] = useState(""); // State for the customer ID input
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });

  const [originalCustomer, setOriginalCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [customerId, setCustomerId] = useState(null); // State for the customer ID from input

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.userId;

  useEffect(() => {
    if (customerId) {
      fetchCustomerData();
    }
  }, [customerId]);

  const fetchCustomerData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://localhost:7192/api/Customers/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomer(response.data);
      setOriginalCustomer(response.data);
      setError(null);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Failed to fetch customer data");
      setCustomer({});
      setOriginalCustomer({});
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:  err? err.response.data : "Failed to fetch customer data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerIdChange = (e) => {
    setCustomerIdInput(e.target.value);
  };

  const handleCustomerIdSubmit = (e) => {
    e.preventDefault();
    if (customerIdInput.trim()) {
      setCustomerId(customerIdInput.trim());
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCustomer = {
        ...customer,
        updatedBy: userId,
        updatedAt: new Date().toISOString()
      };
      const response = await axios.put(
        `https://localhost:7192/api/Customers/${customerId}`,
        updatedCustomer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      console.log("Update response:", response.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Customer updated successfully",
      });
      setOriginalCustomer(updatedCustomer);
    } catch (err) {
      console.error("Update Error:", err.response ? err.response.data : err.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response ? err.response.data : "Failed to update customer",
      });
    }
  };

  const handleReset = () => {
    setCustomer(originalCustomer);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container my-4">
      {!customerId ? (
        <form onSubmit={handleCustomerIdSubmit} className="mb-4">
          <h3 className="mb-4">Enter Customer ID</h3>
          <div className="mb-3">
            <label className="form-label">Customer ID:</label>
            <input
              type="text"
              className="form-control"
              value={customerIdInput}
              onChange={handleCustomerIdChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
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
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={customer.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
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
            <div className="col-md-6">
              <label className="form-label">Address:</label>
              <textarea
                className="form-control"
                rows="3"
                name="address"
                value={customer.address}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">City:</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={customer.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">State:</label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={customer.state}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Zip Code:</label>
              <input
                type="text"
                className="form-control"
                name="zipCode"
                value={customer.zipCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Country:</label>
              <input
                type="text"
                className="form-control"
                name="country"
                value={customer.country}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
            <button type="submit" className="btn btn-primary mb-2 mb-md-0">
              Update Customer
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Reset to Original
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateCustomerDetails;
