'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';

import Divider from '@mui/material/Divider';

import EventSelect from '../../components/Popup/Popup';
import {
  MOODY_BLUE,
  LINK_WATER,
  PERSIAN_BLUE,
  SPINDLE,
} from '../../constants/swimmingConstants';

export default function SwimmingForm() {
  const [age, setAge] = useState<string>('');
  const [event, setEvent] = useState<string>('50 Yard Freestyle');
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');
  const [milliseconds, setMilliseconds] = useState<string>('');
  const [gender, setGender] = useState<string>('men');
  const [ageError, setAgeError] = useState<boolean>(false);
  const [minutesError, setMinutesError] = useState<boolean>(false);
  const [secondsError, setSecondsError] = useState<boolean>(false);
  const [millisecondsError, setMillisecondsError] = useState<boolean>(false);
  const [popup, setPopup] = useState<boolean>(false);

  const handleEventSelect = (selectedEvent: string) => {
    setEvent(selectedEvent);
    setPopup(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const time = `${minutes}:${seconds}.${milliseconds} seconds`;
    const formData = { age, event, time, gender };
    console.log(formData, 'Data submitted');
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
      <Box
        sx={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translate(-50%, 0)',
          textAlign: 'center',
          color: LINK_WATER,
        }}
      >
        <Typography variant='h2'>Swimming Benchmark</Typography>
      </Box>

      <Paper
        sx={{ padding: 3, maxWidth: '500px', margin: 'auto', mt: '100px' }}
      >
        <Card sx={{ padding: 2 }}>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label='Age'
              type='number'
              value={age}
              onChange={e => {
                const value = e.target.value;
                setAge(value);
                validateAge(value);
              }}
              fullWidth
              margin='normal'
              error={ageError}
              helperText={ageError ? 'Please enter a correct age' : ''}
            />

            <Box>
              <InputLabel id='stroke-label' sx={{ mt: 1, color: MOODY_BLUE }}>
                Event
              </InputLabel>
              <Button
                onClick={() => setPopup(true)}
                variant='outlined'
                fullWidth
              >
                {event}
              </Button>

              <EventSelect
                open={popup}
                onClose={() => setPopup(false)}
                onSelect={handleEventSelect}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <TextField
                label='Minutes'
                type='number'
                value={minutes}
                onChange={e => {
                  const value = e.target.value;
                  setMinutes(value);
                  setMinutesError(!validateNumber(value, 60));
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
                helperText={
                  millisecondsError ? 'Please enter correct time' : ''
                }
              />
            </Box>

            <InputLabel id='gender-label' sx={{ color: MOODY_BLUE, mt: 1 }}>
              Gender
            </InputLabel>
            <Select
              labelId='gender-label'
              value={gender}
              onChange={e => setGender(e.target.value)}
              label='Gender'
              fullWidth
            >
              <MenuItem value='men'>Man</MenuItem>
              <MenuItem value='women'>Woman</MenuItem>
            </Select>

            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              sx={{
                mt: 3,
                fontWeight: 800,
                color: PERSIAN_BLUE,
                backgroundColor: SPINDLE,
              }}
            >
              Calculate
            </Button>
          </form>
        </Card>
      </Paper>
    </>
  );
}
