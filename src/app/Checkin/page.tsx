'use client';
import React, { useState } from 'react';
import { Box, Typography, List, ListItem, Checkbox, Paper, Divider } from '@mui/material';
import { mockStudentData2 } from '../../data/fallstudents';

const CheckInPage = () => {
  const [checkInStatus, setCheckInStatus] = useState({});

 
  const handleCheckInChange = (studentId, day) => {
    setCheckInStatus((prevStatus) => {

      const newStatus = { ...prevStatus };

      if (!newStatus[studentId]) {
        newStatus[studentId] = {};
      }
  

      newStatus[studentId][day] = !newStatus[studentId][day];
  
     
      return newStatus;
    });
  };
  

  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Check-In
      </Typography>

      <List sx={{ maxWidth: '600px', margin: '0 auto' }}>
        {mockStudentData2.map((student) => (
          <Paper key={student.id} elevation={3} sx={{ margin: '10px 0', padding: '15px' }}>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: '500' }}>
                {student.name}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    onChange={() => handleCheckInChange(student.id, 'saturday')}
                    color="primary"
                  />
                  <Typography variant="body2" sx={{ fontWeight: '500' }}>Saturday</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox

                    onChange={() => handleCheckInChange(student.id, 'sunday')}
                    color="primary"
                  />
                  <Typography variant="body2" sx={{ fontWeight: '500' }}>Sunday</Typography>
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
