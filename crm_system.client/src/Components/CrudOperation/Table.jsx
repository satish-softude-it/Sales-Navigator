import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ArrowUpDown, Users, Download } from "lucide-react";
import * as XLSX from "xlsx";

const Table = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try { 
      const response = await axios.get("https://localhost:7192/api/Customers", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      (key) => !["createdBy", "updatedBy", "updatedAt", "createdByNavigation", "updatedByNavigation"].includes(key)
    );
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some(
        (value) =>
          value !== null &&
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm)
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const customerStats = useMemo(() => ({
    totalCustomers: data.length,
    activeCustomers: data.filter((customer) => customer.status === "Active").length,
    uniqueCities: new Set(data.map((customer) => customer.city)).size,
    uniqueCountries: new Set(data.map((customer) => customer.country)).size,
  }), [data]);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, "customer_list.xlsx");
  };

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const formatKey = (key) => {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h3 className="mb-3">Customer List</h3>
          <div className="d-flex justify-content-between mb-3" style={{height:'7%'}}>
            <input
              type="text"
              placeholder="Search by name, email, or contact number..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control w-75"
            />
            <button onClick={downloadExcel} className="btn btn-success m-1">
              <Download size={24} className="me-2" />
              Download Excel
            </button>
            <div className="m-1 btn btn-info d-flex align-items-center">
              <div>
                <strong>Total Customers:</strong>
                <span className="fs-5"> {customerStats.totalCustomers}</span>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-light">
                <tr>
                  {columns
                    .filter((column) => column !== 'interactions')
                    .map((column) => (
                      <th
                        key={column}
                        scope="col"
                        onClick={() => handleSort(column)}
                        style={{ cursor: "pointer" }}
                      >
                        {formatKey(column)} <ArrowUpDown size={16} />
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item) => (
                  <tr key={item.id} onClick={() => handleRowClick(item)} style={{ cursor: "pointer" }}>
                    {columns
                      .filter((column) => column !== 'interactions')
                      .map((column) => (
                        <td key={column}>
                          {typeof item[column] === "string" && item[column].includes("T")
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
      </div>

      {selectedCustomer && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Customer Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedCustomer(null)}></button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered">
                  <tbody>
                    {Object.entries(selectedCustomer)
                      .filter(([key]) => !['createdByNavigation', 'updatedByNavigation', 'interactions'].includes(key))
                      .map(([key, value]) => (
                        <tr key={key}>
                          <td><strong>{formatKey(key)}:</strong></td>
                          <td>{value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
