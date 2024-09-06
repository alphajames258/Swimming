'use client';
import TableComponent from '../../components/Table/Table';
import { createTableData } from '../../utils/createTableData';
import { mockStudentData } from '../../data/students';
import { useState } from 'react';
import Box from '@mui/material/Box';
import About from '../../components/About/About';

export default function Table() {
  const [currentWeek, setCurrentWeek] = useState('weekOne');
  const tableData = createTableData(mockStudentData, currentWeek);

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '40px',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      ></Box>

      <TableComponent
        rows={tableData}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
      />

      <About/>



    </>
  );
}
