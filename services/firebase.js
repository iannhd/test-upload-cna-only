// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDscvvN1_i1xti9lFKYIdAZSifqC6oetEs",
  authDomain: "challenge-chapter10.firebaseapp.com",
  databaseURL: "https://challenge-chapter10-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "challenge-chapter10",
  storageBucket: "challenge-chapter10.appspot.com",
  messagingSenderId: "387346192459",
  appId: "1:387346192459:web:0286e2aeb107812e4215ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)
const storage = getStorage(app)

export {
  auth,
  db,
  storage
}