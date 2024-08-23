'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import studentsData from './data/students.json'; // Import mock data
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [chosenStudent, setChosenStudent] = useState(null); // When choosing the student to see the graph
  const [bestTimes, setBestTimes] = useState({});
  const [stroke, setStroke] = useState(null);
  const [Popup, setPopup] = useState(false);

  // Function to update best times for each stroke for a student
  const updateBestTimes = (student, currentBestTimes) => {
    const updatedBestTimes = { ...currentBestTimes };
    const weeks = ['Week 1', 'Week 4', 'Week 7', 'Week 9'];

    for (let i = 0; i < weeks.length; i++) {
      const week = weeks[i];
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
  }, []);

  console.log(bestTimes)

  const handleTimeChange = (studentId, week, stroke, value) => {
    const updatedBestTimes = { ...bestTimes };
    const newValue = parseFloat(value);

    if (!updatedBestTimes[studentId]) {
      updatedBestTimes[studentId] = {};
    }

    if (!updatedBestTimes[studentId][week]) {
      updatedBestTimes[studentId][week] = {};
    }

    updatedBestTimes[studentId][week][stroke] = newValue;

    if (newValue < updatedBestTimes[studentId][stroke]) {
      updatedBestTimes[studentId][stroke] = newValue;
    }

    setBestTimes(updatedBestTimes);
  };

  const showGraph = (student) => {
    setChosenStudent(student);
    setPopup(true);
  };

  const strokeSelection = (stroke) => {
    setStroke(stroke);
    setPopup(false);
    router.push(`/graph?studentId=${chosenStudent.id}&stroke=${stroke}`);
  };

  const renderEditableTime = (studentId, week, stroke) => {
    const timeValue = bestTimes[studentId]?.[week]?.[stroke] || '';

    return (
      <div className={styles.timeEntry}>
        <label>{stroke.charAt(0).toUpperCase() + stroke.slice(1)}:</label>
        <input
          type="number"
          value={timeValue}
          onChange={(e) => handleTimeChange(studentId, week, stroke, e.target.value)}
        /> s
      </div>
    );
  };

  const eachStudentData = (students) => {
    const array = [];
    
    for (let i = 0; i < students.length; i++) {
      const student = students[i];

      array.push(
        <tr key={student.id}>
          <td>{student.name}</td>
          <td>
            {renderEditableTime(student.id, 'Week 1', 'freestyle')}
            {renderEditableTime(student.id, 'Week 1', 'backstroke')}
            {renderEditableTime(student.id, 'Week 1', 'breaststroke')}
            {renderEditableTime(student.id, 'Week 1', 'butterfly')}
          </td>
          <td>
            {renderEditableTime(student.id, 'Week 4', 'freestyle')}
            {renderEditableTime(student.id, 'Week 4', 'backstroke')}
            {renderEditableTime(student.id, 'Week 4', 'breaststroke')}
            {renderEditableTime(student.id, 'Week 4', 'butterfly')}
          </td>
          <td>
            {renderEditableTime(student.id, 'Week 7', 'freestyle')}
            {renderEditableTime(student.id, 'Week 7', 'backstroke')}
            {renderEditableTime(student.id, 'Week 7', 'breaststroke')}
            {renderEditableTime(student.id, 'Week 7', 'butterfly')}
          </td>
          <td>
            {renderEditableTime(student.id, 'Week 9', 'freestyle')}
            {renderEditableTime(student.id, 'Week 9', 'backstroke')}
            {renderEditableTime(student.id, 'Week 9', 'breaststroke')}
            {renderEditableTime(student.id, 'Week 9', 'butterfly')}
          </td>
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
          <h2>Select a Stroke for {chosenStudent.name}'s Progress</h2>
          <button onClick={() => strokeSelection('freestyle')}>Freestyle</button>
          <button onClick={() => strokeSelection('backstroke')}>Backstroke</button>
          <button onClick={() => strokeSelection('breaststroke')}>Breaststroke</button>
          <button onClick={() => strokeSelection('butterfly')}>Butterfly</button>
        </div>
      )}
    </main>
  );
}
