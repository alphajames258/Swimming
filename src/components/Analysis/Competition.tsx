import { Box, Link, Typography } from '@mui/material';

const styles = {
  leftAnalysisText: {
    margin: '10px 0',
    color: 'black',
  },
  analysisText: {
    margin: '10px 0',
    color: 'black',
    padding: '10px',
  },
  analysisContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'stretch',
  },
};

const Competition = ({ analysis }) => {
  return (
    <Box sx={{ color: 'black', width: '50%', padding: '5px' }}>
      <Typography variant='h6' sx={styles.leftAnalysisText}>
        <strong>Check out the competition</strong>
      </Typography>
      <Typography variant='body1'>
        <Link
          style={{ fontSize: '20px' }}
          target='_blank'
          href={analysis.slightlyBetterSwimmer.profileLink}
        >
          {analysis.slightlyBetterSwimmer.name}
        </Link>{' '}
        is slighly faster than you at{' '}
        <strong style={{ fontSize: '20px' }}>
          {analysis.slightlyBetterSwimmer.time}s
        </strong>
      </Typography>

      <Typography variant='body1'>
        <Link
          style={{ fontSize: '20px' }}
          target='_blank'
          href={analysis.betterSwimmer.profileLink}
        >
          {analysis.betterSwimmer.name}
        </Link>{' '}
        is faster than you at{' '}
        <strong style={{ fontSize: '20px' }}>
          {analysis.betterSwimmer.time}s
        </strong>
      </Typography>
    </Box>
  );
};

export default Competition;
