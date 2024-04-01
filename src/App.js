import React, { useState, useEffect } from 'react';
import coursesData from './courses.txt';
import YourCommentFunction from './comment.js';
import styled from 'styled-components';
import axios from "axios";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledH1 = styled.h1`
  font-size: 28px;
  text-align: center;
  margin-bottom: -3px;
  margin-top: -10px;
  font-family: 'Roboto', sans-serif;
`;

const StyledImage = styled.img`
  width: 100px;
  cursor: pointer; /* Add this to show pointer cursor on hover */
`;

const StyledH2 = styled.h2`
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
  font-family: "Times New Roman", Times, serif;
`;

const StyledH3 = styled.h3`
  font-size: 16px;
  text-align: center;
  margin-bottom: -10px;
  margin-top: 5px;
  color: gray;
  text-decoration: underline;
`;

const CommentFrame = styled.div`
  width: 80%;
  max-width: 600px;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CommentTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const CommentContent = styled.p`
  font-size: 18px;
`;

const StyledSelect = styled.select`
  width: 52%;
  padding: 10px;
  margin-top: 20px;
`;

const StyledTextarea = styled.textarea`
  width: 50%;
  min-height: 100px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledInput = styled.input`
  width: 50%;
  padding: 10px;
  margin-top: 10px;
`;

const HomePage = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [userReview, setUserReview] = useState('');
  const [penName, setPenName] = useState('');
  const [studyYear, setStudyYear] = useState('');
  const [studyGroup, setStudyGroup] = useState('');
  const [term, setTerm] = useState('');
  const [deleteCode, setDeleteCode] = useState('');
  const [grade, setGrade] = useState('');
  const [homeworkScore, setHomeworkScore] = useState(0);
  const [interestScore, setInterestScore] = useState(0);
  const [teachingScore, setTeachingScore] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false); // Add state to keep track of review open/close
  const [showLatestReview, setShowLatestReview] = useState(true); // State to control whether to show latest review or not

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
    YourCommentFunction(event.target.value); 
  };

  const handleOpenReview = () => {
    if(selectedCourse) {
      setReviewOpen(true);
      setShowLatestReview(false); // Don't show latest review when opening review
    }
  };

  const handleSubmitReview = async () => {
    try {
      const reviewData = {
        userReview,
        penName,
        studyYear,
        studyGroup,
        term,
        deleteCode,
        grade,
        homeworkScore,
        interestScore,
        teachingScore,
      };
      const response = await axios.post('http://127.0.0.1:5000', reviewData);
      console.log(response.data.message);
      setReviewOpen(false); // Close the review form after submission
      setShowLatestReview(true); // Show latest review after submission
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  

  return (
    <StyledContainer>
      <a href="http://localhost:3000/"> {/* Replace "https://www.example.com" with your main website URL */}
        <StyledImage src="https://scontent-kul3-1.xx.fbcdn.net/v/t39.30808-6/277559081_357447626399069_3124628168640799303_n.png?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEFjOOMT3MAzobM9KC_D7yO_ziw_CdvxIP_OLD8J2_Eg2ADtnEcQaOM_8IluPINcf-KypQW7NdhGRD-NwXhHSz3&_nc_ohc=8xVaMkKg__MAX8R5o6t&_nc_ht=scontent-kul3-1.xx&oh=00_AfB-e-wNegAzqP81WX6E6TA0Y3rVw8yTD9Vg0u4QdIMsSA&oe=660AEF25"/>
      </a>
      <StyledH1>KUCLAP</StyledH1>
      <StyledH2>ค้นหาและรีวิวรายวิชา</StyledH2>
      <StyledSelect id="courseSelect" onChange={handleCourseSelect} value={selectedCourse}>
        <option value="">ค้นหารายวิชา ชื่อวิชาภาษาไทย / ชื่อวิชาภาษาอังกฤษ</option>
        {courses.map((course, index) => (
          <option key={index} value={course.trim()}>
            {course.trim()}
          </option>
        ))}
      </StyledSelect>
      {selectedCourse && (
        <>
          { !reviewOpen && 
            <StyledButton onClick={handleOpenReview}>รีวิววิชานี้</StyledButton>
          }
          { reviewOpen && 
            <>
              <StyledTextarea
                placeholder="เขียนรีวิวของคุณที่นี่..."
                value={userReview}
                onChange={(event) => setUserReview(event.target.value)}
              />
              <StyledInput type="text" placeholder="นามปากกา" value={penName} onChange={(event) => setPenName(event.target.value)} />
              <StyledInput type="number" placeholder="ปีการศึกษาที่เรียน" value={studyYear} onChange={(event) => setStudyYear(event.target.value)} />
              <StyledInput type="number" placeholder="หมู่เรียน" value={studyGroup} onChange={(event) => setStudyGroup(event.target.value)} />
              <StyledInput type="text" placeholder="เทอม" value={term} onChange={(event) => setTerm(event.target.value)} />
              <StyledInput type="number" placeholder="ตัวเลข 4 หลัก(ไว้เพื่อลบรีวิว)" value={deleteCode} onChange={(event) => setDeleteCode(event.target.value)} />
              <StyledSelect value={grade} onChange={(event) => setGrade(event.target.value)}>
                <option value="">เกรดที่ได้</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </StyledSelect>
              <StyledInput type="number" min="1" max="5" placeholder="จำนวนงานและการบ้าน" value={homeworkScore} onChange={(event) => setHomeworkScore(event.target.value)} />
              <StyledInput type="number" min="1" max="5" placeholder="ความน่าสนใจของเนื้อหา" value={interestScore} onChange={(event) => setInterestScore(event.target.value)} />
              <StyledInput type="number" min="1" max="5" placeholder="การสอนของอาจารย์" value={teachingScore} onChange={(event) => setTeachingScore(event.target.value)} />
              <StyledButton onClick={handleSubmitReview}>Submit Review</StyledButton>
            </>
          }
        </>
      )}
      { showLatestReview && // Only show latest review if showLatestReview is true
        <>
          <StyledH3>รีวิวล่าสุด</StyledH3>
          <CommentFrame>
            <CommentTitle>ความคิดเห็นล่าสุด</CommentTitle>
            <CommentContent>นี่คือความคิดเห็นล่าสุดจากผู้ใช้งาน</CommentContent>
          </CommentFrame>
        </>
      }
    </StyledContainer>
  );
};

export default HomePage;
