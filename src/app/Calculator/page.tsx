'use client';

import { Box, Card, CardContent, Divider, Link, Rating } from '@mui/material';
import { analyzeSwimmerPerformance } from '../../utils/calculate';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  GOLD,
  LINK_WATER,
  MOODY_BLUE,
  PERSIAN_BLUE,
  SPINDLE,
} from '../../constants/colors';
import Competition from './Competition';

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

const Calculator = () => {
  const [analysis, setAnalysis] = useState<Record<string, any> | null>(null);
  const formData = {
    stroke: 'freestyle',
    time: '24.10',
    distance: '50Y',
  };
  console.log(analysis, 'anthony analysis');

  async function analyze(formData) {
    const data = await fetch('/api/swimming_v1').then(res => res.json());
    const swimmers = data.data;
    const analysisData = analyzeSwimmerPerformance(
      formData,
      swimmers,
      0.75,
      0.5
    );

    setAnalysis(analysisData);
  }

  return (
    <div>
      <button
        onClick={() => {
          analyze(formData);
        }}
      >
        Analyze
      </button>
      {analysis && (
        <Box
          sx={{
            border: '2px solid black',
            padding: '20px',
            borderRadius: '20px',
            width: '55%',
            margin: 'auto',
            background: SPINDLE,
          }}
        >
          <Typography color={'black'} variant='h5' gutterBottom>
            <strong>50Y Freestyle</strong>
          </Typography>

          <Divider />

          <Box sx={styles.analysisContainer}>
            <Box sx={{ height: '100%', padding: '5px', width: '50%' }}>
              <Typography variant='h6' sx={styles.leftAnalysisText}>
                <strong>Time: {formData.time}s</strong>
              </Typography>

              <Typography sx={styles.leftAnalysisText}>
                You are faster than{' '}
                <strong style={{ fontSize: '20px' }}>
                  {(100 - analysis.percentile).toFixed(2)}%
                </strong>{' '}
                of <strong>highschool</strong> swimmers in the US
              </Typography>
              <Rating
                sx={{ color: GOLD }}
                size='large'
                name='read-only'
                value={((100 - analysis.percentile) / 100) * 5}
                readOnly
              />
            </Box>
            <Competition analysis={analysis} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Calculator;
