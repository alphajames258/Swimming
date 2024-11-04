'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const router = useRouter();
  const correctPassword = 'swimming'; 

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      router.push('/Checkin'); 
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5' 
      }}
    >
      <Paper elevation={3} sx={{ padding: '30px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/427/427463.png" 
            alt="Logo" 
            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
          />
        </Box>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Enter Password to Access Check-In
        </Typography>
        
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
        />

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handlePasswordSubmit} 
          fullWidth 
          sx={{ mt: 3, fontWeight: 'bold', padding: '10px' }}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
};

export default PasswordPage;
