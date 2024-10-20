import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reset-password`, { email });
      const res = await axios.post(`https://task-4-w3ml.onrender.com/api/reset-password`, { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error sending reset email');
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
        <button type="submit" className="btn btn-primary">Send Reset Email</button>
      </form>
    </div>
  );
};

export default ResetPassword;
