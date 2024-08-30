"use client";
import TableComponent from "../../components/Table/Table";
import { createTableData } from "../../utils/createTableData";
import { mockStudentData } from "../../data/students";
import { useEffect, useRef, useState } from "react";
import { mapWeekToString, WEEKS } from "../../constants/swimmingConstants";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { count } from "console";

export default function Table() {
  const [currentWeek, setCurrentWeek] = useState("weekOne");
  const tableData = createTableData(mockStudentData, currentWeek);
 

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "40px",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <h2>Summer 2024 Semester</h2>
      </Box>
      {tableData.length === 0 && (
        <Alert
          sx={{
            position: "absolute",
            top: "150px",
            left: "50%",
            transform: "translateX(-50%)", // Centers the component horizontally
            width: "100%",
            maxWidth: "500px",
          }}
          color="warning"
          severity="error"
        >
          No Data Please select a different week or semester
        </Alert>
      )}
      <Box sx={{ marginTop: "60px", textAlign: "center" }}>
        {WEEKS.map((week) => (
          <Button
            sx={{
              margin: "10px",
              marginBottom: "0px",
              fontWeight: 800,
              border: week === currentWeek ? "3px solid black" : "none",
            }}
            variant="contained"
            key={week}
            onClick={() => {
              setCurrentWeek(week);
            }}
          >
            {mapWeekToString[week]}
          </Button>
        ))}
      </Box>

      {tableData.length > 0 && <TableComponent rows={tableData} />}
    </>
  );
}

{
  /*  */
}
