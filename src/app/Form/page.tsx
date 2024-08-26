'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SwimmingForm() {
  const [age, setAge] = useState('');
  const [stroke, setStroke] = useState('');
  const [time, setTime] = useState('');
  const [gender, setGender] = useState('men');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { age, stroke, time, gender };
    console.log('Form Data Submitted: ', formData);
    // Handle form submission logic here
  };

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <h2>Swimming Calculator</h2>
        <Button variant="contained">Hello</Button>
      </Box>
    </>
  );
}
