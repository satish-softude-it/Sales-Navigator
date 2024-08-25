import React, { useState } from 'react';

const DeleteCustomerDetails = () => {
  // Assume we have the customer's details
  const [customer] = useState({
    id: '12345',
    name: 'John Doe',
    company: 'ABC Corp',
    email: 'john.doe@abccorp.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA'
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    // Here you would typically send a delete request to your backend
    console.log('Deleting customer:', customer.id);
    // After successful deletion, you might want to redirect the user or show a success message
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="container my-4">
      <h3 className="mb-4">Delete Customer</h3>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{customer.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{customer.company}</h6>
          <p className="card-text">
            <strong>Email:</strong> {customer.email}<br />
            <strong>Phone:</strong> {customer.phone}<br />
            <strong>Address:</strong> {customer.address}
          </p>
          {!showConfirmation ? (
            <button className="btn btn-danger" onClick={handleDeleteClick}>
              Delete Customer
            </button>
          ) : (
            <div>
              <p className="text-danger">Are you sure you want to delete this customer? This action cannot be undone.</p>
              <button className="btn btn-danger me-2" onClick={handleConfirmDelete}>
                Confirm Delete
              </button>
              <button className="btn btn-secondary" onClick={handleCancelDelete}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomerDetails;