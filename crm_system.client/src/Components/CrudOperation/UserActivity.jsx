import React, { useState } from 'react';
import axios from 'axios';
const UserActivity = () => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState({ user: null, customers: [], interactions: [] });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate userId (example: check if it's a number)
    if (!userId || isNaN(userId)) {
      setError('Please enter a valid User ID.');
      return;
    }

    setError('');
    setData({ user: null, customers: [], interactions: [] });
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_SERVER_PORT; // Use the environment variable
      const headers = { Authorization: `Bearer ${token}` };

      const userResponse = await axios.get(`${baseUrl}/Users/${userId}`, { headers });

      if (!userResponse.data) {
        setError('User details not found.');
        setIsLoading(false);
        return;
      }

      const [customersResponse, interactionsResponse] = await Promise.all([
        axios.get(`${baseUrl}/Customers/createdBy/${userId}`, { headers }),
        axios.get(`${baseUrl}/Interaction/createdBy/${userId}`, { headers })
      ]);

      setData({
        user: userResponse.data,
        customers: customersResponse.data,
        interactions: interactionsResponse.data
      });

      if (customersResponse.data.length === 0 && interactionsResponse.data.length === 0) {
        setError('No customers or interactions found for this user.');
      }
    } catch (error) {
      console.error('Error fetching data:', error); // Log the error for debugging
      if (error.response && error.response.status === 404) {
        setError('User not found.');
      } else {
        setError('Error fetching data. Please check the user ID and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const { user, customers, interactions } = data;

  return (
    <div className="container mt-4">
      <h2>User Dashboard</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={!userId || isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {user && (
        <div>
          <h3>User Details</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>

          <h4>Customers Created</h4>
          {customers.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>CustomerID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.customerId}>
                    <td>{customer.customerId}</td>  
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No customers found.</p>
          )}

          <h4>Interactions Done to</h4>
          {interactions.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>InteractionId</th>
                  <th>CustomerId</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {interactions.map(interaction => (
                  <tr key={interaction.interactionId}>
                    <td>{interaction.interactionId}</td>
                    <td>{interaction.customerId}</td>
                    <td>{new Date(interaction.interactionDate).toLocaleString()}</td>
                    <td>{interaction.interactionType}</td>
                    <td>{interaction.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No interactions found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserActivity;
  