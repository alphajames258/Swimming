import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button"; // Import the Button component

import "./table.css";



const styles = {
  TableContainer: {
    width: "80%",
    margin: "auto",
    marginTop: "20px",
    background: "#e0fbfc",
  },
  TableHead: {
    background: "#ee6c4d",
    fontWeight: "bold",
    borderBottom: "3px solid black",
  },
  TableHeadCell: {
    fontWeight: "bold",
    fontSize: "16px",
  },
};

export default function TableComponent({ rows }) {
  console.log(rows, 'rows')
  return (
    <TableContainer sx={styles.TableContainer} component={Paper}>
      <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={styles.TableHead}>
            <TableCell sx={styles.TableHeadCell}>Student</TableCell>
            <TableCell sx={styles.TableHeadCell} align="right">
              50y Freestyle
            </TableCell>
            <TableCell sx={styles.TableHeadCell} align="right">
              50y Backstroke
            </TableCell>
            <TableCell sx={styles.TableHeadCell} align="right">
              50y Breastroke
            </TableCell>
            <TableCell sx={styles.TableHeadCell} align="right">
              50y Butterfly
            </TableCell>
            <TableCell sx={styles.TableHeadCell} align="right">
             Check Graph
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.freestyle}</TableCell>
              <TableCell align="right">{row.backstroke}</TableCell>
              <TableCell align="right">{row.breastroke}</TableCell>
              <TableCell align="right">{row.butterfly}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="primary" onClick={() => alert(`Viewing graph for ${row.name}`)}>
                  View Graph
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
