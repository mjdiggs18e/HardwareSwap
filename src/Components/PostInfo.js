import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AddComment from './AddComment';
import CommentList from './CommentList';
import ReactMarkdown from 'react-markdown';

const PostInfo = () => {
  const [postInformation, setPostInformation] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  // Gets all information for the route that matches the post id.

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

  // Displays a spinner if loading and then displays all post information below.
  // Post information includes: user, text, location, time, and preferred pickup

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
            <p className='postinfo-submittedby'>
              Submitted {timeSincePost} by <span>{post.user}</span>
            </p>
            <div className='postinfo-body'>
              <ReactMarkdown source={post.text}></ReactMarkdown>
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
