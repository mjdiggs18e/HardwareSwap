import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AddComment from './AddComment';
import CommentList from './CommentList';

const PostInfo = () => {
  const [postInformation, setPostInformation] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    firebase
      .firestore()
      .collection('trades')
      .doc(id)
      .get()
      .then((doc) => {
        const item = [];
        item.push(doc.data());
        setPostInformation(item);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <span className='loader' key='spinner'></span>
  ) : (
    postInformation.map((post) => {
      dayjs.extend(relativeTime);
      const postCreatedAt = dayjs.unix(post.createdAt);
      const currentTime = dayjs();
      const timeSincePost = postCreatedAt.from(currentTime);
      return (
        <section key={post.title}>
          <div className='postinfo-holder'>
            <p className='postinfo-title'>
              <span>[USA-{post.location}]</span>
              {post.title}
            </p>
            <p className='postinfo-select'>{post.select}</p>
            <p>
              Submitted {timeSincePost} by <span>{post.user}</span>
            </p>
            <div className='postinfo-body'>
              <p>{post.text}</p>
            </div>
          </div>
          <AddComment />
          <CommentList />
        </section>
      );
    })
  );
};

export default PostInfo;
