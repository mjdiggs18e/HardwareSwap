import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Posts from './Posts';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const postsCollection = firebase
    .firestore()
    .collection('trades')
    .orderBy('createdAt', 'desc');

  const getPosts = () => {
    postsCollection.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPosts(items);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className='postlist-holder'>
      {posts.map((post) => {
        return (
          <Posts
            key={post.title}
            location={post.location}
            title={post.title}
            user={post.user}
            type={post.type}
            select={post.select}
            time={post.createdAt}
          />
        );
      })}
    </section>
  );
};

export default PostList;
