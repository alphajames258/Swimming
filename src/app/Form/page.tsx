'use client';
import React, { useState } from 'react';
import { Button, Card, Paper, Divider, Box, Typography } from '@mui/material';
import AgeField from './components/Age';
import EventSelector from './components/EventSelector';
import Time from './components/Time';
import Gender from './components/Gender';
import { PERSIAN_BLUE, SPINDLE } from '../../constants/colors';
import {
  analyzeSwimmerPerformance,
  convertTimeToSeconds,
} from '../../utils/calculate';
import Analysis from '../../components/Analysis/Analysis';
import { EVENTS } from '../../constants/swimmingConstants';

const styles = {
  Paper: {
    padding: 3,
    width: '70%',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  SubmitButton: {
    mt: 3,
    fontWeight: 800,
    color: PERSIAN_BLUE,
    backgroundColor: SPINDLE,
  },
  analysisContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'stretch',
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
};

export default function SwimmingForm() {
  const [age, setAge] = useState<string>('');
  const [event, setEvent] = useState(EVENTS[0]);
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');
  const [milliseconds, setMilliseconds] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [popup, setPopup] = useState<boolean>(false);

  // Error Validation States
  const [ageError, setAgeError] = useState<boolean>(false);
  const [minutesError, setMinutesError] = useState<boolean>(false);
  const [secondsError, setSecondsError] = useState<boolean>(false);
  const [millisecondsError, setMillisecondsError] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<any>(undefined);

  const handleSubmit = async e => {
    e.preventDefault();
    const time = convertTimeToSeconds(minutes, seconds, milliseconds);
    const formData = { age, event, time, gender };
    const data = await fetch('/api/swimming_v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event }),
    }).then(res => res.json());

    let analysisData: any = [];

    data.forEach(set => {
      const resultData = analyzeSwimmerPerformance(
        formData,
        set.data,
        0.75,
        0.5,
        set.event
      );
      analysisData = [...analysisData, resultData];
    });

    setAnalysis(analysisData);
  };

  const validateNumber = (value: string, max: number) => {
    const num = Number(value);
    return num >= 0 && num < max;
  };

  // const validateAge = (value: string) => {
  //   const valueNumber = Number(value);
  //   if (valueNumber > 60 || valueNumber <= 0 || isNaN(valueNumber)) {
  //     setAgeError(true);
  //   } else {
  //     setAgeError(false);
  //   }
  // };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          margin: '40px auto',
          maxWidth: '1300px',
        }}
      >
        <Paper sx={styles.Paper}>
          <Card
            sx={{ padding: 1, boxShadow: 'none', backgroundColor: '#f9f9f9' }}
          >
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              {/* <AgeField
              age={age}
              setAge={setAge}
              ageError={ageError}
              validateAge={validateAge}
            /> */}

              <EventSelector
                event={event}
                setEvent={setEvent}
                popup={popup}
                setPopup={setPopup}
              />

              <Divider sx={{ my: 2 }} />

              <Time
                minutes={minutes}
                setMinutes={setMinutes}
                minutesError={minutesError}
                seconds={seconds}
                setSeconds={setSeconds}
                setSecondsError={setSecondsError}
                secondsError={secondsError}
                milliseconds={milliseconds}
                setMilliseconds={setMilliseconds}
                setMinutesError={setMinutesError}
                millisecondsError={millisecondsError}
                setMillisecondsError={setMillisecondsError}
                validateNumber={validateNumber}
              />

              <Gender gender={gender} setGender={setGender} />

              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={styles.SubmitButton}
              >
                Calculate
              </Button>
            </form>
          </Card>
        </Paper>
        <Box
          sx={{
            width: '50%',
            marginLeft: '10px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 'auto', // Adjust the height as needed
          }}
        >
          <Typography variant='h6' color='textPrimary' gutterBottom>
            Measure Your Performance
          </Typography>
          <Typography variant='body1' color='textSecondary' paragraph>
            The competitive swimming calculator is a tool designed for swimmers
            who want to compare their performance to other swimmers across the
            country.
          </Typography>
          <Typography variant='body1' color='textSecondary' paragraph>
            By entering your swim time and selecting your event, you can see how
            you rank among high school and middle school swimmers registered on
            SwimCloud.
          </Typography>
          <Typography variant='body1' color='textSecondary' paragraph>
            The calculator currently uses data from the 2023-2024 season and
            will be updated with more data sets over time to provide more
            comprehensive comparisons.
          </Typography>
        </Box>
      </Box>
      {analysis && <Analysis key='hi' analysis={analysis} event={event} />}
    </Box>
  );
}
