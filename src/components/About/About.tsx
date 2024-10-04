import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const About = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '20px',
        marginTop: '50px',
        color: 'black',
      }}
    >
      <Typography variant='h6' fontWeight='bold'>
        About This Website
      </Typography>
      <Typography variant='body1' paragraph>
        Hi, My name is James Lee. I created this website for swimmers who are
        passionate about competing and getting faster.
      </Typography>
      <Typography variant='body1' paragraph>
        As a former swimmer, I know how important it is to track your progress
        and understand your benchmarks. This platform is dedicated to helping
        swimmers achieve their goals.
      </Typography>
      <Typography variant='body1' gutterBottom>
        Connect with me:
      </Typography>
      <Link
        href='https://www.linkedin.com/in/james-lee-a7b2842b6/'
        sx={{
          'marginRight': '10px',
          'textDecoration': 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
        rel='noopener'
        target='_blank'
      >
        LinkedIn
      </Link>
      <Link
        href='https://github.com/alphajames258'
        sx={{
          'textDecoration': 'none',
          '&:hover': { textDecoration: 'underline' },
        }}
        target='_blank'
        rel='noopener'
      >
        GitHub
      </Link>
    </Box>
  );
};

export default About;
