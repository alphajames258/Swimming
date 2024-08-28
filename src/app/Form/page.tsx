'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import {
  MOODY_BLUE,
  LINK_WATER,
  PERSIAN_BLUE,
  SPINDLE,
} from '../../constants/swimmingConstants';
import EventSelect from '../../components/Popup/Popup';

export default function SwimmingForm() {
  const [age, setAge] = useState<any>('');
  const [stroke, setStroke] = useState<string>('50 Yard Freestlye');
  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');
  const [milliseconds, setMilliseconds] = useState<string>('');
  const [gender, setGender] = useState<string>('men');
  const [ageError, setAgeError] = useState<boolean>(false);
  const [minutesError, setMinutesError] = useState<boolean>(false);
  const [secondsError, setSecondsError] = useState<boolean>(false);
  const [millisecondsError, setMillisecondsError] = useState<boolean>(false);
  const [Popup, setPopup] = useState<boolean>(false);

  const handleStrokeSelect = (selectedStroke: string) => {
    setStroke(selectedStroke);
    setPopup(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

   

 
    const time = `${minutes}:${seconds}.${milliseconds} seconds`;
    const formData = { age, stroke, time, gender };
    console.log('Form Data Submitted: ', formData);
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
        <h2>Swimming Benchmark</h2>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

          maxWidth: '500px',
          mx: 'auto',
          p: 2,
          backgroundColor: LINK_WATER,
          borderRadius: '8px',
          mt: '75px',
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => {
              const value = e.target.value;
              setAge(value);
              if (value > 60) {
                setAgeError(true);
              } else if (value < 0) {
                setAgeError(true);
              } else {
                setAgeError(false);
              }
            }}
            fullWidth
            // sx={{
            //   mb: 2,
            //   backgroundColor: SPINDLE,
            // }}
            margin="normal"
            error={ageError}
            helperText={ageError ? 'Please put correct Age' : ''}
          />

          {/* <InputLabel id="stroke-label" sx={{ mt: 1, color: MOODY_BLUE }}>Stroke</InputLabel>
          <Select
            value={stroke}
            onChange={(e) => setStroke(e.target.value)}
            label="Stroke"
            fullWidth
            sx={{
                mb: 2,
                backgroundColor: SPINDLE, 
              }}
           
          >
            <MenuItem value="50 Free">50 Free</MenuItem>
            <MenuItem value="50 Back">50 Back</MenuItem>
            <MenuItem value="50 Breast">50 Breast</MenuItem>
            <MenuItem value="50 Fly">50 Fly</MenuItem>
          </Select> */}
          <Box>
            <InputLabel id="stroke-label" sx={{ mt: 1, color: MOODY_BLUE }}>
              Event
            </InputLabel>
            <Button
              onClick={() => setPopup(true)}
              variant="outlined"
              fullWidth
              //   sx={{
              //     mb: 2,
              //     backgroundColor: SPINDLE,
              //   }}
            >
              {stroke}
            </Button>

            <EventSelect
              open={Popup}
              onClose={() => setPopup(false)}
              onSelect={handleStrokeSelect}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <TextField
              label="Minutes"
              type="number"
              value={minutes}
              
              onChange={(e) => {
                const value = e.target.value;
                setMinutes(value);
                if (value >= 60) {
                  setMinutesError(true);
                } else if (value < 0) {
                    setMinutesError(true);
                } else {
                    setMinutesError(false);
                }
              }}
              fullWidth
              error={ minutesError}
              helperText={minutesError ? 'Please enter Correct time' : ''}
            />
            <TextField
              label="Seconds"
              type="number"
              value={seconds}
              
              onChange={(e) => {
                const value = e.target.value;
                setSeconds(value);
                if (value >= 60) {
                  setSecondsError(true);
                } else if (value < 0) {
                  setSecondsError(true);
                } else {
                  setSecondsError(false);
                }
              }}
              fullWidth
              error={secondsError}
              helperText={secondsError ? 'Please enter Correct time' : ''}
            />
            <TextField
              label="Milliseconds"
              type="number"
              value={milliseconds}
              onChange={(e) => {
                const value = e.target.value;
                setMilliseconds(value);
                if (!/^\d{1,2}$/.test(value)) {
                    setMillisecondsError(true);
                } else {
                    setMillisecondsError(false)
                } 
              }}
              fullWidth
              error={millisecondsError}
              helperText={millisecondsError ? 'Please enter Correct time' : ''}

            />
          </Box>

          <InputLabel id="gender-label" sx={{ color: MOODY_BLUE, mt: 1 }}>
            Gender
          </InputLabel>
          <Select
            labelId="gender-label"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            label="Gender"
            fullWidth
            // sx={{
            //   mb: 2,
            //   backgroundColor: SPINDLE,
            // }}
          >
            <MenuItem value="men">Man</MenuItem>
            <MenuItem value="women">Woman</MenuItem>
          </Select>

          <Button
            type="submit"
            variant="contained"
            color="primary"
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
      </Box>
    </>
  );
}
