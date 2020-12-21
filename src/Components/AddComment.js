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

  const messageCollection = firebase
    .firestore()
    .collection('messages')
    .where('postID', '==', id)
    .orderBy('createdAt', 'desc');

  const getCommentLength = () => {
    messageCollection.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setLength(items);
    });
  };

  useEffect(() => {
    getCommentLength();
  }, []);

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
    <section className="message-section">
      <h4 className="message-comment-length">{length.length} Comments</h4>
      <form className="message-form" onSubmit={addMessages}>
        <textarea
          className="message-input"
          type="text"
          ref={message}
          required
        />
        <button className="message-submit" type="submit">
          Save
        </button>
      </form>
    </section>
  );
};

export default AddComment;
