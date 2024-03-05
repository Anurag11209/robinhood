// https://github.com/lxndroc/react-robinhood-clone

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC9hBmJP8XGbZ0_H7OFcAopHS9beHIPAeA",
  authDomain: "finance-app-5be43.firebaseapp.com",
  projectId: "finance-app-5be43",
  storageBucket: "finance-app-5be43.appspot.com",
  messagingSenderId: "377901679650",
  appId: "1:377901679650:web:d44f114c3e29ed7bd3f67b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
