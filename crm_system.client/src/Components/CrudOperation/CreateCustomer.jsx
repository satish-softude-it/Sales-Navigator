import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const countriesWithStates = {
  India: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ],
  USA: ["California", "Texas", "New York", "Florida", "Illinois"],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba"],
  // Add more countries and their states as needed
};

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
    country: "India", // Default country
    createdBy: userId,
    dateCreated: new Date().toISOString(),
    updatedBy: null,
    updatedAt: null
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [states, setStates] = useState(countriesWithStates[initialFormState.country]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setStates(countriesWithStates[formData.country] || []);
  }, [formData.country]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      country: selectedCountry,
      state: "" // Reset state when country changes
    }));
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (value.trim() === '') {
          error = 'Name is required';
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = 'Name must be a string and contain only letters and spaces';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const emailParts = value.split('@');
        const domainParts = emailParts[1]?.split('.');

        error = !emailRegex.test(value) ? 'Invalid email address' : '';

        if (emailParts.length !== 2 || domainParts.length < 2) {
          error = 'Email address must have a prefix, domain name, and domain name identifier';
        }
        break;
      case 'phone':
        error = !/^\d{10}$/.test(value) ? 'Phone number must be exactly 10 digits' : '';
        break;
      case 'zipCode':
        error = !/^\d{6}$/.test(value) ? 'Zip code must be exactly 6 digits' : '';
        break;
      case 'city':
        if (value.trim() === '') {
          error = 'City is required';
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = 'City name must be a string and contain only letters and spaces';
        }
        break;
      case 'state':
        error = value.trim() === '' ? 'State is required' : '';
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    Object.keys(formData).forEach(field => validateField(field, formData[field]));

    // Check for errors
    if (Object.values(errors).some(error => error !== '')) {
      setIsSubmitting(false);
      return;
    }

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
      setStates(countriesWithStates[initialFormState.country]); // Reset states to default
      setErrors({});
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

  const handleReset = () => {
    setFormData(initialFormState);
    setStates(countriesWithStates[initialFormState.country]);
    setErrors({});
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
            required
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
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
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Phone:</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
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
            required
          />
          {errors.city && <div className="text-danger">{errors.city}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Country:</label>
          <select
            name="country"
            className="form-select"
            value={formData.country}
            onChange={handleCountryChange}
          >
            {Object.keys(countriesWithStates).map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">State:</label>
          <select
            name="state"
            className="form-select"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select state</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {errors.state && <div className="text-danger">{errors.state}</div>}
        </div>
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
          {errors.zipCode && <div className="text-danger">{errors.zipCode}</div>}
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

