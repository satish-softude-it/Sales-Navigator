import { useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddCustomerDetails = () => {
  const token = localStorage.getItem("token");
  const { userId } = JSON.parse(localStorage.getItem('user') || '{}');

  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    createdBy: userId,
    dateCreated: new Date().toISOString(),
    updatedBy: null,
    updatedAt: null
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `https://localhost:7192/api/Customers`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Customer added successfully",
      });
      setFormData(initialFormState);  // Reset form after successful submission
    } catch (err) {
      console.error("Submission Error:", err.response ? err.response.data : err.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response ? err.response.data : "Failed to add customer",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => setFormData(initialFormState);

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
            required
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
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Phone:</label>
          <input
            type="tel"
            name="tel"
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
            type="number"
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
        <button type="submit" className="btn btn-primary mb-2 mb-md-0" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Customer...' : 'Add Customer'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          Clear Form
        </button>
      </div>
    </form>
  );
};

export default AddCustomerDetails;