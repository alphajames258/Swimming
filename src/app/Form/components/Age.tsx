import React from 'react';
import { TextField } from '@mui/material';

interface AgeFieldProps {
  age: string;
  setAge: (value: string) => void;
  ageError: boolean;
  validateAge: (value: string) => void;
}

const AgeField: React.FC<AgeFieldProps> = ({ age, setAge, ageError, validateAge }) => (
  <TextField
    label="Age"
    type="number"
    value={age}
    onChange={(e) => {
      const value = e.target.value;
      setAge(value);
      validateAge(value);
    }}
    fullWidth
    margin="normal"
    error={ageError}
    helperText={ageError ? 'Please enter a correct age' : ''}
  />
);

export default AgeField;
