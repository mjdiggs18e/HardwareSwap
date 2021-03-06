import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../Context/UserContext';

const Header = () => {
  const { currentUser, logout } = useAuth();

  function handleLogout() {
    logout();
  }

  // Checks to see if there is a current user. If there is a user, the signup and log in links are placed with a logout button.

  return (
    <header>
      <nav>
        <Link to='/'>
          <h1>HardwareSwap</h1>
        </Link>
        <ul>
          {currentUser ? (
            <>
              <li className='loggedin-name'>{currentUser.email}</li>
              <button className='logout' onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to='/signup'>
                <li>Sign Up</li>
              </Link>
              <Link to='/login'>
                <li>Log In</li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
