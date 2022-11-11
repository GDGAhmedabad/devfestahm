import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAtg3bgA8xxBswNaikTlnGORfv3gBsynHk",
  authDomain: "devfestahm-develop.firebaseapp.com",
  databaseURL: "https://devfestahm-develop.firebaseio.com",
  projectId: "devfestahm-develop",
  storageBucket: "devfestahm-develop.appspot.com",
  messagingSenderId: "439087005785",
  appId: '1:439087005785:web:9e2e954d67ff7d3f397148',
  measurementId: 'G-LH5M0DD9TK',  
});
export const db = getFirestore(firebaseApp);
