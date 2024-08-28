'use client';
import TableComponent from '../../components/Table/Table';
import { createTableData } from '../../utils/createTableData';
import { mockStudentData } from '../../data/students';
import { useEffect, useRef, useState } from 'react';
import { mapWeekToString, WEEKS } from '../../constants/swimmingConstants';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { count } from 'console';

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
    </>
  );
}

{
  /*  */
}
