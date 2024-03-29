import React from 'react';
import getComments from './comment.js';

const CommentsSection = () => {
  // เรียกใช้ฟังก์ชัน getComments เพื่อรับอาร์เรย์ของความคิดเห็น
  const comments = getComments();

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {/* แสดงความคิดเห็นทั้งหมดที่ได้รับจากฟังก์ชัน getComments */}
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
