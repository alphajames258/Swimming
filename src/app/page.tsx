'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { mockStudentData as studentsData } from '../data/students.ts'; // Import mock data
import { WEEKS } from '../constants/swimmingConstants.ts';

export default function Home() {
  const [chosenStudent, setChosenStudent] = useState(null); //When choosing the student to see the graph
  const [bestTimes, setBestTimes] = useState({});

  //function to get the best times for each stroke for each student using double for loop
  const updateBestTimes = (student, currentBestTimes) => {
    console.log(currentBestTimes, 'help');
    //get the current obj should be empty
    const updatedBestTimes = { ...currentBestTimes };

    for (let i = 0; i < WEEKS.length; i++) {
      //get the current weekData, if no data empty obj
      const week = WEEKS[i];
      const weekData = student.times[week] || {};
      //if the student obj is empty, assign all strokes to Infinity
      if (!updatedBestTimes[student.id]) {
        updatedBestTimes[student.id] = {
          freestyle: Infinity,
          backstroke: Infinity,
          breaststroke: Infinity,
          butterfly: Infinity,
        };
      }
      //Go through each stroke to get the weekData stroke time for current week using a for loop
      const strokes = ['freestyle', 'backstroke', 'breaststroke', 'butterfly'];
      for (let x = 0; x < strokes.length; x++) {
        const stroke = strokes[x];
        //if for the current week, there is a time
        if (weekData[stroke] !== undefined) {
          //if the time is less than the current stroke time, update it to the faster time
          if (weekData[stroke] < updatedBestTimes[student.id][stroke]) {
            updatedBestTimes[student.id][stroke] = weekData[stroke];
          }
        }
      }
    }

    return updatedBestTimes;
  };

  const initializeBestTimes = students => {
    let studentBestTimes = {};

    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      //each student will go through the function updateBestTimes to get best time
      studentBestTimes = updateBestTimes(student, studentBestTimes);
    }

    setBestTimes(studentBestTimes);
  };
  // when loading page, it will initalize the best time once
  useEffect(() => {
    initializeBestTimes(studentsData);
  }, []);

  console.log(bestTimes, 'times');

  //Show Graph, not available yet
  const showGraph = student => {
    setChosenStudent(student);
  };

  // //Function to show graph
  // const showGraph = (student) => {
  //   console.log(student);
  //   setChosenStudent(student);
  //   setPopup(true);
  // };
  // //function to choose stroke, route to the graph page
  // const strokeSelection = (stroke) => {
  //   setStroke(stroke);
  //   setPopup(false);
  //   router.push(`/graph?studentId=${chosenStudent.id}&stroke=${stroke}`);
  // };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Swim Team Times</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Week 1</th>
            <th>Week 4</th>
            <th>Week 7</th>
            <th>Week 9</th>
          </tr>
        </thead>
      </table>
    </main>
  );
}
