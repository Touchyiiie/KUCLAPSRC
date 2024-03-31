import React, { useState, useEffect } from 'react';
import axios from 'axios';
import coursesData from './courses.txt';
import Comment from './addandcomment.js'; // Import the Comment component

const HomePage = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [coursesId, setCoursesId] = useState([]);
  const [idd, setId] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    findIdWhenSelect(selectedCourse);
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(coursesData);
      const courseList = response.data.split('\n').filter(course => course.trim() !== '');
      const courseIds = response.data.split('\n').map(course => course.trim().split(' ')[0]);
      setCoursesId(courseIds);
      setCourses(courseList);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCourseSelect = (event) => {
    setSelectedCourse(event.target.value);
  };

  const findIdWhenSelect = (selectedCourse) => {
    const courseId = selectedCourse.split(' ')[0]; // Get the course ID from the selected course string
    setId(courseId);
  };

  return (
    <>
      <h3>React Page</h3>
      <label htmlFor="courseSelect">Select a Course:</label>
      <select id="courseSelect" onChange={handleCourseSelect} value={selectedCourse}>
        <option value="">-- Please Select --</option>
        {courses.map((course, index) => (
          <option key={index} value={course.trim()}>
            {course.trim()}
          </option>
        ))}
      </select>
      <h3>you select {idd}</h3>
      <Comment id_course={idd} />
    </>
  );
};

export default HomePage;
