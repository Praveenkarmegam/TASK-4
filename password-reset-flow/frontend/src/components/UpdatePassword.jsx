import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePassword = () => {
  const { token } = useParams(); // Extract the token from URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send POST request to backend to update the password
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reset-password/${token}`, { password });
      setMessage(res.data.message); // Show success message
      setError('');
    } catch (err) {
      setError('Error resetting password. Please try again.'); // Show error message
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h2>Update Password</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="New Password" 
            required 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm New Password" 
            required 
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
