import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBN8wvYzzVTYLbJVj3DSH3nSN2Uei3of4M",
    authDomain: "bad-bank-9607f.firebaseapp.com",
    projectId: "bad-bank-9607f",
    storageBucket: "bad-bank-9607f.appspot.com",
    messagingSenderId: "601578962509",
    appId: "1:601578962509:web:d22a60e9ac9d521982e604",
};
// Initialize Firebase if not already initialized
firebase.initializeApp(firebaseConfig);
// Make the auth and firebase references
export const auth = firebase.auth();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);