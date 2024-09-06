"use client"
import React, { useState } from 'react';
import { Button, Card, Paper, Divider } from '@mui/material';
import AgeField from './components/Age';
import EventSelector from './components/EventSelector';
import Time from './components/Time';
import Gender from './components/Gender';
import { PERSIAN_BLUE, SPINDLE } from '../../constants/colors';

const styles = {
  Paper: { padding: 3, maxWidth: '500px', margin: 'auto', mt: '100px' },
  SubmitButton: {
    mt: 3,
    fontWeight: 800,
    color: PERSIAN_BLUE,
    backgroundColor: SPINDLE,
  },
};

export default function SwimmingForm() {
  const [age, setAge] = useState<string>('');
  const [event, setEvent] = useState<string>('50 Yard Freestyle');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const time = `${minutes}:${seconds}.${milliseconds} seconds`;
    const formData = { age, event, time, gender };
    console.log(formData, 'data')
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
    <Paper sx={styles.Paper}>
      <Card sx={{ padding: 2 }}>
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

          <Gender
            gender={gender}
            setGender={setGender}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={styles.SubmitButton}
          >
            Calculate
          </Button>
        </form>
      </Card>
    </Paper>
  );
}
