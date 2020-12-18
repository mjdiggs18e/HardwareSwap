import React from 'react';
import { db } from '../Firebase/firebase';

db.collection('posts')
  .get()
  .then((snapshot) => {
    console.log(snapshot.docs);
  });

const PostList = () => {
  return <h1>Post List</h1>;
};

export default PostList;
