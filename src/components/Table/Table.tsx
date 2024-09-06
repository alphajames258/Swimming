import Table from '@mui/material/Table';
import { useState } from 'react';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LINK_WATER, PERSIAN_BLUE, SPINDLE } from '../../constants/colors';
import Button from '@mui/material/Button';
import { Alert, Box } from '@mui/material';
import { WEEKS, mapWeekToString } from '../../constants/swimmingConstants';

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
    // marginTop: '1px',
    background: SPINDLE,
    // borderRadius: '15px',

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
  },
};

export default function TableComponent({ rows, currentWeek, setCurrentWeek }) {
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
        <span style={{ color: 'black', fontSize: '18px', fontWeight: '600' }}>
          Summer 2024 Semester
        </span>
        {WeekButtons}
      
      </Box>
      <Table size='small' sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow sx={styles.TableHead}>
            <TableCell sx={{ ...styles.TableHeadCell, width: '50px' }}>
              Age
            </TableCell>
            <TableCell sx={styles.TableHeadCell}>Student</TableCell>
            <TableCell sx={styles.TableHeadCell} align='right'>
              50 yard Freestyle
            </TableCell>
            <TableCell sx={styles.TableHeadCell} align='right'>
              50 yard Backstroke
            </TableCell>
            <TableCell sx={styles.TableHeadCell} align='right'>
              50 yard Breaststroke
            </TableCell>
            <TableCell sx={styles.TableHeadCell} align='right'>
              50 yard Butterfly
            </TableCell>
          </TableRow>
        </TableHead>
        {rows.length === 0 && (
          <Alert
            sx={{
              position: 'absolute',
              top: '200px',
              left: '50%',
              transform: 'translateX(-50%)', // Centers the component horizontally
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
          {rows.map(row => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left' component='th' scope='row'>
                {row.age}
              </TableCell>
              <TableCell align='left' component='th' scope='row'>
                {row.name}
              </TableCell>

              <TableCell align='right'>{row.freestyle}</TableCell>
              <TableCell align='right'>{row.backstroke}</TableCell>
              <TableCell align='right'>{row.breaststroke}</TableCell>
              <TableCell align='right'>{row.butterfly}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
