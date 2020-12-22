import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { useParams } from 'react-router-dom';

const CommentList = () => {
  const { id } = useParams();
  const [post, setPosts] = useState([]);

  const commentCollection = firebase
    .firestore()
    .collection('messages')
    .where('postID', '==', id)
    .orderBy('createdAt', 'desc');

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
    let unmounted = false;

    if (!unmounted) {
      retrieveComments();
    }
    return () => {
      unmounted = true;
    };
  }, []);

  return post.map((comment, index) => {
    return (
      <div key={index}>
        <h1>{comment.message}</h1>
      </div>
    );
  });
};

export default CommentList;
