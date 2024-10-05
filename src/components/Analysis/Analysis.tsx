'use client';

import { Box, Divider, Rating } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GOLD, SPINDLE } from '../../constants/colors';
import Competition from './Competition';

const styles = {
  mainContainer: {
    border: '2px solid black',
    padding: '20px',
    borderRadius: '20px',
    width: '55%',
    margin: 'auto',
    background: SPINDLE,
    marginTop: '20px',
  },
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

const Analysis = ({ analysis }) => {
  return (
    <Box sx={styles.mainContainer}>
      <Typography color={'black'} variant='h5' gutterBottom>
        <strong>50Y Freestyle</strong>
      </Typography>

      <Divider />

      <Box sx={styles.analysisContainer}>
        <Box sx={{ height: '100%', padding: '5px', width: '50%' }}>
          <Typography variant='h6' sx={styles.leftAnalysisText}>
            <strong>Time: {analysis.time}s</strong>
          </Typography>

          <Typography sx={styles.leftAnalysisText}>
            You are faster than{' '}
            <strong style={{ fontSize: '20px' }}>
              {(100 - analysis?.percentile).toFixed(2)}%
            </strong>{' '}
            of <strong>highschool</strong> swimmers in the US
          </Typography>
          <Rating
            sx={{ color: GOLD }}
            size='large'
            name='read-only'
            value={((100 - analysis?.percentile) / 100) * 5}
            readOnly
          />
        </Box>
        <Competition analysis={analysis} />
      </Box>
    </Box>
  );
};

export default Analysis;
