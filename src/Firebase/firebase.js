import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var app = firebase.initializeApp({
  apiKey: 'AIzaSyBg0zb1f-X1CqDwnNgmRxlA3A7wQlBr0rA',
  authDomain: 'hardwareswap-3f022.firebaseapp.com',
  projectId: 'hardwareswap-3f022',
  storageBucket: 'hardwareswap-3f022.appspot.com',
  messagingSenderId: '932254037809',
  appId: '1:932254037809:web:5e781976d501011c5ca210',
});

export const auth = app.auth();
export const db = firebase.firestore();

export default app;
