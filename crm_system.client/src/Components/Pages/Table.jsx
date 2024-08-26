import React from "react";

const Table = () => {
  return (
    <div>
      <h3>Customer List</h3>
      <div className="table-responsive m-1">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
