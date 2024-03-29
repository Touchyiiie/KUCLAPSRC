import React, { useState, useEffect } from 'react';
import coursesData from './courses.txt';
import YourCommentFunction from './comment.js'; // Import ฟังก์ชันที่จะใช้ในการจัดการคอมเมนต์

export const myFunction = () => {
  console.log("This is my function.");
};

const HomePage = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [numcourses, setNumCourses] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(coursesData);
      const data = await response.text();
      const courseList = data.split('\n').filter(course => course.trim() !== '');
      setCourses(courseList);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCourseSelect = (event) => {
    setSelectedCourse(event.target.value);
    setNumCourses(event.target.value.substring(0, 8)); // เปลี่ยนเป็น event.target.value
    // ทำการส่งข้อมูลไปยัง comment.js เมื่อมีการเลือกคอมเมนต์
    YourCommentFunction(event.target.value); 
  };

  
  
  return (
    <>
      
      <h1>React Page</h1>
      <label htmlFor="courseSelect">Select a Course:</label>
      <select id="courseSelect" onChange={handleCourseSelect} value={selectedCourse}>
        <option value="">-- Please Select --</option>
        {courses.map((course, index) => (
          <option key={index} value={course.trim()}>
            {course.trim()}
          </option>
        ))}
      </select>
      {
      numcourses && (
        <p>You selected: {numcourses}</p>
      )}
        
    </>
    
  );
  
};

export default HomePage;
