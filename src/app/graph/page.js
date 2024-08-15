'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; //allows me to use chart.js components
import studentsData from '../data/students.json'; // get student data

const StudentGraph = () => {
//search for the params sent with URL
  const searchParams = useSearchParams();

  // Get studentId and stroke
  const studentId = searchParams.get('studentId');
  const stroke = searchParams.get('stroke');
 
//use state data to graph
  const [studentData, setStudentData] = useState(null);


//Initialize use effect when component is rendered, will rerun if dependencies change
  useEffect(() => {
    console.log(studentId, 'studentid')
    console.log(stroke, 'stroke')
    console.log(studentsData, 'data')
    //if stroke and id exist, find the student with the same id
    if (studentId && stroke) {
      const student = studentsData.find((s) => s.id == studentId);
      console.log(student)
 
      // if the student is found, use a for loop to get times from student
      if (student) {
        const strokeData = [];
        const weeks = ['Week 1', 'Week 4', 'Week 7', 'Week 9'];
        for (let i = 0; i < weeks.length; i++) {
          const week = weeks[i];
          //if the student week exist and the stroke for that week exist, push the stroke time into strokeData
          if (student.times[week] && student.times[week][stroke] !== undefined) {
            strokeData.push(student.times[week][stroke]);
          } else {
            strokeData.push(null); // if there is no data, push null so it skips
          }
        }

        console.log('Stroke data:', strokeData); 
        // set strokeData to studentData
        setStudentData(strokeData);
      }
    }
  }, [studentId, stroke]);

  //function to create the chart
  const getChartData = () => {
    const strokeNameUpperCased = stroke.charAt(0).toUpperCase() + stroke.slice(1)
    
    return {
      labels: ['Week 1', 'Week 4', 'Week 7', 'Week 9'],
      datasets: [
        {
          label: `${strokeNameUpperCased} Times`,
          data: studentData,
          borderColor: 'rgba(75, 192, 192, 1)',
      
          spanGaps: true, 
          
        },
      ],
    

    };
  };

  const options = {
    scales: {
      y: {
        reverse: true, // Inverts the Y-axis

       
      },
    },
  };

  //if studentData exists, show the data using Line else Show loading...
  return (
    <div>
      {studentData ? (
        <Line data={getChartData()}  options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StudentGraph;
