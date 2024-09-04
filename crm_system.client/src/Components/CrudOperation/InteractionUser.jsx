import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const InteractionUser = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isCustomerValid, setIsCustomerValid] = useState(false);
  const [token, setToken] = useState(null);

  const [formData, setFormData] = useState({
    customerId: "",
    userId: "",
    interactionDate: "",
    interactionType: "Phone Call",
    notes: ""
  });
  
  useEffect(() => {
    // Get userId and token from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem("token");
    if (user && user.userId && storedToken) {
      setUserId(user.userId);
      setToken(storedToken);
      setFormData(prevData => ({
        ...prevData,
        userId: user.userId
      }));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "User information or token not found. Please log in again.",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Clear the error for this field when the user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ""
      }));
    }
    // Reset customer validation if customerId changes
    if (name === 'customerId') {
      setIsCustomerValid(false);
    }
  };

  const validateCustomerId = async () => {
    if (!formData.customerId) {
      setErrors(prevErrors => ({ ...prevErrors, customerId: "Customer ID is required" }));
      return;
    }else     if ( isNaN(formData.customerId)) {
      setErrors(prevErrors => ({ ...prevErrors, customerId: "Customer ID must be a number" }));
      return;
    }

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Authentication token not found. Please log in again.",
      });
      return;
    }

    setIsLoading(true);
    console.log(formData.customerId)
    try {
      const response = await axios.get(`https://localhost:7192/api/Customers/${formData.customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setIsCustomerValid(true);
        setErrors(prevErrors => ({ ...prevErrors, customerId: "" }));
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Customer ID validated successfully!',
        });
      } else {
        setIsCustomerValid(false);
        setErrors(prevErrors => ({ ...prevErrors, customerId: "Invalid Customer ID" }));
      }
    } catch (error) {
      console.error("Error validating customer:", error.response);
      setIsCustomerValid(false);
      setErrors(prevErrors => ({ ...prevErrors, customerId: error?.response?.data }));
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || "Failed to validate Customer ID.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.customerId) newErrors.customerId = "Customer ID is required";
    if (!isCustomerValid) newErrors.customerId = "Customer ID must be validated";
    if (!formData.interactionDate) newErrors.interactionDate = "Date is required";
    if (!formData.interactionType) newErrors.interactionType = "Interaction type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!userId || !token) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "User information or token not found. Please log in again.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://localhost:7192/api/Interaction",
        {
          ...formData,
          interactionDate: new Date(formData.interactionDate).toISOString()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Interaction saved successfully!',
      });

      // Reset form
      setFormData({
        customerId: "",
        userId: userId,
        interactionDate: "",
        interactionType: "Phone Call",
        notes: ""
      });
      setIsCustomerValid(false);
    } catch (error) {
      console.error("Error saving interaction:", error.response);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || "Failed to save interaction.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">New Interaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="customerId" className="form-label">Customer ID</label>
          <div className="input-group">
            <input
              type="text"
              id="customerId"
              name="customerId"
              className={`form-control ${errors.customerId ? 'is-invalid' : ''}`}
              value={formData.customerId}
              onChange={handleInputChange}
            />
            <button 
              className="btn btn-outline-secondary" 
              type="button"
              onClick={validateCustomerId}
              disabled={isLoading}
            >
              {isLoading ? "Validating..." : "Validate"}
            </button>
          </div>
          {errors.customerId && <div className="invalid-feedback d-block">{errors.customerId}</div>}
        </div>

        {isCustomerValid && (
          <>
            <div className="mb-3">
              <label htmlFor="interactionDate" className="form-label">Interaction Date</label>
              <input
                type="date"
                id="interactionDate"
                name="interactionDate"
                className={`form-control ${errors.interactionDate ? 'is-invalid' : ''}`}
                value={formData.interactionDate}
                onChange={handleInputChange}
              />
              {errors.interactionDate && <div className="invalid-feedback">{errors.interactionDate}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="interactionType" className="form-label">Interaction Type</label>
              <select
                id="interactionType"
                name="interactionType"
                className={`form-select ${errors.interactionType ? 'is-invalid' : ''}`}
                value={formData.interactionType}
                onChange={handleInputChange}
              >
                <option value="Phone Call">Phone Call</option>
                <option value="Email">Email</option>
                <option value="Meeting">Meeting</option>
              </select>
              {errors.interactionType && <div className="invalid-feedback">{errors.interactionType}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="notes" className="form-label">Notes</label>
              <textarea
                id="notes"
                name="notes"
                className="form-control"
                rows="4"
                placeholder="Any additional notes about the interaction..."
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Interaction"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default InteractionUser;