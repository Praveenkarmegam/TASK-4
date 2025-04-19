import React, { useState } from 'react';
import axios from '../axiosConfig';

import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/register', { email, password });
      alert('Registered successfully');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h3 className="text-center">Register</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control mt-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="form-control mt-3" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="btn btn-primary mt-3 w-100" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;