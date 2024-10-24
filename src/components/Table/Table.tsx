import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PERSIAN_BLUE, SPINDLE } from '../../constants/colors';
import Button from '@mui/material/Button';
import { Alert, Box } from '@mui/material';
import { WEEKS, mapWeekToString } from '../../constants/swimmingConstants';
import { createTableData } from '../../utils/createTableData';
import { mockStudentData } from '../../data/students';
import { useRouter } from 'next/navigation';

const styles = {
  WeekButton: {
    marginBottom: '0px',
    marginRight: '5px',
    fontWeight: 800,
    padding: '5px 10px', // Adjust padding to make the buttons smaller
    fontSize: '12px', // Adjust font size to make the buttons smaller
  },
  TableContainer: {
    width: 'auto',
    margin: 'auto',
    background: SPINDLE,
    border: '2px black',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Added box shadow
    padding: '10px',
    marginBottom: '10px',
  },
  TableHead: {
    fontWeight: 'bold',
    borderBottom: '3px solid black',
  },
  TableHeadCell: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: PERSIAN_BLUE,
    cursor: 'pointer',
  },
  arrowUp: {
    color: 'green',
  },
  arrowDown: {
    color: 'red',
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

  const handleButtonClick = (name: string | number) => {
    router.push(`/Profile/${name}`);
  };

  useEffect(() => {
    setSortRows(rows);
  }, [rows]);

  const getPreviousWeek = week => {
    const weekIndex = WEEKS.indexOf(week);

    if (weekIndex <= 0) return null;
    return WEEKS[weekIndex - 1];
  };

  //Ill specify it later
  const previousWeek: any = getPreviousWeek(currentWeek);
  const previousWeekData = createTableData(mockStudentData, previousWeek);

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

  const WeekButtons = (
    <Box sx={{ textAlign: 'center' }}>
      {WEEKS.map(week => (
        <Button
          sx={{
            ...styles.WeekButton,
            border: week === currentWeek ? '1px solid black' : 'none',
          }}
          variant='contained'
          key={week}
          onClick={() => {
            setCurrentWeek(week);
          }}
        >
          {mapWeekToString[week]}
        </Button>
      ))}
    </Box>
  );

  return (
    <TableContainer sx={styles.TableContainer} component={Paper}>
      <Box
        sx={{
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ color: 'black', fontSize: '18px', fontWeight: '1000' }}>
          {selectedSemester} Semester
        </span>
        {WeekButtons}
      </Box>
      <Table size='small' sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow sx={styles.TableHead}>
            <TableCell
              sx={{ ...styles.TableHeadCell, width: '50px' }}
              onClick={() => Sort('age')}
            >
              Age
            </TableCell>

            <TableCell sx={styles.TableHeadCell} onClick={() => Sort('name')}>
              Student
            </TableCell>
            <TableCell
              sx={styles.TableHeadCell}
              align='right'
              onClick={() => Sort('freestyle')}
            >
              50 yard Freestyle
            </TableCell>
            <TableCell
              sx={styles.TableHeadCell}
              align='right'
              onClick={() => Sort('backstroke')}
            >
              50 yard Backstroke
            </TableCell>
            <TableCell
              sx={styles.TableHeadCell}
              align='right'
              onClick={() => Sort('breaststroke')}
            >
              50 yard Breaststroke
            </TableCell>
            <TableCell
              sx={styles.TableHeadCell}
              align='right'
              onClick={() => Sort('butterfly')}
            >
              50 yard Butterfly
            </TableCell>
            <TableCell
              sx={styles.TableHeadCell}
              align='right'
              onClick={() => Sort('IM')}
            >
              100 yard IM
            </TableCell>
          </TableRow>
        </TableHead>
        {rows.length === 0 && (
          <Alert
            sx={{
              position: 'absolute',
              top: '200px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: '500px',
              backgroundColor: '#84A4FC',
            }}
            color='warning'
            severity='error'
          >
            No Data Please select a different week or semester
          </Alert>
        )}

        <TableBody>
          {sortRows.map(row => {
            // Find the matching student from the previous week based on Name, ID DOESNT WORK
            const prevData =
              previousWeekData.find(prevRow => prevRow.name === row.name) || {};

            const freestyleArrow = getArrow(row.freestyle, prevData.freestyle);
            const backstrokeArrow = getArrow(
              row.backstroke,
              prevData.backstroke
            );
            const breaststrokeArrow = getArrow(
              row.breaststroke,
              prevData.breaststroke
            );
            const butterflyArrow = getArrow(row.butterfly, prevData.butterfly);
            const imArrow = getArrow(row.IM, prevData.IM);

            const name = row.name.toLowerCase().replace(/\s+/g, '');

            return (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left' component='th' scope='row'>
                  {row.age}
                </TableCell>
                <TableCell
                  align='left'
                  component='th'
                  scope='row'
                  onClick={() => handleButtonClick(name)} 
                  style={{ cursor: 'pointer' }}
                >
                  {row.name}
                </TableCell>

                <TableCell align='right'>
                  {row.freestyle}{' '}
                  <span
                    style={
                      freestyleArrow === '▲' ? styles.arrowUp : styles.arrowDown
                    }
                  >
                    {freestyleArrow}
                  </span>
                </TableCell>
                <TableCell align='right'>
                  {row.backstroke}{' '}
                  <span
                    style={
                      backstrokeArrow === '▲'
                        ? styles.arrowUp
                        : styles.arrowDown
                    }
                  >
                    {backstrokeArrow}
                  </span>
                </TableCell>
                <TableCell align='right'>
                  {row.breaststroke}{' '}
                  <span
                    style={
                      breaststrokeArrow === '▲'
                        ? styles.arrowUp
                        : styles.arrowDown
                    }
                  >
                    {breaststrokeArrow}
                  </span>
                </TableCell>
                <TableCell align='right'>
                  {row.butterfly}{' '}
                  <span
                    style={
                      butterflyArrow === '▲' ? styles.arrowUp : styles.arrowDown
                    }
                  >
                    {butterflyArrow}
                  </span>
                </TableCell>
                <TableCell align='right'>
                  {row.IM}{' '}
                  <span
                    style={imArrow === '▲' ? styles.arrowUp : styles.arrowDown}
                  >
                    {imArrow}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
