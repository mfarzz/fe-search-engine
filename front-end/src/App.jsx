import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Import pages
import Home from './pages/HomePages.jsx';
import Login from './pages/LoginPages.jsx';
import Dashboard from './pages/DashboardPages.jsx';
import User from './pages/UserPages.jsx';
import Link from './pages/LinkPages.jsx';
import FAQ from './pages/FAQPages.jsx';
import Result from './pages/ResultSearchPages.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on component mount
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Navigate to="/home" replace /> : 
            <Login setIsAuthenticated={setIsAuthenticated} />
          } 
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} roles={["admin", "user"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} roles={["admin"]} >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} roles={["admin", "user"]} >
              <User />
            </ProtectedRoute>
          }
        />

       

        <Route
          path="/link"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} roles={["admin", "user"]}>
              <Link />
            </ProtectedRoute>
          }
        />

        

        <Route
          path="/faq"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} roles={["admin", "user"]}>
              <FAQ />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resultSearch"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} roles={["admin", "user"]}>
              <Result />
            </ProtectedRoute>
          }
        />

        {/* Catch all other routes and redirect to dashboard if authenticated, or login if not */}
        <Route 
          path="*" 
          element={
            isAuthenticated ? 
            <Navigate to="/home" replace /> : 
            <Navigate to="/" replace />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;