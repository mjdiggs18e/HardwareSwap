import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const Posts = ({ title, time, location, type, id, user }) => {
  dayjs.extend(relativeTime);

  const postCreatedAt = dayjs.unix(time);
  const currentTime = dayjs();
  const timeSincePost = postCreatedAt.from(currentTime);

  const tradeTypeBuy = 'buy';
  const tradeTypeSell = 'sell';

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
    </div>
  );
};

export default Posts;
