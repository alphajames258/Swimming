import React from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { MOODY_BLUE } from '../../../constants/colors';

interface GenderProps {
  gender: string;
  setGender: (value: string) => void;
}

const Gender: React.FC<GenderProps> = ({ gender, setGender }) => (
  <>
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
      <MenuItem value='male'>Male</MenuItem>
      {/* <MenuItem value="female">Female</MenuItem> */}
    </Select>
  </>
);

export default Gender;
