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
import { PROFILE_ICON } from '../../../constants/icons';
import { useRouter } from 'next/navigation';
import { semesterData } from '../../../data/semesters';
import { ProfileData } from '../../../data/semesters';
import { SwimmingTimes } from '../../../data/semesters';
import { PersonalBestTimes } from '../../../data/semesters';

export default function Profile() {
  const router = useRouter();
  const { name } = useParams<{ name: string }>()!;
  const [profileData, setProfileData] = useState<ProfileData[]>([]);

  const [attendedSemesters, setAttendedSemesters] = useState<string[]>([]);


  useEffect(() => {
    const studentRecord = semesterData.find(
      s => s.name.toLowerCase().replace(/\s+/g, '') === name
    );

    if (studentRecord) {
      setAttendedSemesters(studentRecord.attendedSemesters);
      
      const profile : ProfileData[] = studentRecord.attendedSemesters.map(semester => {
        const data =
          semester === '2024Summer'
            ? mockStudentData.find(s => s.name === studentRecord.name)
            : mockStudentData2.find(s => s.name === studentRecord.name);
        return { semester, ...data } as ProfileData ;
      });

      setProfileData(profile);
    }
  }, [name]);

  console.log(profileData, 'data')

  if (profileData.length === 0) return <p>Loading...</p>;

  const renderTimes = times => (
    <>
      {WEEKS.map(week => {
        const weekData = times[week];
        return (
          <TableRow key={week}>
            <TableCell>{mapWeekToString[week]}</TableCell>
            <TableCell align='right'>{weekData?.freestyle || 'N/A'}</TableCell>
            <TableCell align='right'>{weekData?.backstroke || 'N/A'}</TableCell>
            <TableCell align='right'>{weekData?.breaststroke || 'N/A'}</TableCell>
            <TableCell align='right'>{weekData?.butterfly || 'N/A'}</TableCell>
            <TableCell align='right'>{weekData?.IM || 'N/A'}</TableCell>
          </TableRow>
        );
      })}
    </>
  );

  const getPersonalBestTimes = (data: ProfileData[]): PersonalBestTimes => {
    const strokes = ['freestyle', 'backstroke', 'breaststroke', 'butterfly', 'IM'];
    const bestTimes: PersonalBestTimes = {
      freestyle: Infinity,
      backstroke: Infinity,
      breaststroke: Infinity,
      butterfly: Infinity,
      IM: Infinity,
    };
  
    strokes.forEach((stroke) => {
      data.forEach((profile) => {
        WEEKS.forEach((week) => {
          const time = profile.times[week]?.[stroke];
          if (time && time < bestTimes[stroke]) {
            bestTimes[stroke] = time;
          }
        });
      });

      bestTimes[stroke] = bestTimes[stroke] === Infinity ? 'N/A' : bestTimes[stroke];
    });
  
    return bestTimes;
  };
  

  const personalBestTimes = getPersonalBestTimes(profileData);

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
        />
        <Typography variant='h4' sx={{ marginTop: 2 }}>
          {profileData[0]?.name}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          {profileData[0]?.age}
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
        {profileData.map((profile, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ padding: 2 }}>
              <Typography variant='h6' sx={{ textAlign: 'center', color: 'blue' }}>
                {profile.semester}
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
                  <TableBody>{renderTimes(profile.times)}</TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ marginTop: 5, marginBottom: 3 }} />

      <Typography variant='h5' sx={{ marginBottom: 4, textAlign: 'center', color: 'blue' }}>
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
        <Card sx={{ padding: 2, textAlign: 'center', maxWidth: 300, margin: '0 auto' }}>
          <Typography variant='h6'>Freestyle: {personalBestTimes.freestyle}</Typography>
          <Typography variant='h6'>Backstroke: {personalBestTimes.backstroke}</Typography>
          <Typography variant='h6'>Breaststroke: {personalBestTimes.breaststroke}</Typography>
          <Typography variant='h6'>Butterfly: {personalBestTimes.butterfly}</Typography>
          <Typography variant='h6'>IM: {personalBestTimes.IM}</Typography>
        </Card>
      </Box>
    </div>
  );
}
