import firebase from "firebase/app";
import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC4WZ64Lm6oxjYKv3hq7cq75VbW7hYqA1g",
  authDomain: "fb-crud-react-1effd.firebaseapp.com",
  projectId: "fb-crud-react-1effd",
  storageBucket: "fb-crud-react-1effd.appspot.com",
  messagingSenderId: "229201265064",
  appId: "1:229201265064:web:77eb6cbbcbed72aac35d9d",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
