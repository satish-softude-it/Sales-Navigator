import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const DeleteCustomerDetails = () => {
  const [custData, setCustData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    showCustomersData();
  }, []);

  const showCustomersData = async () => {
    try {
      const response = await axios.get(`https://localhost:7192/api/Customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCustData(response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const handleDelete = async () => {
    console.log(selectedCustomer)
    if (selectedCustomer && selectedCustomer.customerId) {
      try {
        await axios.delete(`https://localhost:7192/api/Customers/${selectedCustomer.customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire("Deleted!", "Customer has been deleted.", "success");
        setSelectedCustomer(null);
        setShowConfirmation(false);
        showCustomersData(); // Refresh the customer list
      } catch (error) {
        console.error("Error deleting customer:", error);
        Swal.fire("Error!", "There was an error deleting the customer.", "error");
      }
    } else {
      console.error("Selected customer is not valcustomerId.");
      Swal.fire("Error!", "No customer selected or invalcustomerId customer customerId.", "error");
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredCustomers = custData.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container my-4">
      <h3 className="mb-4">Delete Customer</h3>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearch}
      />
      {selectedCustomer ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{selectedCustomer.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{selectedCustomer.company}</h6>
            <p className="card-text">
              <strong>Email:</strong> {selectedCustomer.email}
              <br />
              <strong>Phone:</strong> {selectedCustomer.phone}
              <br />
              <strong>Address:</strong> {selectedCustomer.address}
            </p>
            {!showConfirmation ? (
              <button className="btn btn-danger" onClick={() => setShowConfirmation(true)}>
                Delete Customer
              </button>
            ) : (
              <div>
                <p className="text-danger">
                  Are you sure you want to delete this customer? This action
                  cannot be undone.
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
        <p>Select a customer to delete</p>
      )}
      <div className="list-group mt-4">
        {filteredCustomers.map((customer) => (
          <button
            key={customer.customerId}
            className="list-group-item list-group-item-action"
            onClick={() => setSelectedCustomer(customer)}
          >
            {customer.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeleteCustomerDetails;
