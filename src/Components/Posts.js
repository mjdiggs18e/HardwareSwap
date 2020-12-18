import React from 'react';

const Posts = ({ title, createdAt, location, type, select, user }) => {
  const tradeTypeBuy = 'buy';
  const tradeTypeSell = 'sell';

  return (
    <div className="trade-post">
      <div
        className={
          type == tradeTypeBuy
            ? 'trade-type buy'
            : type == tradeTypeSell
            ? 'trade-type sell'
            : 'trade-type trade'
        }
      ></div>
      <h2>{title}</h2>
    </div>
  );
};

export default Posts;
