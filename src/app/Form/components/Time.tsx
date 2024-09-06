import React from 'react';
import { Box, TextField } from '@mui/material';

interface TimeProps {
  minutes: string;
  setMinutes: (value: string) => void;
  minutesError: boolean;
  setMinutesError: (value: boolean) => void;
  seconds: string;
  setSeconds: (value: string) => void;
  setSecondsError: (value: boolean) => void;
  secondsError: boolean;
  milliseconds: string;
  setMilliseconds: (value: string) => void;
  millisecondsError: boolean;
  setMillisecondsError: (value: boolean) => void;
  validateNumber: (value: string, max: number) => boolean;
}

const Time: React.FC<TimeProps> = ({
  minutes,
  setMinutes,
  minutesError,
  setMinutesError,
  seconds,
  setSeconds,
  setSecondsError,
  secondsError,
  milliseconds,
  setMilliseconds,
  millisecondsError,
  setMillisecondsError,
  validateNumber,
}) => (
  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
    <TextField
      label='Minutes'
      type='number'
      value={minutes}
      onChange={e => {
        const value = e.target.value;
        setMinutes(value);
        setMinutesError(!validateNumber(value, 60))
      }}
      fullWidth
      error={minutesError}
      helperText={minutesError ? 'Please enter correct time' : ''}
    />
    <TextField
      label='Seconds'
      type='number'
      value={seconds}
      onChange={e => {
        const value = e.target.value;
        setSeconds(value);
        setSecondsError(!validateNumber(value, 60));
        
      }}
      fullWidth
      error={secondsError}
      helperText={secondsError ? 'Please enter correct time' : ''}
    />
    <TextField
      label='Milliseconds'
      type='number'
      value={milliseconds}
      onChange={e => {
        const value = e.target.value;
        setMilliseconds(value);
        if (!/^\d{1,2}$/.test(value)) {
          setMillisecondsError(true);
        } else {
          setMillisecondsError(false);
        }
      }}
      fullWidth
      error={millisecondsError}
      helperText={millisecondsError ? 'Please enter correct time' : ''}
    />
  </Box>
);

export default Time;
