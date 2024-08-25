const AddCustomerDetails = () => {
    return (
      <form className="container my-4">
        <h3 className="mb-4">Add Customer Details</h3>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter customer name"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Company:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter company name"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@company.com"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone:</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter phone number"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Address:</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Enter customer address"
          ></textarea>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
          <button type="submit" className="btn btn-primary mb-2 mb-md-0">
            Add Customer
          </button>
          <button type="reset" className="btn btn-secondary">
            Clear Form
          </button>
        </div>
      </form>
    );
  };
  
  export default AddCustomerDetails;