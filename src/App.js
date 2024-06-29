import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/Log';
import './App.css';
import Debit from './Component/Debit/Debit';
import Credit from './Component/Credit/Credit';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/debit" element={<Debit />} />
          <Route path="/credit" element={<Credit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
