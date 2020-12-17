import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';

const ForgotPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);
  }

  return (
    <div>
      <section>
        <div className='password-body'>
          <h1>Forgot Password</h1>
          {message && <h1>{message}</h1>}
          {error && <h1>{error}</h1>}
          <form onSubmit={handleSubmit}>
            <label>
              Email
              <input type='text' ref={emailRef} required />
            </label>
            <button disabled={loading} className='signup-button' type='submit'>
              Forgot Password
            </button>
          </form>
        </div>
      </section>
      <Link to='/login?'>
        <p>Log In</p>
      </Link>
      <Link to='/signup?'>
        <p>New User? Create an account</p>
      </Link>
    </div>
  );
};

export default ForgotPassword;
