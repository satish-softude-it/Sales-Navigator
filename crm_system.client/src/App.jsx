import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
import "./App.css";
// import axios from "axios";
// import DataGrid, {
//   Column,
//   Paging,
//   FilterRow,
//   HeaderFilter,
//   Editing,
//   Popup,
//   Form,
// } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.light.css";
import SignUp from "./Components/Features/SignUp";
import SignIn from "./Components/Features/SignIn";
import ForgotPassword from "./Components/Features/ForgotPassword";
import DashBoard from "./Components/Pages/DashBoard";
import Navbar from "./Components/Pages/NavBar";
import HomePage from "./Components/Pages/HomePage";
// import { Route } from "devextreme-react/cjs/map";
// import SignUp from "./Components/SignUp/SignUp";
// import SignIn from "./Components/SignIn/SignIn";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />

          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/navbar" element={<Navbar/>} />
        </Routes>
      </Router>
    </>
  );

  // const [forecasts, setForecasts] = useState([]);

  // useEffect(() => {
  //     populateWeatherData();
  // }, []);

  // // Function to handle data insertion
  // const onRowInserting = async (e) => {
  //     try {
  //         // Construct the payload based on the expected DTO
  //         const userRegistrationDto = {
  //             Name: e.data.name,
  //             Email: e.data.email,
  //             Password: e.data.password, // Ensure you handle passwords securely
  //             Role: e.data.role
  //         };

  //         // Call the register API
  //         await axios.post('https://localhost:7192/api/register', userRegistrationDto);

  //         // Refresh data
  //         populateWeatherData();
  //     } catch (error) {
  //         console.error("Error inserting data:", error);
  //         e.cancel = true; // Cancel the insertion if there's an error
  //     }
  // };

  // async function populateWeatherData() {
  //     try {
  //         const response = await axios.get('https://localhost:7192/api/Users');
  //         const data = response.data;
  //         setForecasts(data);
  //     } catch (error) {
  //         console.error("Error fetching data:", error);
  //     }
  // }

  // return (
  //     <div>
  //         <h1 id="tableLabel">Customer Data</h1>
  //         <p>This component demonstrates fetching data from the server and adding new records using a DataGrid.</p>
  //         <DataGrid
  //             dataSource={forecasts}
  //             keyField="customerId"
  //             onRowInserting={onRowInserting}
  //             showBorders={true}
  //         >
  //             <Column dataField="customerId" caption="Customer ID" />
  //             <Column dataField="name" caption="Name" />
  //             <Column dataField="email" caption="Email" />
  //             <Column dataField="role" caption="Role" />
  //             <Column dataField="createdAt" caption="Created At" dataType="date" />

  //             {/* Add FilterRow to enable row-based filtering */}
  //             <FilterRow visible={true} />

  //             {/* Add HeaderFilter to enable column-based filtering */}
  //             <HeaderFilter visible={true} />

  //             {/* Enable Paging */}
  //             <Paging defaultPageSize={10} />

  //             {/* Enable Editing */}
  //             <Editing
  //                 mode="popup"
  //                 allowUpdating={true}
  //                 allowDeleting={true}
  //                 allowAdding={true}
  //             >
  //                 <Popup title="Customer Info" showTitle={true} width={700} height={525} />
  //                 <Form />
  //             </Editing>
  //         </DataGrid>
  //     </div>
  // );
}

export default App;



