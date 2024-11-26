import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {

  // Disable the spinner
  NProgress.configure({ showSpinner: false });

  return (
    <ErrorBoundary>
      <ToastContainer
        position="top-right" // Position of the toast
        autoClose={5000} // Auto-dismiss duration in ms
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
