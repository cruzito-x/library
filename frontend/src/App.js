import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./views/home/Home";
import About from "./views/about/About";
import Dashboard from "./views/dashboard/Dashboard";

const App = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Dashboard/>} />
        <Route path="/sign-out" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
