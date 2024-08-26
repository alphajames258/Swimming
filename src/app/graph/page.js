'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Allows me to use chart.js components
import { mockStudentData as studentsData } from '../../data/students.ts'; // Get student data
import { WEEKS } from "../../constants/swimmingConstants.ts";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';

const StudentGraph = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const studentId = searchParams.get('studentId');
  const stroke = searchParams.get('stroke');
 
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    if (studentId && stroke) {
      const student = studentsData.find((s) => s.id == studentId);
      if (student) {
        const strokeData = [];
        for (let i = 0; i < WEEKS.length; i++) {
          const week = WEEKS[i];
          if (student.times[week] && student.times[week][stroke] !== undefined) {
            strokeData.push(student.times[week][stroke]);
          } else {
            strokeData.push(null);
          }
        }
        setStudentData(strokeData);
      }
    }
  }, [studentId, stroke]);

  const getChartData = () => {
    const strokeNameUpperCased = stroke.charAt(0).toUpperCase() + stroke.slice(1);
    
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
      x: {
        ticks: {
          color: 'Black', 
        },
        title: {
          display: true,
          text: 'Weeks',
          color: 'black', 
        },
      },
      y: {
        reverse: true, 
        ticks: {
          color: 'black', 
        },
        title: {
          display: true,
          text: 'Time (seconds)',
          color: 'black', 
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'black', 
        },
      },
    },
  };

  return (
    <div className={styles.fullScreen}>
    <button
    onClick={() => router.push('/')} // Navigate to the home page
    className={styles.backButton}
  >
    Back to Home
  </button>
    
      {studentData ? (
        <Line data={getChartData()} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StudentGraph;
