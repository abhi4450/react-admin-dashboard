// // src/components/Dashboard.js
// import React from 'react';
// import NavBarComponent from './Navbar';
// import Sidebar from './SideBar';
// import './Dashboard.css';

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container">
//       <Sidebar />
//       <div className="main-content">
//         <NavBarComponent />
//         <div className="container mt-3">
//           <h1>Admin Dashboard</h1>
//           <p>Main content area is blank for now.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// src/components/Dashboard.js
import React from "react";
import { Outlet } from "react-router-dom";
import NavBarComponent from "./Navbar";
import Sidebar from "./SideBar";
import "./Dashboard.css";

const Dashboard = (props) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <NavBarComponent logout={props.logout} />
        <div className="container mt-3">
          <Outlet /> {/* Render nested routes here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
