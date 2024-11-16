import React from 'react';
import { Typography, Rating, Box } from '@mui/material';
import { GOLD, SPINDLE } from '../../constants/colors';

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

export const PerformanceRating = ({ item, classification, isSmallScreen }) => {
  return (
    <Box sx={{ width: isSmallScreen ? '100%' : '55%' }}>
      <Typography sx={styles.leftAnalysisText}>
        You are faster than{' '}
        <strong style={{ fontSize: '20px' }}>
          {(100 - item?.percentile).toFixed(2)}%
        </strong>{' '}
        of <strong>{classification?.classification.toUpperCase()}</strong>{' '}
        swimmers in the {classification?.location}
      </Typography>
      <Rating
        sx={{ color: GOLD }}
        size='large'
        name='read-only'
        value={((100 - item?.percentile) / 100) * 5}
        readOnly
      />
    </Box>
  );
};
