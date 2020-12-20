import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import firebase from 'firebase/app';
import { db } from '../Firebase/firebase';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';

const Comment = () => {
  const [comment, setComment] = useState([]);
  const { id } = useParams();
  const { currentUser } = useAuth();

  const message = useRef();

  const messageCollection = firebase
    .firestore()
    .collection('messages')
    .orderBy('createdAt', 'desc');

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

  return (
    <section className='message-section'>
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
    </section>
  );
};

export default Comment;
