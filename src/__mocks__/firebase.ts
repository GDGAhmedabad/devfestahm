import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAlGQM1tvp1tOzJzYMh-YLDNoQGp7VnHqE",
  authDomain: "devfestahm-62cc4.firebaseapp.com",
  databaseURL: "https://devfestahm-62cc4-default-rtdb.firebaseio.com",
  projectId: "devfestahm-62cc4",
  storageBucket: "devfestahm-62cc4.appspot.com",
  messagingSenderId: "178324599142",
  appId: "1:178324599142:web:db50e892c65e015013d8a7"
});
export const db = getFirestore(firebaseApp);
