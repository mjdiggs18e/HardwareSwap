import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const PostInfo = () => {
  const [postInformation, setPostInformation] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const postsCollection = firebase.firestore().collection('trades').doc(id);

  const post = async () => {
    await postsCollection.get().then((doc) => {
      const item = [];
      item.push(doc.data());
      setPostInformation(item);
      setLoading(false);
    });
  };

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      post();
    }
    return () => {
      unmounted = true;
    };
  }, []);

  return postInformation.map((post) => {
    dayjs.extend(relativeTime);
    const postCreatedAt = dayjs.unix(post.createdAt);
    const currentTime = dayjs();
    const timeSincePost = postCreatedAt.from(currentTime);
    return loading ? (
      <span className="loader" key="spinner"></span>
    ) : (
      <section className="postinfo-holder" key={post.title}>
        <p className="postinfo-title">
          <span>[USA-{post.location}]</span>
          {post.title}
        </p>
        <p className="postinfo-select">{post.select}</p>
        <p>
          Submitted {timeSincePost} by <span>{post.user}</span>
        </p>
        <div className="postinfo-body">
          <p>{post.text}</p>
        </div>
      </section>
    );
  });
};

export default PostInfo;
