import React, { useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';
import { db } from '../Firebase/firebase';

const PostingBuy = () => {
  const location = useRef();
  const title = useRef();
  const text = useRef();
  const select = useRef();

  const { currentUser } = useAuth();

  const addBuyPost = (e) => {
    e.preventDefault();

    db.collection('trades')
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        type: 'buy',
        user: currentUser.email,
        location: location.current.value,
        title: title.current.value,
        text: text.current.value,
        select: select.current.value,
      })
      .then(() => {
        location.current.value = '';
        title.current.value = '';
        text.current.value = '';
      })
      .catch(() => {
        console.error('Error adding document');
      });
  };

  return (
    <section className="posting-body">
      <h1 className="posting-title">Create a posting</h1>
      <div className="posting-type">
        <Link to="/">
          <button className="posting-buy active type">Buy</button>
        </Link>
        <Link to="/sell">
          <button className="posting-sell type">Sell</button>
        </Link>
        <Link to="/trade">
          <button className="posting-trade type">Trade</button>
        </Link>
      </div>
      <form className="posting-form" onSubmit={addBuyPost}>
        <label>
          Location (Abbr)
          <input
            type="text"
            placeholder="VA"
            maxLength="2"
            ref={location}
            required
          />
        </label>
        <label>
          Title
          <input
            type="text"
            placeholder="[H] Paypal [W] Playstation 5"
            ref={title}
            required
          />
        </label>
        <label>
          Text
          <textarea type="text" ref={text} required />
        </label>
        <label>
          Shipped or local meetup
          <select ref={select}>
            <option value="shipped">Shipped</option>
            <option value="meetup">Meetup</option>
          </select>
        </label>
        {currentUser ? (
          <button className="buying-submit" type="submit">
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

export default PostingBuy;
