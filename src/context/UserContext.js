import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth } from '../Firebase/firebase';

const UserContext = createContext();

export function useAuth() {
  return useContext(UserContext);
}

function signup(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

function logout() {
  return auth.signOut();
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

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};
