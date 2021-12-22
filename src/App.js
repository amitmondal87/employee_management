import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Routes,
    Link
  } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css'

import Registration from './pages/registration/Registration';
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
function App() {
  return (
    <React.Fragment>
    <Routes>
        <Route  path="/" element={<Login />} />
        <Route  path="/register" element={<Registration />} />
        <Route  path="/dashboard" element={<Dashboard />} />
    </Routes>
    </React.Fragment>
  );
}

export default App;
