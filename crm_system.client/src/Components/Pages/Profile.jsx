import axios from "axios";
import React, { useEffect } from "react";

const Profile = () => {
    const token =  localStorage.getItem('token');
    const [profile, setProfile] = React.useState({});
    const userId = localStorage.getItem('user');

    useEffect(()=>{
      const response = axios.get(`https://localhost:7192/api/Users/{userId}`,
        {headers: {
          'Authorization': `Bearer ${token}`
        }}
      )
    })


  return (
    <form className="container my-4">
      <h3 className="mb-4">User Profile</h3>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Name :</label>
          <input
            type="text"
            className="form-control"
            placeholder="Shri Krishna...."
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email :</label>
          <input
            type="email"
            className="form-control"
            placeholder="name@gmail.com"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Role :</label>
        <input
          type="text"
          className="form-control"
          placeholder="Role"
          disabled
        />
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
        <button type="submit" className="btn btn-warning mb-2 mb-md-0">
          Save Changes
        </button>
        <button type="button" className="btn btn-info">
          <i className="fa fa-lock" aria-hidden="true">
            {" "}
          </i> &nbsp;
           Reset Password
        </button>
      </div>
    </form>
  );
};

export default Profile;
