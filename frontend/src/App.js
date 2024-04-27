import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Login from './views/login/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Sidebar />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
