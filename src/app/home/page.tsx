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
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Calculate, LockClock } from '@mui/icons-material';
import Image from 'next/image';
import { PERSIAN_BLUE, SPINDLE } from '../../constants/colors';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
    icon: <Calculate sx={{ color: '#0073e6' }} />,
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
        minHeight: '90vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: { xs: 2, md: 6 },
          minHeight: '60vh',
        }}
      >
        <Box sx={{ mb: { xs: 4, md: 0 }, maxWidth: { xs: '100%', md: '50%' } }}>
          <Typography
            variant='h3'
            component='h1'
            gutterBottom
            sx={{ color: '#333', fontWeight: 'bold' }}
          >
            Learn about your competition
          </Typography>
          <Typography variant='h6' sx={{ color: '#555', fontWeight: 300 }}>
            This website is designed to help you progress in your swimming
            journey. As I myself am a former competitive swimmer, I know how
            important it is to benchmark yourself against the best.
          </Typography>
          <Typography variant='h6' sx={{ color: '#555', mt: 2 }}>
            If you are part of my class, feel free to view your times and check
            into class.
          </Typography>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={() => handleNavigation('/Form')}
            sx={{
              'mt': 3,
              'fontSize': '18px',
              'fontWeight': 800,
              'color': PERSIAN_BLUE,
              'backgroundColor': SPINDLE,
              'padding': '9px 15px',
              'borderRadius': '8px',
              'textTransform': 'none',
              'boxShadow': '0 4px 12px rgba(0, 0, 0, 0.1)',
              'transition': 'all 0.3s ease',
              '&:hover': {
                backgroundColor: PERSIAN_BLUE,
                color: SPINDLE,
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                transform: 'translateY(-2px)',
              },
              'display': 'flex',
              'alignItems': 'center',
              'justifyContent': 'center',
            }}
          >
            Benchmark your times against the best
            <ArrowForwardIcon sx={{ ml: 1 }} />
          </Button>
        </Box>
        <Box sx={{ maxWidth: { xs: '100%', md: '50%' }, textAlign: 'center' }}>
          <Image
            height={300}
            width={600}
            alt='competitive swimmer'
            src='https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w1460/f_auto/primary/piultz6nngltq541xmju'
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Box>
      </Box>
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
