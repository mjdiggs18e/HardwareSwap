import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const PostingTrade = () => {
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
            placeholder="[H] Playstation 5 [W] Xbox Series X"
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
        <button className="trading-submit" type="submit">
          Submit Post
        </button>
      </form>
    </section>
  );
};

export default PostingTrade;
