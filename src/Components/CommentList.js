import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAuth } from '../Context/UserContext';

const CommentList = () => {
  const { id } = useParams();
  const [post, setPosts] = useState([]);

  // Gets all comments currently in database and inserts into setPosts state
  // Only returns comments that have the same postID as the post

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('messages')
      .where('postID', '==', id)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setPosts(items);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const { currentUser } = useAuth();

  // Mapping through post state to get all comments for that post

  return post.map((comment, index) => {
    dayjs.extend(relativeTime);
    const postCreatedAt = dayjs.unix(comment.createdAt);
    const currentTime = dayjs();
    const timeSincePost = postCreatedAt.from(currentTime);

    return (
      <div className='comment-post' key={index}>
        <div className='comment-top'>
          <p className='comment-author'>Submitted by {comment.sender}</p>
          <p className='comment-timesince'>{timeSincePost}</p>
        </div>
        <p className='comment-message'>{comment.message}</p>
      </div>
    );
  });
};

export default CommentList;
