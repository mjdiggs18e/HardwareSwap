import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth } from '../Firebase/firebase';

const UserContext = createContext();

// Creates context for user

export function useAuth() {
  return useContext(UserContext);
}

// Creates a user account from input email and password.

function signup(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

// Logs in user with values from email and password.

function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

// Signs out a user if they're logged in

function logout() {
  return auth.signOut();
}

// Sends a password reset email to a user if they forget it.

function resetPassword(email) {
  return auth.sendPasswordResetEmail(email);
}

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsub;
  }, []);

  // Gets functions and assigns them as values for the provider.

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};
