import React, { useState } from 'react';
import axios from '../axiosConfig'



function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/forgot-password', { email });
      alert('Reset link sent to your email');
    } catch (err) {
      alert('Email not found');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button className="btn btn-primary mt-3" type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
