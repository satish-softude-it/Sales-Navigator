import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const DeleteUser = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await axios.get(`https://localhost:7192/api/Users/userList`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      Swal.fire("Error!", "Failed to fetch user data.", "error");
    }
  };

  const handleDelete = async () => {
    if (selectedUser && selectedUser.userId) {
      try {
        await axios.delete(`https://localhost:7192/api/Users/${selectedUser.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire("Deleted!", "User has been deleted.", "success");
        setSelectedUser(null);
        setShowConfirmation(false);
        fetchUsersData(); // Refresh the user list
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error!", "There was an error deleting the user.", "error");
      }
    } else {
      console.error("Selected user is not valid.", selectedUser);
      Swal.fire("Error!", "No user selected or invalid user ID.", "error");
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery) || 
    user.email.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container my-4">
      <h3 className="mb-4">Delete User</h3>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={handleSearch}
      />
      {selectedUser ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{selectedUser.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{selectedUser.email}</h6>
            <p className="card-text">
              <strong>Role:</strong> {selectedUser.role}
              <br />
              <strong>User ID:</strong> {selectedUser.userId}
              <br />
              <strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}
            </p>
            {!showConfirmation ? (
              <button className="btn btn-danger" onClick={() => setShowConfirmation(true)}>
                Delete User
              </button>
            ) : (
              <div>
                <p className="text-danger">
                  Are you sure you want to delete this user? This action cannot be undone.
                </p>
                <button
                  className="btn btn-danger me-2"
                  onClick={handleDelete}
                >
                  Confirm Delete
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Select a user to delete</p>
      )}
      <div className="list-group mt-4">
        {filteredUsers.map((user) => (
          <button
            key={user.userId}
            className="list-group-item list-group-item-action"
            onClick={() => setSelectedUser(user)}
          >
            {user.name} - {user.email} ({user.role})
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeleteUser;