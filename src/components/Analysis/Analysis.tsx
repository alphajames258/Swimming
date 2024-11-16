'use client';

import { Box, Divider, Rating, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GOLD, SPINDLE } from '../../constants/colors';
import Competition from './Competition';
import {
  NYC_HIGHSCHOOL,
  US_MIDDLESCHOOL,
} from '../../constants/swimmingConstants';
import { PerformanceRating } from './Ranking';

const styles = {
  mainContainer: {
    border: '2px solid black',
    padding: '20px',
    borderRadius: '20px',
    width: '80%',
    margin: 'auto',
    background: SPINDLE,
    marginTop: '20px',
  },
  leftAnalysisText: {
    margin: '10px 0',
    color: 'black',
    display: 'inline-block',
  },
  analysisText: {
    margin: '10px 0',
    color: 'black',
    padding: '10px',
  },
  analysisContainer: {},
};

function determineClassification(classification) {
  if (NYC_HIGHSCHOOL.includes(classification)) {
    return {
      classification: 'highschool',
      location: 'New York',
    };
  } else if (US_MIDDLESCHOOL.includes(classification)) {
    return {
      classification: 'middleschool',
      location: 'US',
    };
  }
}

const Analysis = ({ analysis, event }) => {
  const isSmallScreen = useMediaQuery('(max-width:700px)');
  return (
    <Box sx={styles.mainContainer}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography color={'black'} variant='h5' gutterBottom>
          <strong>{event.name}</strong>
        </Typography>
        <Typography color={'black'} variant='h5' gutterBottom>
          <strong>Time: {analysis[0].time}s </strong>
        </Typography>
      </Box>
      <Box key={'hi'} sx={styles.analysisContainer}>
        <Box sx={{ height: '100%', padding: '5px' }}>
          <Divider />
          <Box>
            {analysis.map(item => {
              const classification = determineClassification(
                item.classification
              );
              return (
                <>
                  <Box
                    key='placeholder'
                    sx={{
                      width: '100%',
                      display: isSmallScreen ? 'block' : 'flex',
                    }}
                  >
                    <PerformanceRating
                      isSmallScreen={isSmallScreen}
                      item={item}
                      classification={classification}
                    />
                    <Competition
                      isSmallScreen={isSmallScreen}
                      analysis={item}
                    />
                  </Box>
                  <Divider />
                </>
              );
            })}
          </Box>
          <Typography
            sx={{
              display: 'absolute',
              fontSize: '10px',
              bottom: 0,
              color: 'black',
            }}
          >
            <span>
              Data is sourced from <strong>swimcloud</strong>
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Analysis;
