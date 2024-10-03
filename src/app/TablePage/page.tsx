'use client';
import TableComponent from '../../components/Table/Table';
import { createTableData } from '../../utils/createTableData';
import { mockStudentData } from '../../data/students';
import { mockStudentData2 } from '../../data/fallstudents';
import { useState } from 'react';
import Box from '@mui/material/Box';
import About from '../../components/About/About';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';


export default function Table() {
  const [currentWeek, setCurrentWeek] = useState('weekOne');
  const [selectedSemester, setSelectedSemester] = useState('Fall 2024');

  const studentData = selectedSemester === "Fall 2024" ? mockStudentData2 : mockStudentData
  const tableData = createTableData(studentData, currentWeek);


  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
        
      >
         <FormControl fullWidth>
          <InputLabel id="semester-select-label">Select Semester</InputLabel>
          <Select

            id="semester-select"
            value={selectedSemester}
            label="Select Semester"
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <MenuItem value="Fall 2024">Fall 2024</MenuItem>
            <MenuItem value="Summer 2024">Summer 2024</MenuItem>
          </Select>
        </FormControl>

      </Box>

      <TableComponent
        rows={tableData}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
        selectedSemester={selectedSemester}
      />

      <About/>



    </>
  );
}
