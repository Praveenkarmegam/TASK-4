import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();


  return (
    <div className="container mt-5">
      <h2 className="text-success">Welcome to your Dashboard!</h2>
      <p>This is a protected route. You're logged in.</p>
      <button className="btn btn-warning me-3" onClick={() => navigate('/forgot-password')}>Reset Password</button>
    </div>
  );
}

export default Home;