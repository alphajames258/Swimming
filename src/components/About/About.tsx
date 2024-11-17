import React from 'react';
import { Typography, Box, Link, Divider } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const About = () => {
  return (
    <Box
      component='footer'
      sx={{
        width: '100%',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '8px',
        color: 'black',
      }}
    >
      <Divider sx={{ marginBottom: '20px' }} />
      <Typography variant='h6' fontWeight='bold' gutterBottom>
        Connect with me
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '10px',
        }}
      >
        <Link
          href='https://www.linkedin.com/in/james-lee-a7b2842b6/'
          sx={{
            'display': 'flex',
            'alignItems': 'center',
            'textDecoration': 'none',
            'color': 'primary.main',
            '&:hover': { textDecoration: 'underline' },
          }}
          rel='noopener'
          target='_blank'
        >
          <LinkedInIcon sx={{ marginRight: '5px' }} />
          LinkedIn
        </Link>
        <Link
          href='https://github.com/alphajames258'
          sx={{
            'display': 'flex',
            'alignItems': 'center',
            'textDecoration': 'none',
            'color': 'primary.main',
            '&:hover': { textDecoration: 'underline' },
          }}
          target='_blank'
          rel='noopener'
        >
          <GitHubIcon sx={{ marginRight: '5px' }} />
          GitHub
        </Link>
      </Box>
    </Box>
  );
};
export default About;
