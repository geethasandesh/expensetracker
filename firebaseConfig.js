// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdRQhMLZoBNczxilhapljS3eLxEYz_08o",
  authDomain: "expensetracker-81e02.firebaseapp.com",
  projectId: "expensetracker-81e02",
  storageBucket: "expensetracker-81e02.firebasestorage.app",
  messagingSenderId: "1041784704958",
  appId: "1:1041784704958:web:0aca99bc67a46338c8f3ef",
  measurementId: "G-M9MHDQ15Z8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db, collection, getDocs, addDoc, deleteDoc, doc};
