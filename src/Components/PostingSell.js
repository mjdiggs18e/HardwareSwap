import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';
import { db } from '../Firebase/firebase';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import toast, { Toaster } from 'react-hot-toast';

const PostingSell = () => {
  const location = useRef();
  const title = useRef();
  const text = useRef();
  const select = useRef();
  const { currentUser } = useAuth();

  const addSellPost = (e) => {
    e.preventDefault();
    dayjs.extend(relativeTime);

    db.collection('trades')
      .add({
        type: 'sell',
        user: currentUser.email,
        location: location.current.value.toUpperCase(),
        title: title.current.value,
        text: text.current.value,
        select: select.current.value,
        createdAt: dayjs().unix(),
      })
      .then(() => {
        toast('Successfully added post!');
        location.current.value = '';
        title.current.value = '';
        text.current.value = '';
      })
      .catch(() => {
        toast('Failed to add post.');
      });
  };

  return (
    <section className='posting-body'>
      <Toaster />
      <h1 className='posting-title'>Create a posting</h1>
      <div className='posting-type'>
        <Link to='/'>
          <button className='posting-buy type'>Buy</button>
        </Link>
        <Link to='/sell'>
          <button className='posting-sell active type'>Sell</button>
        </Link>
        <Link to='/trade'>
          <button className='posting-trade type'>Trade</button>
        </Link>
      </div>
      <form className='posting-form' onSubmit={addSellPost}>
        <label>
          Location (Abbr)
          <input
            className='uppercase'
            type='text'
            placeholder='VA'
            maxLength='2'
            ref={location}
            required
          />
        </label>
        <label>
          Title
          <input
            type='text'
            placeholder='[H] Playstation 5 [W] Paypal'
            ref={title}
            required
          />
        </label>
        <label>
          Text
          <textarea type='text' ref={text} required />
        </label>
        <label>
          Shipped or local meetup
          <select ref={select}>
            <option value='Shipped'>Shipped</option>
            <option value='Meetup'>Meetup</option>
          </select>
        </label>
        {currentUser ? (
          <button className='selling-submit' type='submit'>
            Submit Post
          </button>
        ) : (
          <Link to='/login'>
            <button className='posting-signup' type='submit'>
              Login to post
            </button>
          </Link>
        )}
      </form>
    </section>
  );
};

export default PostingSell;
