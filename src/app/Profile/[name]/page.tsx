'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Card,
  Typography,
  Grid,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Box,
} from '@mui/material';
import { mockStudentData } from '../../../data/students';
import { mockStudentData2 } from '../../../data/fallstudents';
import { WEEKS } from '../../../constants/swimmingConstants';
import { mapWeekToString } from '../../../constants/swimmingConstants';
import { blue } from '@mui/material/colors';
import { PROFILE_ICON, POOL_ICON } from '../../../constants/icons';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const { name } = useParams<{ name: string }>();

  const [profileData1, setProfileData1] = useState(null);
  const [profileData2, setProfileData2] = useState(null);

  useEffect(() => {
    const studentData1 = [...mockStudentData];
    const student = studentData1.find(
      s => s.name.toLowerCase().replace(/\s+/g, '') === name
    );
    setProfileData1(student);

    const studentData2 = [...mockStudentData2];
    const student2 = studentData2.find(
      s => s.name.toLowerCase().replace(/\s+/g, '') === name
    );
    setProfileData2(student2);
  }, [name]);

  if (!profileData1 && !profileData2) return <p>Loading...</p>;



  const renderTimes = times => {
    return (
      <>
        {WEEKS.map(week => {
          const weekData = times[week];

          return (
            <TableRow key={week}>
              <TableCell>{mapWeekToString[week]}</TableCell>
              <TableCell align='right'>
                {weekData ? weekData.freestyle : 'N/A'}
              </TableCell>
              <TableCell align='right'>
                {weekData ? weekData.backstroke : 'N/A'}
              </TableCell>
              <TableCell align='right'>
                {weekData ? weekData.breaststroke : 'N/A'}
              </TableCell>
              <TableCell align='right'>
                {weekData ? weekData.butterfly : 'N/A'}
              </TableCell>
              <TableCell align='right'>
                {weekData ? weekData.IM : 'N/A'}
              </TableCell>
            </TableRow>
          );
        })}
      </>
    );
  };

  const getPersonalBestTimes = (data1, data2) => {
    const strokes = [
      'freestyle',
      'backstroke',
      'breaststroke',
      'butterfly',
      'IM',
    ];

    const bestTimes = {};
    strokes.forEach(stroke => {
      let bestTime = Infinity;

      if (data1) {
        WEEKS.forEach(week => {
          const time = data1.times[week]?.[stroke];
          if (time && time < bestTime) {
            bestTime = time;
          }
        });
      }

      if (data2) {
        WEEKS.forEach(week => {
          const time = data2.times[week]?.[stroke];
          if (time && time < bestTime) {
            bestTime = time;
          }
        });
      }
      if (bestTime === Infinity) {
        bestTimes[stroke] = 'IM needs to be converted';
      } else {
        bestTimes[stroke] = bestTime;
      }
    });

    return bestTimes;
  };

  const personalBestTimes = getPersonalBestTimes(profileData1, profileData2);

  return (
    <div style={{ padding: '30px' }}>
      <button
        onClick={() => router.push('/')}
        style={{
          backgroundColor: 'white',
          color: 'blue',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Back to Main Page
      </button>
      <Card
        sx={{
          padding: 3,
          marginBottom: 5,
          textAlign: 'center',
          backgroundImage: `url(https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?cs=srgb&dl=pexels-jim-de-ramos-395808-1263349.jpg&fm=jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Avatar
          sx={{ width: 100, height: 100, margin: '0 auto' }}
          src={PROFILE_ICON}
        ></Avatar>
        <Typography variant='h4' sx={{ marginTop: 2 }}>
          {profileData1?.name || profileData2?.name}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          {profileData1?.age || profileData2?.age}{' '}
        </Typography>
      </Card>

      <Divider sx={{ marginBottom: 3 }} />

      <Typography
        variant='h5'
        sx={{ marginBottom: 4, textAlign: 'center', color: 'blue' }}
      >
        Swimming Times Overview
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={2} md={6}>
          <Card sx={{ padding: 2 }}>
            <Typography
              variant='h6'
              sx={{ textAlign: 'center', color: 'blue' }}
            >
              Summer 2024
            </Typography>
            <TableContainer component={Paper}>
              <Table size='small' aria-label='swimming times'>
                <TableHead>
                  <TableRow>
                    <TableCell>Week</TableCell>
                    <TableCell align='right'>Freestyle</TableCell>
                    <TableCell align='right'>Backstroke</TableCell>
                    <TableCell align='right'>Breaststroke</TableCell>
                    <TableCell align='right'>Butterfly</TableCell>
                    <TableCell align='right'>IM</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {profileData1 && renderTimes(profileData1.times)}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2 }}>
            <Typography
              variant='h6'
              sx={{ textAlign: 'center', color: 'blue' }}
            >
              Fall 2024
            </Typography>
            <TableContainer component={Paper}>
              <Table size='small' aria-label='swimming times'>
                <TableHead>
                  <TableRow>
                    <TableCell>Week</TableCell>
                    <TableCell align='right'>Freestyle</TableCell>
                    <TableCell align='right'>Backstroke</TableCell>
                    <TableCell align='right'>Breaststroke</TableCell>
                    <TableCell align='right'>Butterfly</TableCell>
                    <TableCell align='right'>IM</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {profileData2 && renderTimes(profileData2.times)}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ marginTop: 5, marginBottom: 3 }} />

      <Typography
        variant='h5'
        sx={{ marginBottom: 4, textAlign: 'center', color: 'blue' }}
      >
        Personal Best Times
      </Typography>

      <Box
        sx={{
          padding: 2,
          textAlign: 'center',
          maxWidth: 300,
          margin: '0 auto',
          border: '2px solid blue',
          borderRadius: '8px',
        }}
      >
        <Card
          sx={{
            padding: 2,
            textAlign: 'center',
            maxWidth: 300,
            margin: '0 auto',
          }}
         
        >
          <Typography variant='h6'>
            Freestyle: {personalBestTimes.freestyle}
          </Typography>
          <Typography variant='h6'>
            Backstroke: {personalBestTimes.backstroke}
          </Typography>
          <Typography variant='h6'>
            Breaststroke: {personalBestTimes.breaststroke}
          </Typography>
          <Typography variant='h6'>
            Butterfly: {personalBestTimes.butterfly}
          </Typography>
          <Typography variant='h6'>IM: {personalBestTimes.IM}</Typography>
        </Card>

      </Box>
  
    </div>
  );
}
