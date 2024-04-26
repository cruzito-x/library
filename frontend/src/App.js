import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Home from "./views/home/Home";
import About from "./views/about/About";

const App = () => {
  return (
    // <Router>
      <Sidebar />
      /* <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router> */
  );
};

export default App;
