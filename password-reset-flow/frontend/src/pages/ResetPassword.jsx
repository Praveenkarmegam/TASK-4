import React, { useState } from 'react';
import axios from '../axiosConfig'

import { useParams } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/reset-password', { token, password });
      alert('Password reset successful');
    } catch (err) {
      alert('Invalid or expired token');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control" type="password" placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="btn btn-success mt-3" type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;