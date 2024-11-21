import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Alert,
  Box,
  Typography,
} from '@mui/material';
import { PERSIAN_BLUE, SPINDLE } from '../../constants/colors';
import { WEEKS, mapWeekToString } from '../../constants/swimmingConstants';
import { createTableData } from '../../utils/createTableData';
import { mockStudentData } from '../../data/students';
import { useRouter } from 'next/navigation';

const styles = {
  WeekButton: {
    marginRight: '8px',
    fontWeight: 'bold',
    fontSize: '12px',
    borderRadius: '12px',
    textTransform: 'none',
  },
  TableContainer: {
    maxWidth: '90%',
    margin: '20px auto',
    borderRadius: '10px',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
  },
  TableHeadCell: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: PERSIAN_BLUE,
    textAlign: 'center',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  TableRow: {
    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
    '&:hover': { backgroundColor: '#e8f4fc' },
  },
  arrowUp: {
    color: 'green',
    fontWeight: 'bold',
  },
  arrowDown: {
    color: 'red',
    fontWeight: 'bold',
  },
};

export default function TableComponent({
  rows,
  currentWeek,
  setCurrentWeek,
  selectedSemester,
}) {
  const [sortRows, setSortRows] = useState(rows);
  const router = useRouter();

  const handleButtonClick = name => {
    const formattedName = name.replace(/\s+/g, '').toLowerCase();
    router.push(`/Profile/${formattedName}`);
  };

  useEffect(() => {
    setSortRows(rows);
  }, [rows]);

  const getPreviousWeek = week => {
    const weekIndex = WEEKS.indexOf(week);
    if (weekIndex <= 0) return null;
    return WEEKS[weekIndex - 1];
  };

  const previousWeek = getPreviousWeek(currentWeek);
  const previousWeekData = previousWeek
    ? createTableData(mockStudentData, previousWeek)
    : [];

  const getArrow = (currentTime, previousTime) => {
    if (previousTime === 'N/A' || currentTime === 'N/A') return '';
    if (isNaN(previousTime) || isNaN(currentTime)) return '';

    if (currentTime < previousTime) {
      return '▲';
    } else if (currentTime > previousTime) {
      return '▼';
    }

    return '';
  };

  const Sort = stroke => {
    const newrows = [...rows];

    newrows.sort((a, b) => {
      if (a[stroke] === 'N/A' && b[stroke] !== 'N/A') {
        return 1;
      }
      if (a[stroke] !== 'N/A' && b[stroke] === 'N/A') {
        return -1;
      }
      if (a[stroke] === 'N/A' && b[stroke] === 'N/A') {
        return 0;
      }

      if (stroke === 'name' || stroke === 'IM') {
        return a[stroke].localeCompare(b[stroke]);
      }

      return a[stroke] - b[stroke];
    });

    setSortRows(newrows);
  };

  return (
    <TableContainer sx={styles.TableContainer} component={Paper}>
      <Box sx={{ padding: '16px', textAlign: 'center' }}>
        <Typography variant='h6' component='div' fontWeight='bold'>
          {selectedSemester} Semester
        </Typography>
        <Box>
          {WEEKS.map(week => (
            <Button
              key={week}
              sx={{
                ...styles.WeekButton,
                backgroundColor: week === currentWeek ? SPINDLE : 'white',
              }}
              onClick={() => setCurrentWeek(week)}
            >
              {mapWeekToString[week]}
            </Button>
          ))}
        </Box>
      </Box>

      {rows.length === 0 ? (
        <Alert
          sx={{
            margin: '20px auto',
            maxWidth: '400px',
            backgroundColor: '#fbe9e7',
          }}
          severity='error'
        >
          No data available. Please select a different week or semester.
        </Alert>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.TableHeadCell} onClick={() => Sort('age')}>
                Age
              </TableCell>
              <TableCell sx={styles.TableHeadCell} onClick={() => Sort('name')}>
                Student
              </TableCell>
              <TableCell
                sx={styles.TableHeadCell}
                onClick={() => Sort('freestyle')}
              >
                50y Freestyle
              </TableCell>
              <TableCell
                sx={styles.TableHeadCell}
                onClick={() => Sort('backstroke')}
              >
                50y Backstroke
              </TableCell>
              <TableCell
                sx={styles.TableHeadCell}
                onClick={() => Sort('breaststroke')}
              >
                50y Breaststroke
              </TableCell>
              <TableCell
                sx={styles.TableHeadCell}
                onClick={() => Sort('butterfly')}
              >
                50y Butterfly
              </TableCell>
              <TableCell sx={styles.TableHeadCell} onClick={() => Sort('IM')}>
                100y IM
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortRows.map(row => {

              const prevData =
                previousWeekData.find(prevRow => prevRow.id === row.id) ||
                {};

            
              const freestyleArrow = getArrow(
                row.freestyle,
                prevData.freestyle
              );
              const backstrokeArrow = getArrow(
                row.backstroke,
                prevData.backstroke
              );
              const breaststrokeArrow = getArrow(
                row.breaststroke,
                prevData.breaststroke
              );
              const butterflyArrow = getArrow(
                row.butterfly,
                prevData.butterfly
              );
              const imArrow = getArrow(row.IM, prevData.IM);

              // Format name for profile link
              const name = row.name.toLowerCase().replace(/\s+/g, '');

              return (
                <TableRow key={row.id} sx={styles.TableRow}>
                  <TableCell align='center'>{row.age}</TableCell>
                  <TableCell
                    align='center'
                    onClick={() => handleButtonClick(name)}
                    style={{ cursor: 'pointer', color: 'blue' }}
                  >
                    {row.name}
                  </TableCell>

                  <TableCell align='center'>
                    {row.freestyle}{' '}
                    <span
                      style={
                        freestyleArrow === '▲'
                          ? styles.arrowUp
                          : freestyleArrow === '▼'
                            ? styles.arrowDown
                            : {}
                      }
                    >
                      {freestyleArrow}
                    </span>
                  </TableCell>

                  <TableCell align='center'>
                    {row.backstroke}{' '}
                    <span
                      style={
                        backstrokeArrow === '▲'
                          ? styles.arrowUp
                          : backstrokeArrow === '▼'
                            ? styles.arrowDown
                            : {}
                      }
                    >
                      {backstrokeArrow}
                    </span>
                  </TableCell>

                  <TableCell align='center'>
                    {row.breaststroke}{' '}
                    <span
                      style={
                        breaststrokeArrow === '▲'
                          ? styles.arrowUp
                          : breaststrokeArrow === '▼'
                            ? styles.arrowDown
                            : {}
                      }
                    >
                      {breaststrokeArrow}
                    </span>
                  </TableCell>

                  <TableCell align='center'>
                    {row.butterfly}{' '}
                    <span
                      style={
                        butterflyArrow === '▲'
                          ? styles.arrowUp
                          : butterflyArrow === '▼'
                            ? styles.arrowDown
                            : {}
                      }
                    >
                      {butterflyArrow}
                    </span>
                  </TableCell>

                  <TableCell align='center'>
                    {row.IM}{' '}
                    <span
                      style={
                        imArrow === '▲'
                          ? styles.arrowUp
                          : imArrow === '▼'
                            ? styles.arrowDown
                            : {}
                      }
                    >
                      {imArrow}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
