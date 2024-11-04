'use client';
import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Container,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Calculate, LockClock } from '@mui/icons-material';

const options = [
  {
    label: 'View Times',
    route: '/TablePage',
    description: 'Check swimming times and personal bests',
    icon: <LockClock sx={{ color: '#0073e6' }} />,
  },
  {
    label: 'Calculator',
    route: '/Form',
    description: 'Calculate and compare your swimming performance',
    icon: <Calculate fontSize='large' sx={{ color: '#0073e6' }} />,
  },
  {
    label: 'Check-In',
    route: '/Password',
    description: 'Check-in for swimming practice',
    icon: <LockClock sx={{ color: '#0073e6' }} />,
  },
];

export default function HomePage() {
  const router = useRouter();

  const handleNavigation = route => {
    router.push(route);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

      <Container maxWidth='sm' sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant='h3'
          component='h1'
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1976d2' }}
        >
          Welcome to the Swim Benchmark
        </Typography>
        <Typography
          variant='h6'
          color='textSecondary'
          sx={{ fontStyle: 'italic', fontWeight: 300 }}
        >
          Track your progress, view your times, and compare your results with
          others.
        </Typography>
        <Typography variant='h6' color='textSecondary' sx={{ mt: 2 }}>
          Don’t forget to <strong>check in</strong> for Saturday and Sunday!
        </Typography>
      </Container>

      <Container maxWidth='md'>
        <Grid container spacing={4} justifyContent='center'>
          {options.map(option => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={option.label}
              sx={{ animation: 'fadeIn 0.5s ease-in' }}
            >
              <Card
                sx={{
                  'boxShadow': '0 6px 12px rgba(0, 0, 0, 0.1)',
                  'borderRadius': '12px',
                  'transition': 'transform 0.2s ease-in-out, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                    border: '2px solid #0073e6',
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleNavigation(option.route)}
                  sx={{ height: '100%', padding: '10px' }}
                >
                  <CardContent sx={{ textAlign: 'center', padding: '20px' }}>
                    {option.icon}
                    <Typography
                      variant='h5'
                      sx={{ fontWeight: 'bold', color: '#1976d2', mt: 2 }}
                    >
                      {option.label}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      sx={{ mt: 1 }}
                    >
                      {option.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
