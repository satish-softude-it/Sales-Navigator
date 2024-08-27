import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const AddCustomerDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://localhost:7192/api/Customers/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Customer added successfully",
      });
      // Optionally, reset form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: ""
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Failed to add customer",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="container my-4" onSubmit={handleSubmit}>
      <h3 className="mb-4">Add Customer Details</h3>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter customer name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Phone:</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Address:</label>
          <textarea
            name="address"
            className="form-control"
            rows="3"
            placeholder="Enter customer address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">City:</label>
          <input
            type="text"
            name="city"
            className="form-control"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">State:</label>
          <input
            type="text"
            name="state"
            className="form-control"
            placeholder="Enter state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            className="form-control"
            placeholder="Enter zip code"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Country:</label>
          <input
            type="text"
            name="country"
            className="form-control"
            placeholder="Enter country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
        <button type="submit" className="btn btn-primary mb-2 mb-md-0">
          Add Customer
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: ""
          })}
        >
          Clear Form
        </button>
      </div>
    </form>
  );
};

export default AddCustomerDetails;
