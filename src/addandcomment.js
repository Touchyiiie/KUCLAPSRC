import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledH2 = styled.h2`
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
  font-family: "Times New Roman", Times, serif;
  text-align: left;
`;

const StyledButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  opacity: ${({ isActive }) => (isActive ? "1" : "0.5")};
  border: none;
  font-size: 28px;
  background-color: transparent;
  margin-right: 20px;
  margin-left: 20px;
  position: relative;
  // border-bottom: ${({ isActive }) => (isActive ? "2px solid #000" : "")};
  // border-bottom-width: ${({ isActive }) => (isActive ? "3px" : "0px")};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  &:hover {
    background-color: #2c7a7b;
    border-radius: 25px;
  }
`;

const ButtonSeparator = styled.div`
  position: absolute;
  width: 3px;
  height: 100%;
  background-color: #000;
  right: calc(52.5%);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
  border-bottom: "3px solid #000";
  
`;

const StyledList = styled.ul`
  width: 750px;
  border-radius: 15px;
  border: 2px solid #000;
  padding: 10px;
  overflow: auto;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const CommentLabel = styled.label`
  font-size: 20px;
  margin-bottom: 5px;
`;

const CommentTextArea = styled.textarea`
  width: 20%-95%;
  height: 100px;
  font-size: 20px;
  padding: 10px;
  border-radius: 10px; /* ปรับขนาดของขอบเส้นมุม */
  border: 2px solid #ccc; /* ปรับสีและขนาดของเส้นขอบ */
  resize: none; /* ป้องกันการปรับขนาด textarea โดยผู้ใช้งาน */
  margin-bottom: 10px;
`;


const UserTextArea = styled.textarea`
  width: 70%;
  height: 15px;
  font-size: 15px;
  padding: 5px;
  border-radius: 10px; /* ปรับขนาดของขอบเส้นมุม */
  border: 2px solid #ccc; /* ปรับสีและขนาดของเส้นขอบ */
  resize: none; /* ป้องกันการปรับขนาด textarea โดยผู้ใช้งาน */
`;

const StyledListItem = styled.li`
  padding: 20px;
  border: 3px solid #000;
  list-style: none;
  border-radius: 22px;
  margin-bottom: 22px;
`;

const StyledListbet = styled.li`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  margin-top: -5px;
  margin-bottom: -10px;
`;

const StyledListonlybet = styled.li`
  justify-content: space-between;
  display: flex;
  width: 38%;
`;

const StyledSeparator = styled.div`
  width: 97%;
  max-width: 800px;
  height: 3px;
  border-radius: 20%;
  margin: 10px;
  background-color: gray; 
`;

const UserInfo = styled.div`
  font-weight: bold;
  font-size: 15px;
  color: gray;
`;

const BoldText = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const LikesBarContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 25px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 15px; 
`;

const LikesBarFiller = styled.div`
  height: 100%;
  width: ${({ fillerWidth }) => fillerWidth}%;
  background-color: #3cba9f;
  border-radius: inherit;
  text-align: right;
`;

const LikesBarContent = styled.span`
  position: right;
  color: #00000;
`;

const AddCommentButton = styled.button`
  font-size: 20px;
  padding: 10px 20px;
  background-color: #3cba9f;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2c7a7b;
  }
`;


export default function Comment({ id_course }) {
    
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        user: "",
        course: "",
        comment: "",
        like: ""
    });
    const [TotalLikesPercent, setTotalLikesPercent] = useState(0);
    const [counterpeople, setCounterpeople] = useState(0);
    const [whobutton, setWhobutton] = useState(false);
    const [idc, setIdc] = useState("");

    useEffect(() => {
        fetchComments();
    }, [id_course]);

    useEffect(() => {
        calculateTotalLikes();
    }, [comments]);

    useEffect(() => {
        setIdc(id_course);
    }, [id_course]);

    const fetchComments = () => {
        axios.get(`http://localhost:5000/comments/${id_course}`)
            .then(response => setComments(response.data.comments))
            .catch(error => console.error('Error fetching comments:', error));
    };

    const calculateTotalLikes = () => {
        let likes = 0;
        for (const comment of comments) {
            likes += comment.like;
        }
        if(likes === 0) {
          setTotalLikesPercent(0);
          setCounterpeople(0);
        } else {
          const countpeople = comments.length;
          const percent = (likes / (countpeople * 5)) * 100; // Calculate percentage
          setCounterpeople(countpeople);
          setTotalLikesPercent(percent);
        }
    };
    

    const seeoradd = (buttonType) => {
        if (buttonType === "see") {
            setWhobutton(false);
        } else if (buttonType === "add") {
            setWhobutton(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment({ ...newComment, [name]: value });
    };

    const handleAddComment = () => {
        axios.post('http://localhost:5000/comments', {
            ...newComment,
            course: idc
        })
        .then(() => {
            setNewComment({
                user: "",
                course: id_course,
                comment: "",
                like: ""
            });
            fetchComments();
        })
        .catch(error => console.error('Error adding comment:', error));
    };
    

    const handleLikeChange = (e) => {
        setNewComment({ ...newComment, like: parseInt(e.target.value) });
    };
    
    return (
        <>
          {idc === "" ? (
            <StyledH2>โปรดเลือกวิชา</StyledH2>
          ) : (
            <>
            <StyledListonlybet>
            
            <StyledH2>
                คนชื่นชอบ :
                </StyledH2>
              <LikesBarContainer>
              <LikesBarFiller fillerWidth={TotalLikesPercent}>
                        <LikesBarContent>{TotalLikesPercent.toFixed(0)} % ฺ</LikesBarContent>
                      </LikesBarFiller>
                  </LikesBarContainer>
                  </StyledListonlybet>
            <StyledContainer>
            <ButtonGroup isActive={whobutton}>
              <StyledButton type="button" onClick={() => seeoradd("see")} isActive={!whobutton}>ดูความคิดเห็น</StyledButton>
              <ButtonSeparator/>
              <StyledButton type="button" onClick={() => seeoradd("add")} isActive={whobutton}>เพิ่มความคิดเห็น</StyledButton>
            </ButtonGroup>
                {whobutton ? (
                  <>
                  
                  <StyledList>
                      <CommentForm>
                        <CommentLabel>ความคิดเห็น</CommentLabel>
                        <CommentTextArea name="comment" value={newComment.comment} onChange={handleInputChange} />
                        <CommentLabel>โดย</CommentLabel>
                        <UserTextArea name="user" value={newComment.user} onChange={handleInputChange} />
                        <CommentLabel>ความประทับใจ</CommentLabel>
                        <div>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <label key={num} style={{ fontSize: "20px", marginRight: "10px" }}>
                              <input type="radio" name="like" value={num} checked={parseInt(newComment.like) === num} onChange={handleLikeChange} />
                              {"★".repeat(num)}
                            </label>
                          ))}
                        </div>
                        <br/>
                        <AddCommentButton type="button" onClick={handleAddComment}>
                          Add Comment
                        </AddCommentButton>
                      </CommentForm>
                    </StyledList>
                  </>
                ) : (
                  <>
                    {comments.length === 0 ? (
                      <p>No comments</p>
                    ) : (
                      <StyledList>

                        <StyledH2 >ความคิดเห็นทั้งหมด {counterpeople} ความคิดเห็น</StyledH2 >
                          {comments.map(comment => (
                            
                            <StyledListItem key={comment._id}>
                              <BoldText>{comment.comment}</BoldText>
                              <StyledSeparator/>
                              <StyledListbet>
                              <UserInfo>โดย {comment.user}</UserInfo>
                              <UserInfo>ให้คะแนน {comment.like} / 5</UserInfo>
                              </StyledListbet>
                            </StyledListItem>
                          ))}
                      </StyledList>
                    )}
                  </>
                )}
              </StyledContainer>
              
            </>
          )}
        </>
      );
}
