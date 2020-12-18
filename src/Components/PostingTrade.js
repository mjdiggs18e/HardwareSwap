import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';

const PostingTrade = () => {
  const { currentUser } = useAuth();

  return (
    <section className="posting-body">
      <h1 className="posting-title">Create a posting</h1>
      <div className="posting-type">
        <Link to="/">
          <button className="posting-buy type">Buy</button>
        </Link>
        <Link to="/sell">
          <button className="posting-sell type">Sell</button>
        </Link>
        <Link to="/trade">
          <button className="posting-trade active type">Trade</button>
        </Link>
      </div>
      <form className="posting-form">
        <label>
          Location (Abbr)
          <input type="text" placeholder="VA" maxLength="2" />
        </label>
        <label>
          Title
          <input
            type="text"
            placeholder="[H] Xbox Series X [W] Playstation 5"
          />
        </label>
        <label>
          Text
          <textarea type="text" />
        </label>
        <label>
          Shipped or local meetup
          <select>
            <option value="shipped">Shipped</option>
            <option value="meetup">Meetup</option>
          </select>
        </label>
        {currentUser ? (
          <button className="trading-submit" type="submit">
            Submit Post
          </button>
        ) : (
          <Link to="/login">
            <button className="posting-signup" type="submit">
              Login to post
            </button>
          </Link>
        )}
      </form>
    </section>
  );
};

export default PostingTrade;
