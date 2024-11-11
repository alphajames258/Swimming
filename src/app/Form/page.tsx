'use client';
import React, { useState } from 'react';
import { Button, Card, Paper, Divider } from '@mui/material';
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
  Paper: { padding: 3, maxWidth: '500px', margin: 'auto', mt: '40px' },
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
        0.5
      );
      analysisData = [...analysisData, resultData];
    });

    console.log(analysisData, 'anthony analysis data');

    setAnalysis(analysisData);
  };

  const validateNumber = (value: string, max: number) => {
    const num = Number(value);
    return num >= 0 && num < max;
  };

  const validateAge = (value: string) => {
    const valueNumber = Number(value);
    if (valueNumber > 60 || valueNumber <= 0 || isNaN(valueNumber)) {
      setAgeError(true);
    } else {
      setAgeError(false);
    }
  };

  return (
    <>
      <Paper sx={styles.Paper}>
        <Card sx={{ padding: 2, boxShadow: 'none' }}>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <AgeField
              age={age}
              setAge={setAge}
              ageError={ageError}
              validateAge={validateAge}
            />

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
      {analysis && analysis.map(el => <Analysis key='hi' analysis={el} />)}
    </>
  );
}
