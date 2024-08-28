'use client';

import { Box, Divider } from '@mui/material';
import { analyzeSwimmerPerformance } from '../../utils/calculate';
import { useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import {
  LINK_WATER,
  MOODY_BLUE,
  PERSIAN_BLUE,
  SPINDLE,
} from '../../constants/colors';

const styles = {
  leftAnalysisText: {
    paddingLeft: '10px',
    margin: '10px 0',
    color: 'black',
    padding: '10px',
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
    // background: LINK_WATER,
    // // border: `2px solid ${PERSIAN_BLUE}`,
    // borderRadius: '20px',
  },
};

const Calculator = () => {
  const [analysis, setAnalysis] = useState<Record<string, any> | null>(null);
  const formData = {
    stroke: 'freestyle',
    time: '22.93',
    distance: '50Y',
  };

  async function analyze(formData) {
    const data = await fetch('/api/swimming_v1').then(res => res.json());
    const swimmers = data.data;
    const analysisData = analyzeSwimmerPerformance(
      formData,
      swimmers,
      0.9,
      0.75
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
            width: '50%',
            margin: 'auto',
            background: SPINDLE,
          }}
        >
          <Typography color={'black'} variant='h5' gutterBottom>
            50Y Freestyle
          </Typography>

          <Divider sx={{ margin: '10px 0' }} />

          <Box sx={styles.analysisContainer}>
            <Box sx={{ height: '100%' }}>
              <Typography sx={styles.leftAnalysisText}>
                Across the US, you are in the {analysis.percentile} percentile
                in 50 Free while swimming a {formData.time}
              </Typography>
            </Box>
            <Box>
              <Typography sx={styles.analysisText}>
                The swimmer ranked 10% ahead of you is{' '}
                {analysis.slightlyBetterSwimmer.name} who swims a{' '}
                {analysis.slightlyBetterSwimmer.time}
              </Typography>
              <Typography sx={styles.analysisText}>
                The swimmer ranked 25% ahead of you is{' '}
                {analysis.betterSwimmer.name} who swims a{' '}
                {analysis.betterSwimmer.time}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Calculator;
