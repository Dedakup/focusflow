import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}