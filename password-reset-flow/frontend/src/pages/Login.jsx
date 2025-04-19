import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      onLogin();
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h3 className="text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control mt-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="form-control mt-3" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="btn btn-success mt-3 w-100" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
