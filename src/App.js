import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import StudentData from "./components/StudentData";
import EditStudent from "./components/EditStudent";
import CreateStudent from "./components/CreateStudent";
import { StudentProvider } from "./context/StudentContext";
import StudentDetail from "./components/StudentDetail";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <StudentProvider>
      <Router>
        <Routes>
        
        
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <AdminLogin login={login} />} />
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <AdminLogin  login={login} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard logout={logout} /> : <Navigate to="/login" />}>
              <Route path="students" element={isAuthenticated ? <StudentData /> : <Navigate to="/login" />} />
              <Route path="students/create" element={isAuthenticated ? <CreateStudent /> : <Navigate to="/login" />} />
              <Route path="students/edit/:id" element={isAuthenticated ? <EditStudent /> : <Navigate to="/login" />} />
              <Route path="students/detail/:id" element={isAuthenticated ? <StudentDetail /> : <Navigate to="/login" />} />
            </Route>
        </Routes>
      </Router>
    </StudentProvider>
  );
};

export default App;
