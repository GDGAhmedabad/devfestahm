import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyA8yC3opcU3IWRUvw8Jtc1fc_U_kkOFuOs",
  authDomain: "devfestahm19.firebaseapp.com",
  projectId: "devfestahm19",
  storageBucket: "devfestahm19.appspot.com",
  messagingSenderId: "741984468123",
  appId: "1:741984468123:web:d98dfe539b47563c959a3e",
  measurementId: '',
});
export const db = getFirestore(firebaseApp);
