import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Posts from './Posts';
import { Link } from 'react-router-dom';

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
        items.push([doc.data(), doc.id]);
      });
      setPosts(items);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="postlist-holder">
      {posts.map((post) => {
        return (
          <Link to={`/trade/${post[1]}`}>
            <Posts
              key={post[1]}
              location={post[0].location}
              title={post[0].title}
              user={post[0].user}
              type={post[0].type}
              select={post[0].select}
              time={post[0].createdAt}
            />
          </Link>
        );
      })}
    </section>
  );
};

export default PostList;
