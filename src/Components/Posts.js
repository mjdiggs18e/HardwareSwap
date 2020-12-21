import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { db } from '../Firebase/firebase';
import { useAuth } from '../Context/UserContext';

const Posts = ({ title, time, location, type, id, user }) => {
  dayjs.extend(relativeTime);

  const postCreatedAt = dayjs.unix(time);
  const currentTime = dayjs();
  const timeSincePost = postCreatedAt.from(currentTime);

  const tradeTypeBuy = 'buy';
  const tradeTypeSell = 'sell';

  const removePost = (e) => {
    e.preventDefault();
    console.log(id);
    db.collection('trades')
      .doc(id)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
  };

  const { currentUser } = useAuth();

  return (
    <div className="trade-post">
      <div
        className={
          type === tradeTypeBuy
            ? 'trade-type buy'
            : type === tradeTypeSell
            ? 'trade-type sell'
            : 'trade-type trade'
        }
      ></div>
      <p className="post-title">
        <span>[USA-{location}]</span>
        {title}
      </p>
      <div class="post-bottom-info">
        <p>Submitted by {user}</p>
        <p>{timeSincePost}</p>
      </div>
      {currentUser && currentUser.email == user ? (
        <button className="delete-post" onClick={removePost}>
          Delete Post
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Posts;
