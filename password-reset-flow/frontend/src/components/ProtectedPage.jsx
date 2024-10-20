import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
    } else {
      axios.get(`/api/data`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(err => {
        localStorage.removeItem('token');
        navigate('/login');
      });
    }
  }, [navigate]);
  
  return (
    <div className="container">
      <h2>Protected Page</h2>
      {message ? <p>{message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default ProtectedPage;
