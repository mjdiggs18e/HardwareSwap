import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">
          <h1>HardwareSwap</h1>
        </Link>
        <ul>
          <Link to="/signup">
            <li>Sign Up</li>
          </Link>
          <Link to="/login">
            <li>Log In</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
