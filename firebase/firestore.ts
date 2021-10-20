import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const clientCredentials = {
  apiKey: "AIzaSyCW8_gemoCSufMROS6aDlNBU3E4H1U0CzE",
  authDomain: "social-database-42f73.firebaseapp.com",
  projectId: "social-database-42f73",
  storageBucket: "social-database-42f73.appspot.com",
  messagingSenderId: "800703881057",
  appId: "1:800703881057:web:d803354d883244c0116f20",
  measurementId: "G-647ES3ERZW"
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}
const db = firebase.firestore()

export default db;