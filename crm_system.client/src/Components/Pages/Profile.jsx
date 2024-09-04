import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const serverPort = import.meta.env.VITE_SERVER_PORT;

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [originalData, setOriginalData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${serverPort}/Users/${user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfileData(response.data);
      setOriginalData(response.data); // Save the original data
    } catch (err) {
      console.error(err);
      setError("Failed to fetch profile data");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch profile data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!profileData.name) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(profileData.name)) {
      errors.name = "Name must contain only letters and spaces";
    }

    // Email validation
    if (!profileData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      errors.email = "Email is invalid";
    } else {
      const [localPart] = profileData.email.split("@");
      if (!/^[a-zA-Z]/.test(localPart)) {
        errors.email = "Email's local part must start with a letter";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.put(
        `${serverPort}/Users/${user.userId}`,
        profileData,
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
        text: "Profile updated successfully",
      });
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setOriginalData(profileData); // Update the original data after successful update
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update profile",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      setHasChanges(JSON.stringify(updatedData) !== JSON.stringify(originalData));
      return updatedData;
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form className="container my-4" onSubmit={handleSubmit}>
      <h3 className="mb-4">User Profile</h3>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={profileData.name}
            onChange={handleChange}
          />
          {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={profileData.email}
            onChange={handleChange}
          />
          {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Role:</label>
        <input
          type="text"
          className="form-control"
          value={profileData.role}
          disabled
        />
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
        <button
          type="submit"
          className="btn btn-warning mb-2 mb-md-0"
          disabled={!hasChanges}
        >
          Update Changes
        </button>
        {/* <button 
          type="button" 
          className="btn btn-info" 
          onClick={() => {
            Swal.fire({
              icon: "info",
              title: "Reset to Original",
              text: "This feature is currently in development.",
            });
          }}
        >
          <i className="fa fa-lock" aria-hidden="true"></i> &nbsp; Reset to Original
        </button> */}
      </div>
    </form>
  );
};

export default Profile;
