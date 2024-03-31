import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Comment({ id_course }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        user: "",
        course: "",
        comment: "",
        like: ""
    });
    const [TotalLikesprecent, setTotalLikesprecent] = useState(0); // State to hold total likes
    const [counterpeople, setCounterpeople] = useState(0);
    const [whobutton, setWhobutton] = useState(false); // Initialize with false
    const [idc, setIdc] = useState("");

    useEffect(() => {
        fetchComments();
    }, [id_course]); // Fetch comments whenever the course ID changes

    useEffect(() => {
        calculateTotalLikes();
    }, [comments]);

    useEffect(() => {
        setIdc(id_course);
    }, [id_course]);

    const fetchComments = () => {
        axios.get(`http://localhost:5000/comments/${id_course}`) // Fetch comments for the specified course ID
            .then(response => setComments(response.data.comments))
            .catch(error => console.error('Error fetching comments:', error));
    };

    const calculateTotalLikes = () => {
        let likes = 0;
        for (const comment of comments) {
            likes += comment.like;
        }
        const countpeople = comments.length;
        const precent = (likes / countpeople * 100 / 5).toFixed(2); // Round to two decimal places
        setCounterpeople(countpeople);
        setTotalLikesprecent(precent);
    };
    

    const seeoradd = () => {
        setWhobutton(!whobutton); // Toggle the button state
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment({ ...newComment, [name]: value });
    };

    const handleAddComment = () => {
        axios.post('http://localhost:5000/comments', {
            ...newComment,
            course: idc // Use idc as the value for the course field
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
        setNewComment({ ...newComment, like: parseInt(e.target.value) }); // Convert string to integer
    };

    return (
        <div>
            <button type="button" onClick={seeoradd}>
                {whobutton ? 'Add Comment' : 'See Comment'}
            </button>
            
            {whobutton ? (
                <>
                    <h2>{'Add New Comment'}</h2>
                    <form>
                        <label>User:</label>
                        <input type="text" name="user" value={newComment.user} onChange={handleInputChange} />
                        <br/>
                        <label>Comment:</label>
                        <input type="text" name="comment" value={newComment.comment} onChange={handleInputChange} />
                        <br/>
                        <label>Like:</label>
                        <div>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <label key={num}>
                                    <input type="radio" name="like" value={num} checked={parseInt(newComment.like) === num} onChange={handleLikeChange} />
                                    {num}
                                </label>
                            ))}
                        </div>
                        <br/>
                        <button type="button" onClick={handleAddComment}>
                            {'Add Comment'}
                        </button>
                    </form>
                </>
            ) : (
                <>
                    {comments.length === 0 ? (
                        <p>No comments</p>
                    ) : (
                        <>
                            <h1>Likes: {TotalLikesprecent}% from {counterpeople} people</h1> {/* Display total likes */}
                            <h1>All Comments</h1>
                            <ul>
                                {comments.map(comment => (
                                    <li key={comment._id}>
                                        <div>User: {comment.user}</div>
                                        <div>Course: {comment.course}</div>
                                        <div>Comment: {comment.comment}</div>
                                        <div>Like: {comment.like}</div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
