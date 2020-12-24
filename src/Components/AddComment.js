import React, { useRef, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import dayjs from 'dayjs';
import { db } from '../Firebase/firebase';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';

const AddComment = () => {
  const [length, setLength] = useState([]);
  const { id } = useParams();
  const { currentUser } = useAuth();
  const message = useRef();

  //Automatically load collection and insert into setLength state

  useEffect(() => {
    const unsubscibe = firebase
      .firestore()
      .collection('messages')
      .where('postID', '==', id)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setLength(items);
      });

    return () => {
      unsubscibe();
    };
  }, []);

  // Add messages to database and clears value on submit

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

  // Returns nunber of messages from earlier useEffect and gets message value from input.

  return (
    <section className='message-section'>
      <h4 className='message-comment-length'>{length.length} Comments</h4>
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

export default AddComment;
