import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import firebase from 'firebase/app';
import { db } from '../Firebase/firebase';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';

const CommentList = () => {
  const [post, setPosts] = useState([]);
  const { id } = useParams();
  const { currentUser } = useAuth();

  const commentCollection = firebase
    .firestore()
    .collection('messages')
    .where('postID', '==', id)
    .orderBy('createdAt', 'desc');

  const message = useRef();

  const addMessages = (e) => {
    e.preventDefault();
    db.collection('messages')
      .add({
        createdAt: dayjs().unix(),
        postID: id,
        sender: currentUser.email,
        message: message.current.value,
      })
      .then((message.current.value = ''));
  };

  const retrieveComments = () => {
    commentCollection.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPosts(items);
    });
  };

  useEffect(() => {
    retrieveComments();
  }, []);

  return (
    <section className='message-section'>
      <h4 className='message-comment-length'>{post.length} Comments</h4>
      <form className='message-form' onSubmit={addMessages}>
        <textarea
          className='message-input'
          type='text'
          ref={message}
          required
        />
        <button className='message-submit' type='submit'>
          Save
        </button>
      </form>
      {post.map((comment, index) => {
        return (
          <div key={index}>
            <h1>{comment.message}</h1>
          </div>
        );
      })}
    </section>
  );
};

export default CommentList;
