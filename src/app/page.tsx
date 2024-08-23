'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { mockStudentData as initialStudentsData } from '../data/students.ts'; // Import mock data
import { WEEKS } from '../constants/swimmingConstants.ts';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [studentsData, setStudentsData] = useState(initialStudentsData);

  const [chosenStudent, setChosenStudent] = useState(null); // When choosing the student to see the graph
  const [bestTimes, setBestTimes] = useState({});
  const [Popup, setPopup] = useState(false); //initialize popup
  const [stroke, setStroke] = useState(null);
  const [editMode, setEditMode] = useState(false); // Tracks if we're in edit mode
  const [editWeek, setEditWeek] = useState(null); // Tracks the week being edited
  const [editTimes, setEditTimes] = useState({
    // Stores the new times
    freestyle: '',
    backstroke: '',
    breaststroke: '',
    butterfly: '',
  });

  // Function to get the best times for each stroke for one student using a double for loop
  const updateBestTimes = (student, currentBestTimes) => {
    const updatedBestTimes = { ...currentBestTimes };

    for (let i = 0; i < WEEKS.length; i++) {
      const week = WEEKS[i];
      const weekData = student.times[week] || {};

      if (!updatedBestTimes[student.id]) {
        updatedBestTimes[student.id] = {
          freestyle: Infinity,
          backstroke: Infinity,
          breaststroke: Infinity,
          butterfly: Infinity,
        };
      }

      const strokes = ['freestyle', 'backstroke', 'breaststroke', 'butterfly'];
      for (let x = 0; x < strokes.length; x++) {
        const stroke = strokes[x];
        if (weekData[stroke] !== undefined) {
          if (weekData[stroke] < updatedBestTimes[student.id][stroke]) {
            updatedBestTimes[student.id][stroke] = weekData[stroke];
          }
        }
      }
    }

    return updatedBestTimes;
  };
  // Function to Get best times for each student
  const initializeBestTimes = (students) => {
    let studentBestTimes = {};

    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      studentBestTimes = updateBestTimes(student, studentBestTimes);
    }

    setBestTimes(studentBestTimes);
  };

  useEffect(() => {
    initializeBestTimes(studentsData);
  }, [studentsData]); // Get best times when studentsData changes

  //Function to show graph
  const showGraph = (student) => {
    console.log(student);
    setChosenStudent(student);
    setPopup(true);
  };
  //function to choose stroke, route to the graph page
  const strokeSelection = (stroke) => {
    setStroke(stroke);
    setPopup(false);
    router.push(`/graph?studentId=${chosenStudent.id}&stroke=${stroke}`);
  };

  const triggerEditMode = (student, week) => {
    console.log(week);
    setChosenStudent(student);
    setEditWeek(week);
    setEditMode(true);
    setPopup(true);

    console.log(editTimes);
    console.log(Object.keys(editTimes), 'HELP');
  };

  const handleTimeChange = (stroke, value) => {
    //adding each stroke time
    setEditTimes((prevTimes) => ({
      ...prevTimes,
      [stroke]: value,
    }));

    console.log(editTimes, 'newtimes');
  };

  const saveTimes = () => {
    // Create a new array to hold updated students
    const updatedStudents = [...studentsData];

    // Loop through each student and update their times
    for (let i = 0; i < updatedStudents.length; i++) {
      const student = updatedStudents[i];
      //if id is the same
      if (student.id === chosenStudent.id) {
        // Update the student's times for the specific week
        updatedStudents[i] = {
          ...student,
          times: {
            ...student.times,
            [editWeek]: {
              ...editTimes,
            },
          },
        };
      }
    }

    // Log the updated students array for debugging
    console.log(updatedStudents, 'students');

    // Update the state with the new data
    setStudentsData(updatedStudents);
    setEditMode(false);
    setPopup(false);
    initializeBestTimes(updatedStudents); // Recalculate the best times
  };

  const eachStudentData = (students) => {
    const array = [];
    for (let i = 0; i < students.length; i++) {
      const student = students[i];

      const formatTimes = (week) => {
        const times = [];
        const weekData = student.times[week];

        const strokes = [
          'freestyle',
          'backstroke',
          'breaststroke',
          'butterfly',
        ];
        for (let j = 0; j < strokes.length; j++) {
          const stroke = strokes[j];
          if (weekData && weekData[stroke]) {
            times.push(
              `${stroke.charAt(0).toUpperCase() + stroke.slice(1)}: ${
                weekData[stroke]
              }s`
            );
          } else {
            times.push(
              `${stroke.charAt(0).toUpperCase() + stroke.slice(1)}: N/A`
            );
          }
        }

        if (!weekData) {
          return (
            <>
              <span>Not Available yet</span>
              <button onClick={() => triggerEditMode(student, week)}>
                Edit
              </button>
            </>
          );
        }

        return times.join(' / ');
      };

      array.push(
        <tr key={student.id}>
          <td>{student.name}</td>
          <td>{formatTimes('weekOne')}</td>
          <td>{formatTimes('weekFour')}</td>
          <td>{formatTimes('WeekSeven')}</td>
          <td>{formatTimes('WeekTen')}</td>
          <td>
            <button
              className={styles.button}
              onClick={() => showGraph(student)}
            >
              Show Graph
            </button>
          </td>
        </tr>
      );
    }
    return array;
  };

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
        <tbody>{eachStudentData(studentsData)}</tbody>
      </table>
      {Popup && (
        <div className={styles.popup}>
          {editMode ? (
            <>
              <h2>
                Edit Times for {chosenStudent.name} - {editWeek}
              </h2>
              {Object.keys(editTimes).map((stroke) => (
                <div key={stroke}>
                  <label>
                    {stroke.charAt(0).toUpperCase() + stroke.slice(1)}:{' '}
                  </label>
                  <input
                    type="number"
                    onChange={(e) => handleTimeChange(stroke, e.target.value)}
                  />
                </div>
              ))}
              <button onClick={saveTimes}>Save</button>
            </>
          ) : (
            <>
              <h2>Select a Stroke for {chosenStudent.name}'s Progress</h2>
              <button onClick={() => strokeSelection('freestyle')}>
                Freestyle
              </button>
              <button onClick={() => strokeSelection('backstroke')}>
                Backstroke
              </button>
              <button onClick={() => strokeSelection('breaststroke')}>
                Breaststroke
              </button>
              <button onClick={() => strokeSelection('butterfly')}>
                Butterfly
              </button>
            </>
          )}
        </div>
      )}
    </main>
  );
}
