import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';

const PostingSell = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser ? (
        <section className='posting-body'>
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
          <form className='posting-form'>
            <label>
              Location (Abbr)
              <input type='text' placeholder='VA' maxLength='2' />
            </label>
            <label>
              Title
              <input type='text' placeholder='[H] Playstation 5 [W] Paypal' />
            </label>
            <label>
              Text
              <textarea type='text' />
            </label>
            <label>
              Shipped or local meetup
              <select>
                <option value='shipped'>Shipped</option>
                <option value='meetup'>Meetup</option>
              </select>
            </label>
            <button className='selling-submit' type='submit'>
              Submit Post
            </button>
          </form>
        </section>
      ) : (
        <div className='posting-login'>
          <Link to='/login'>
            <button className='login-post'>Log In</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default PostingSell;
