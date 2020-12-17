import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const SignUp = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  return (
    <div>
      <section>
        <div className="login-body">
          <form>
            <label>
              Username
              <input type="text" ref={userNameRef} required />
            </label>
            <label>
              Password
              <input type="password" ref={passwordRef} required />
            </label>
            <label>
              Password Confirmation
              <input type="password" ref={passwordConfirmationRef} required />
            </label>
            <button className="signup-button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </section>
      <Link to="/login?">
        <p>Already have an account? Log In</p>
      </Link>
    </div>
  );
};

export default SignUp;
