import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Table = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://localhost:7192/api/Customers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).filter(
      key => !['createdBy', 'updatedBy', 'updatedAt', 'createdByNavigation', 'updatedByNavigation'].includes(key)
    );
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredData = data.filter(item => {
    return Object.values(item).some(value =>
      value !== null && typeof value === 'string' &&
      value.toLowerCase().includes(searchTerm)
    );
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Data List</h3>
      <input
        type="text"
        placeholder="Search by name, email, or contact number..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="form-control mb-3"
      />
      <div className="table-responsive m-1">
        <table className="table table-bordered">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column} scope="col">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                {columns.map(column => (
                  <td key={column}>
                    {typeof item[column] === 'string' && item[column].includes('T') 
                      ? formatDate(item[column])
                      : item[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
