// pages/api/updateStudent.js

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(process.cwd(), 'src/app/data', 'students.json');
console.log(dataFilePath)

module.exports = function handler(req, res) {
  if (req.method === 'POST') {
    const { studentId, week, stroke, time } = req.body;

    // Read the existing students data
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    const students = JSON.parse(fileData);

    // Find the student and update the times
    const student = students.find(s => s.id === studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (!student.times[week]) {
      student.times[week] = {};
    }
    
    student.times[week][stroke] = time;

    // Write the updated data back to the JSON file
    fs.writeFileSync(dataFilePath, JSON.stringify(students, null, 2), 'utf8');

    return res.status(200).json({ message: 'Student times updated successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
