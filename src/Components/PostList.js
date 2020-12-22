import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Posts from './Posts';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('trades')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push([doc.data(), doc.id]);
        });
        setPosts(items);
        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return loading ? (
    <section className='postlist-holder'>
      <span className='loader'></span>
    </section>
  ) : (
    <section className='postlist-holder'>
      {posts.map((post) => {
        return (
          <Link to={`/trade/${post[1]}`} key={post[1]}>
            <Posts
              location={post[0].location}
              title={post[0].title}
              user={post[0].user}
              type={post[0].type}
              select={post[0].select}
              time={post[0].createdAt}
              id={post[1]}
            />
          </Link>
        );
      })}
    </section>
  );
};

export default PostList;
