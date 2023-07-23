// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { seedDB } from "../services/seeding-services";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAOEiqUUHObzG6zFiSofikFt6mhw2XBuk",
  authDomain: "react-e-shop-53571.firebaseapp.com",
  projectId: "react-e-shop-53571",
  storageBucket: "react-e-shop-53571.appspot.com",
  messagingSenderId: "881736115967",
  appId: "1:881736115967:web:7f4d671b58b7dc674d8eca"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Seeding database. This should only be run once to fill db
// const searchTerms = [
//   'apple',
//   'banana',
//   'milk',
//   'pear',
//   'honey',
//   'steak',
//   'chicken',
//   'mushroom',
//   'nut',
//   'wine',
//   'ice cream',
//   'egg',
//   'salmon',
//   'rice',
//   'potato',
//   'spinach',
//   'arugula',
//   'onion',
//   'garlic',
//   'sweet potato',
//   'beet',
//   'celery'
// ];
// seedDB(searchTerms, 4);