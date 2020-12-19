import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const PostInfo = () => {
  const [postInformation, setPostInformation] = useState([]);
  const { id } = useParams();
  const postsCollection = firebase.firestore().collection('trades').doc(id);

  const post = async () => {
    await postsCollection.get().then((doc) => {
      const item = [];
      item.push(doc.data());
      setPostInformation(item);
    });
  };

  useEffect(() => {
    post();
  }, []);

  return postInformation.map((post) => {
    dayjs.extend(relativeTime);
    const postCreatedAt = dayjs.unix(post.createdAt);
    const currentTime = dayjs();
    const timeSincePost = postCreatedAt.from(currentTime);
    return (
      <section>
        <p>[USA-{post.location}]</p>
        <p>{post.title}</p>
        <p>{timeSincePost}</p>
        <p>{post.user}</p>
        <p>{post.text}</p>
        <p>{post.select}</p>
      </section>
    );
  });
};

export default PostInfo;
