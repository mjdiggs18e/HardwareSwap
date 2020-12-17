import React, { useState, useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import { useAuth } from '../Context/UserContext';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  }

  return (
    <div>
      <section>
        <div className='login-body'>
          <h1>Log In</h1>
          {error && <h1>{error}</h1>}
          <form onSubmit={handleSubmit}>
            <label>
              Email
              <input type='text' ref={emailRef} required />
            </label>
            <label>
              Password
              <input type='password' ref={passwordRef} required />
            </label>
            <button disabled={loading} className='signup-button' type='submit'>
              Log In
            </button>
          </form>
        </div>
      </section>
      <Link to='/signup?'>
        <p>New User? Create an account</p>
      </Link>
    </div>
  );
};

export default Login;
