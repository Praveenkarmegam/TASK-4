import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import UpdatePassword from './components/UpdatePassword';
import ProtectedPage from './components/ProtectedPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); // Update state after logout
    Navigate('/login')
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        {/* If authenticated, redirect to /protected; otherwise, go to login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/protected" /> : <Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/protected" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/update-password/:token" element={<UpdatePassword />} />
        {/* Protected route */}
        <Route path="/protected" element={isAuthenticated ? <ProtectedPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
