import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert, Grid } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear errors before submission
    try {
      const res = await axios.post('/api/authentication', { email, password });
      localStorage.setItem('token', res.data.token);

      // Reset form fields after successful login
      setEmail('');
      setPassword('');
      setError('');

      // Navigate to the protected route
      navigate('/protected');
    } catch (err) {
      console.error(err.response);

      // Reset password on error, keep email for convenience
      setPassword('');
      setError(err.response?.data?.message || 'Invalid login credentials');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Typography sx={{ mt: 2 }}>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
