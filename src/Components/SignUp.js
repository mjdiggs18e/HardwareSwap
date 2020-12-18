import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/UserContext';

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  return (
    <section className="signup-section">
      <h1>Sign Up</h1>
      {error && <p className="signup-error">{error}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="text" ref={emailRef} required />
        </label>
        <label>
          Password
          <input type="password" ref={passwordRef} minLength="6" required />
        </label>
        <label>
          Password Confirmation
          <input type="password" ref={passwordConfirmationRef} required />
        </label>
        <button disabled={loading} className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
      <Link to="/login?">
        <p>Already have an account? Log In</p>
      </Link>
    </section>
  );
};

export default SignUp;
