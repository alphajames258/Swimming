'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Checkbox,
  Paper,
  Divider,
} from '@mui/material';
import { mockStudentData2 } from '../../data/fallstudents';

const CheckInPage = () => {
  const [checkInStatus, setCheckInStatus] = useState({});

  useEffect(() => {
    fetch('./api/checkin')
      .then(res => res.json())
      .then(data => setCheckInStatus(data));
  }, []);

  useEffect(() => {
    if (Object.keys(checkInStatus).length > 0) {
      fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkInStatus }),
      })
        .then(res => res.json())
        .then(data => console.log(data.message))
        .catch(err => console.error(err));
    }
  }, [checkInStatus]);

  const handleCheckInChange = (studentId, day, birthday) => {
    const password = prompt('Enter your birthday password (format: MMDDYYYY):');
    if (password !== birthday.replace(/[-\s]/g, '')) {
      alert('Incorrect password!');
      return;
    }

    setCheckInStatus(prevStatus => {
      const newStatus = { ...prevStatus };

      if (!newStatus[studentId]) {
        newStatus[studentId] = { saturday: true, sunday: true };
      }

      newStatus[studentId][day] = false;

      return newStatus;
    });
  };

  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography
        variant='h4'
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1976d2' }}
      >
        Check-In
      </Typography>

      <List sx={{ maxWidth: '600px', margin: '0 auto' }}>
        {mockStudentData2.map(student => (
          <Paper
            key={student.id}
            elevation={3}
            sx={{ margin: '10px 0', padding: '15px' }}
          >
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant='h6'
                sx={{ color: '#333', fontWeight: '500' }}
              >
                {student.name}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    checked={checkInStatus[student.id]?.saturday ?? true}
                    onChange={() =>
                      handleCheckInChange(
                        student.id,
                        'saturday',
                        student.birthday
                      )
                    }
                    color='primary'
                  />
                  <Typography variant='body2' sx={{ fontWeight: '500' }}>
                    Saturday
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    checked={checkInStatus[student.id]?.sunday ?? true}
                    onChange={() =>
                      handleCheckInChange(
                        student.id,
                        'sunday',
                        student.birthday
                      )
                    }
                    color='primary'
                  />
                  <Typography variant='body2' sx={{ fontWeight: '500' }}>
                    Sunday
                  </Typography>
                </Box>
              </Box>
            </ListItem>
            <Divider sx={{ marginTop: '10px' }} />
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default CheckInPage;
